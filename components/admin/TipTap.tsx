import React from "react";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./EditorToolbar";

interface Props {
  details: string;
  onChange: (richText: string) => void;
}
const TipTap = ({ details, onChange }: Props) => {
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
    content: details,

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
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none p-2 min-h-[250px]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className=" border rounded-md">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className=" w-full min-h-96 " />
    </div>
  );
};

export default TipTap;
