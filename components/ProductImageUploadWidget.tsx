import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import { Button } from "./ui/button";
import { ProductImageState } from "./admin/ProductImageUploader";

const ProductImageUploadWidget = ({
  setProductImages,
  productImages,
  setProductImageError,
}: ProductImageState) => {
  return (
    <CldUploadWidget
      onClose={(e) => {
        // Prevent the event from bubbling up
      }}
      onSuccess={(result) => {
        setProductImageError(false);
        if (typeof result.info !== "string" && result.info?.url) {
          const imageUrl = result.info?.url;
          setProductImages((prevImages) => [...prevImages, imageUrl]);
        }
      }}
      uploadPreset="selam mart"
      options={{
        sources: ["local", "camera"],
        tags: [""],
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
        return (
          <Button onClick={() => open()} className=" w-min">
            Upload images
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ProductImageUploadWidget;
