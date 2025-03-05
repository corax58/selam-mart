import ProductForm from "@/components/admin/forms/ProductForm";
import ProductImageUploader from "@/components/admin/ProductImageUploader";
const NewProductPage = () => {
  return (
    <div className=" flex ">
      <ProductImageUploader />
      <ProductForm />
    </div>
  );
};

export default NewProductPage;
