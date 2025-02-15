"use client";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data, isPending } = useSession();

  return (
    <div className="  h-16 border-b  flex justify-center  ">
      <div className=" container flex justify-between px-10 items-center h-full">
        <div className=" text-lg font-semibold font-serif">Selam mart</div>

        <div className=" flex gap-4">
          <div>
            <Link href={"/new"}>
              <Button>New Product</Button>
            </Link>
          </div>
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger className=" rounded-full">
                <Avatar>
                  <AvatarImage src={data.user.image!} />
                  <AvatarFallback>Ac</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{data.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <Link href={"/sign-in"}>
                <Button>Sign in</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
