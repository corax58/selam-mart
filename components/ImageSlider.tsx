"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from "react-responsive-carousel";
import ImageViewer from "./ImageViewer";
import { Camera, FileImage } from "lucide-react";
import { ProductImageState } from "./admin/ProductImageUploader";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

interface Props {
  productImages: string[];
}
const ImageSlider = ({ productImages }: Props) => {
  if (productImages.length == 0)
    return (
      <div className="h-[500px] w-full  flex flex-col gap-4   ">
        <div className=" h-5/6 border-4 border-dashed  rounded-md text-neutral-600 border-neutral-600  aspect-square  gap-2 flex flex-col justify-center items-center">
          <FileImage size={100} strokeWidth={0.5} className=" " />
          <p className=" text-lg">Upload an Image</p>
        </div>
        <div className=" flex justify-around">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="border-4 border-dashed  rounded-md border-neutral-600  h-16  w-20"></div>
          ))}
        </div>
      </div>
    );

  return (
    <Carousel
      className=" h-[500px] w-full   "
      infiniteLoop
      renderThumbs={() =>
        productImages.map((image, index) => (
          <CldImage
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            width={64}
            height={64}
          />
        ))
      }
    >
      {productImages.map((image, index) => (
        <ImageViewer imageUrl={image} key={index} />
      ))}
    </Carousel>
  );
};

export default ImageSlider;
