"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userSchema } from "@/app/schemas/userSchema";

type UserData = {
  password: string;
  name: string;
};

function validateUserData(userData: UserData) {
  const result = userSchema.safeParse(userData);

  if (!result.success) {
    // Collect and return all error messages
    const errors = result.error.errors.map((err) => ({
      field: err.path.join(" -> "), // Shows which field failed
      message: err.message, // Shows the error message
    }));
    return { success: false, errors };
  }

  return false; // No errors
}

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    success: boolean;
    errors: { field: string; message: string }[];
  } | null>(null);

  useEffect(() => {
    if (passwordConfirmation) {
      setPasswordMismatchError(password !== passwordConfirmation);
    } else {
      setPasswordMismatchError(false);
    }
  }, [password, passwordConfirmation]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Card className="z-50 rounded-md rounded-t-none max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="First and Last name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={passwordConfirmation}
                required
                className={
                  passwordMismatchError
                    ? "focus-visible:ring-red-500 border-red-500"
                    : ""
                }
                onChange={(e) => {
                  setPasswordConfirmation(e.target.value);
                }}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image (optional)</Label>
              <div className="flex items-end gap-4">
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 w-full">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {imagePreview && (
                    <X
                      className="cursor-pointer"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {error && (
              <p className=" text-red-500 leading-tight text-sm">
                {error.errors[0].message}
              </p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || passwordMismatchError}
              onClick={async () => {
                const validation = validateUserData({
                  password,
                  name,
                });
                if (validation) {
                  setError(validation);
                  console.log(validation);
                  return;
                }
                await signUp.email({
                  email,
                  password,
                  name,
                  image: image ? await convertImageToBase64(image) : "",
                  callbackURL: "/",
                  fetchOptions: {
                    onResponse: () => {
                      setLoading(false);
                    },
                    onRequest: () => {
                      setLoading(true);
                    },
                    onError: (ctx) => {
                      console.log(ctx);
                      toast.error(ctx.error.message);
                    },
                    onSuccess: async () => {
                      router.push("/");
                    },
                  },
                });
              }}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center w-full border-t py-4">
            <p className="text-center text-xs text-neutral-500">
              Secured by <span className="text-orange-400">better-auth.</span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
