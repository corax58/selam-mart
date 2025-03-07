import React from "react";
import ImageSlider from "./ImageSlider";
import ProductImageUploadWidget from "../ProductImageUploadWidget";

export interface ProductImageState {
  setProductImages: (value: string[]) => void;
  productImages: string[];
}

const ProductImageUploader = ({
  setProductImages,
  productImages,
}: ProductImageState) => {
  return (
    <div className=" ">
      <ProductImageUploadWidget
        setProductImages={setProductImages}
        productImages={productImages}
      />
      <ImageSlider productImages={productImages} />
    </div>
  );
};

export default ProductImageUploader;
