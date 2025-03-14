import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";

interface RecipesDetail {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number; 
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  image: string;
}


interface DeletedRecipe extends RecipesDetail {
  isDeleted: boolean; 
  deletedOn: string;
}

export const fetchRecipesDetail = async (id: string | undefined) => {
  return await axios.get<RecipesDetail>(`/recipe/${id}`);
};

const deleteRecipe = async (id: string | undefined) => {
  return await axios.delete<DeletedRecipe>(`recipe/${id}`);
};

const RecipesDetailSkeleton = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recipe Image Skeleton */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg rounded-lg shadow-lg bg-gray-300 animate-pulse"></div>
          </div>

          {/* Recipe name Skeleton */}
          <div className="space-y-4">
            {/* Name Skeleton */}
            <div className="h-10 bg-gray-300 rounded animate-pulse w-full"></div>

            {/* Ingredients Skeleton */}
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>

            {/* Instructions */}
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
            </div>

            {/* PrepTimeMinutes */}
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>

            {/* CookTimeMinutes */}
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>

            {/* Serving */}
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>

            {/* Difficulty */}
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>

            {/* Cuisine */}
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>

            {/* Calories per serving */}
            <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecipesDetail = () => {
  const { id } = useParams();
  const getRecipesDetail = useQuery({
    queryKey: ["recipesDetail", id],
    queryFn: () => fetchRecipesDetail(id),
  });
  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(id),
  });
  const recipe: RecipesDetail | undefined = getRecipesDetail.data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteRecipeMutation.isSuccess) {
      // Perbaikan 1: Mengubah "/recipe" menjadi "/recipes"
      navigate("/recipes", { replace: true });
    }
  }, [deleteRecipeMutation.isSuccess]);
  return (
    <div>
   {getRecipesDetail.isFetching || recipe === undefined ? (
        <RecipesDetailSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          {deleteRecipeMutation.isPending && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
                <span className="text-2xl mr-4 text-gray-800">Deleting...</span>
                <svg
                  className="animate-spin h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recipe Image */}
            <div className="flex justify-center">
              <img
                src={recipe.image} 
                alt={recipe.name}
                className="w-full max-w-lg rounded-lg shadow-lg"
              />
            </div>

            {/* Recipe Details */}
            <div className="space-y-4">
              {/* Name */}
              <h1 className="text-3xl font-bold text-gray-900">
                {recipe.name}
              </h1>

              {/* Ingredients */}
              <p className="text-gray-600">
                <span className="font-bold">Ingredients:</span>{" "}
                <span className="text-gray-600">{recipe.ingredients}</span>

              </p>

              {/* Instructions */}
              <p className="text-gray-600">
                <span className="font-bold">Instruction:</span>{" "}
                <span className="text-gray-600">{recipe.instructions}</span>

              </p>

              {/* PrepTimeMinutes */}
<div className="text-gray-600">
  <span className="font-bold">Prep Time Minutes:</span>{" "}
  {recipe.prepTimeMinutes}
</div>

{/* CookTimeMinutes */}
<div className="text-gray-600">
  <span className="font-bold">Cook Time Minutes:</span>{" "}
  {recipe.cookTimeMinutes}
</div>

{/* Serving */}
<div className="text-gray-600">
  <span className="font-bold">Serving:</span>{" "}
  {recipe.servings}
</div>

{/* Difficulty */}
<div className="text-gray-600">
  <span className="font-bold">Difficulty:</span>{" "}
  {recipe.difficulty}
</div>

{/* Cuisine */}
<div className="text-gray-600">
  <span className="font-bold">Cuisine:</span>{" "}
  {recipe.cuisine}
</div>

{/* Calories per serving */}
<div className="text-gray-600">
  <span className="font-bold">Calories per serving:</span>{" "}
  {recipe.caloriesPerServing}
</div>

{/* Rating */}
<div className="text-gray-600">
  <span className="font-bold">Rating:</span>{" "}
  {recipe.rating} ({recipe.reviewCount} reviews)
</div>

{/* Tags */}
<div className="text-gray-600">
  <span className="font-bold">Tags:</span>{" "}
  {recipe.tags.join(", ")}
</div>




              <div className="fixed bottom-4 right-4 z-50">
                <div className="relative group">
                  <button className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-14 right-0 bg-white rounded-lg shadow-lg w-32 hidden group-focus-within:block">
                    <button
                      onClick={() => {
                        navigate("edit");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      onClick={() => {
                        if (confirm("Are you sure want to delete this recipe? ")) {
                          deleteRecipeMutation.mutate();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesDetail;
