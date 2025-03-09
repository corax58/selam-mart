import React, { Dispatch, SetStateAction } from "react";
import ProductImageUploadWidget from "../ProductImageUploadWidget";
import ImageSlider from "../ImageSlider";

export interface ProductImageState {
  setProductImages: Dispatch<SetStateAction<string[]>>;
  productImages: string[];
}

const ProductImageUploader = ({
  setProductImages,
  productImages,
}: ProductImageState) => {
  return (
    <div className="flex flex-col gap-5 items-end ">
      <ProductImageUploadWidget
        setProductImages={setProductImages}
        productImages={productImages}
      />
      <ImageSlider productImages={productImages} />
    </div>
  );
};

export default ProductImageUploader;
