import { useMutation } from "@tanstack/react-query";
import RecipeForm, { RecipeFormInput } from "../components/RecipeForm";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const addRecipes = async (data: RecipeFormInput) => {
  return await axios.post("/recipes/add", data);
};

const AddRecipes = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addRecipes
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [isSuccess]);
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {isPending && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 flex items-center space-x-4">
            <span className="text-xl font-medium text-gray-700">Adding recipe...</span>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Recipe</h1>
        <RecipeForm isEdit={false} mutateFn={mutate} />
      </div>
    </div>
  );
};

export default AddRecipes;