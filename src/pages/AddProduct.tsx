import { useMutation } from "@tanstack/react-query";
import ProductForm, { ProductFormInput } from "../components/ProductForm";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const addProduct = async (data: ProductFormInput) => {
  return await axios.post("/products/add", data);
};

const AddProduct = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addProduct
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/product", { replace: true });
    }
  }, [isSuccess]);
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8 relative">
          {isPending && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl">
              <div className="bg-white rounded-lg p-6 shadow-xl flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <span className="text-lg font-medium text-gray-700">Menambahkan...</span>
              </div>
            </div>
          )}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tambah Produk</h2>
          <ProductForm isEdit={false} mutateFn={mutate} />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;