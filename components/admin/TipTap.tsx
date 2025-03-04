"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import EditorToolbar from "./EditorToolbar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

const Tiptap = () => {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "The title is too short" })
      .max(100, { message: "The title is too long" }),
    price: z.number().min(0, { message: "The price cant be below 0" }),
    description: z
      .string()
      .min(5, { message: "The description is too short" })
      .max(500, { message: "The description is too long" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 30,
      description: "",
    },
  });
  const CustomHeading = Heading.configure({
    levels: [1, 2, 3], // Enable H1, H2, and H3
    HTMLAttributes: {
      class: "font-bold",
    },
  }).extend({
    addAttributes() {
      return {
        level: {
          default: 2,
          parseHTML: (element) => parseInt(element.tagName.charAt(1)),
          renderHTML: (attributes) => {
            let sizeClass = "";
            if (attributes.level === 1) sizeClass = "text-3xl";
            if (attributes.level === 2) sizeClass = "text-2xl";
            if (attributes.level === 3) sizeClass = "text-xl";

            return {
              class: `font-bold ${sizeClass}`,
            };
          },
        },
      };
    },
  });
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      CustomHeading,

      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-5",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-5",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "pl-2",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none min-h-[250px]",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className=" border-2 p-20  ">
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Main title for your produc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <div className=" border rounded-2xl px-2">
                    <EditorToolbar editor={editor} />
                    <EditorContent
                      editor={editor}
                      className=" w-full "
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Tiptap;
