import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm, {RecipeFormInput} from "../components/RecipeForm";
import axios from "../utils/AxiosInstance";
import {fetchRecipesDetail} from "./RecipesDetail";

const editRecipes = async (data: RecipeFormInput, id: string | undefined) => {
  return await axios.put(`/recipes/${id}`, data);
};

const EditRecipes = () => {
  const { id } = useParams();
  const editRecipeMutation = useMutation({
    mutationFn: (data: RecipeFormInput) => editRecipes(data, id)
  });
  const getRecipesDetail = useQuery({
    queryKey: ["recipesDetail", id],
    queryFn: () => fetchRecipesDetail(id)
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (editRecipeMutation.isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [editRecipeMutation.isSuccess]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      {(editRecipeMutation.isPending || getRecipesDetail.isFetching) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 flex items-center space-x-4">
            <span className="text-xl font-medium text-gray-700">Editing recipe...</span>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-orange-600"></div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Recipe</h1>
        <RecipeForm
          isEdit={true}
          mutateFn={editRecipeMutation.mutate}
          defaultInputData={getRecipesDetail.data?.data}
        />
      </div>
    </div>
  );
};

export default EditRecipes;
