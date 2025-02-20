"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { ChildProps } from "postcss";

const UploadWidget = ({ setImage }: { setImage: (value: string) => void }) => {
  return (
    <CldUploadWidget
      onClose={(e) => {
        // Prevent the event from bubbling up
      }}
      onSuccess={(result) => {
        if (typeof result.info !== "string" && result.info?.url) {
          setImage(result.info.url);
        }
      }}
      uploadPreset="selam mart"
      options={{
        multiple: false,
        sources: ["local", "camera"],
        styles: {
          palette: {
            window: "#F5F5F5",
            sourceBg: "#FFFFFF",
            windowBorder: "#90a0b3",
            tabIcon: "#0094c7",
            inactiveTabIcon: "#69778A",
            menuIcons: "#0094C7",
            link: "#53ad9d",
            action: "#8F5DA5",
            inProgress: "#0194c7",
            complete: "#53ad9d",
            error: "#c43737",
            textDark: "#000000",
            textLight: "#FFFFFF",
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true,
            },
          },
        },
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>Upload an Image</Button>;
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;
