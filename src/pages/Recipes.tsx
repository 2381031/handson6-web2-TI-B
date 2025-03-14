import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface Recipes{
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipesData{
  recipes: Recipes[]
}

const fetchRecipesList = async () => {
  return await axios.get<RecipesData>("/recipes")
};

const RecipesSkeleton = () => {
  return (
    <div className="group relative">
      {/* Image Placeholder */}
      <div className="aspect-square w-full rounded-md bg-gray-200 animate-pulse lg:aspect-auto lg:h-80"></div>

      <div className="mt-4 flex justify-between">
        {/* Name Placeholder */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        
      </div>
    </div>
  );
};

const Recipes = () => {
  const getRecipeList = useQuery({
    queryKey: ["recipesList"],
    queryFn: fetchRecipesList,
  });
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4">
    <button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => navigate("./add")}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
      </svg>
    </button>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          List of Recipes
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {getRecipeList.isFetching
              ? Array.from({ length: 4 }).map((_, index) => (
                  <RecipesSkeleton key={index} />
                ))
              : getRecipeList.data?.data.recipes.map((recipes) => (
                  <div
                    key={recipes.id}
                    className="group relative"
                    onClick={() => navigate(`/recipes/${recipes.id}`)}
                  >
                    <img
                      alt={recipes.name}
                      src={recipes.image}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a>
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            <h1> {recipes.name}</h1>
                          </a>
                        </h3>
                        
                        <p className="text-xs">⭐{recipes.rating} ({recipes.reviewCount} reviews)</p>
              
                      </div>
                    </div>
                  </div>
                ))} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
