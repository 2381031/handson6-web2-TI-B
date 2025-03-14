import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";

interface TodosDetail {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}
interface DeletedTodos extends TodosDetail {
  isDeleted: Boolean; 
  deletedOn: string;
}

export const fetchTodosDetail = async (id: string | undefined) => {
  return await axios.get<TodosDetail>(`/todos/${id}`);
};

const deleteTodos = async (id: string | undefined) => {
  return await axios.delete<DeletedTodos>(`todos/${id}`);
};

const TodosDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="relative border rounded-lg p-6">
            {/* Todos Skeleton */}
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>

            {/* Todo Skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>

            {/* Completed Skeleton */}
            <div className="mt-4 flex space-x-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>

            {/* User ID Skeleton */}
            <div className="mt-4 h-4 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TodosDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getTodosDetail = useQuery({
    queryKey: ["todosDetail", id],
    queryFn: () => fetchTodosDetail(id),
  });
  const deleteTodosMutation = useMutation({
    mutationFn: () => deleteTodos(id),
  });
  const todos: TodosDetail | undefined = getTodosDetail.data?.data; 

  useEffect(() => {
    if (deleteTodosMutation.isSuccess) {
      navigate("/todos", { replace: true });
    }
  }, [deleteTodosMutation.isSuccess]);
  
  return (
    <div className="container mx-auto px-4">
      {getTodosDetail.isFetching || todos === undefined ? (
        <TodosDetailSkeleton />
      ) : (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="relative border rounded-lg p-6 hover:shadow-lg transition-shadow">
              {deleteTodosMutation.isPending && (
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

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{todos?.todo}</h1>

              <div className="space-y-4">
                <p className="text-gray-600">User ID: {todos?.userId}</p>
                <p className="text-gray-600">{todos?.completed ? "✅ Completed" : "❌ Not Completed"}</p>

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
                          if (confirm("Are you sure want to delete this todo? ")) {
                            deleteTodosMutation.mutate();
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
        </div>
      )}
    </div>
  );
};

export default TodosDetail;
