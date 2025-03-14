import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodosForm, { TodosFormInput } from "../components/TodosForm";
import axios from "../utils/AxiosInstance";
import { fetchTodosDetail } from "./TodosDetail";

const editTodos = async (data: TodosFormInput, id: string | undefined) => {
  return await axios.put(`/todos/${id}`, data);
};

const EditTodos = () => {
  const { id } = useParams();
  const editTodosMutation = useMutation({
    mutationFn: (data: TodosFormInput) => editTodos(data, id)
  });
  const getTodosDetail = useQuery({
    queryKey: ["todosDetail", id],
    queryFn: () => fetchTodosDetail(id)
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (editTodosMutation.isSuccess) {
      navigate("/todos", { replace: true });
    }
  }, [editTodosMutation.isSuccess]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      {(editTodosMutation.isPending || getTodosDetail.isFetching) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 flex items-center space-x-4">
            <span className="text-xl font-medium text-gray-700">Editing todo...</span>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-purple-600"></div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Todo</h1>
        <TodosForm
          isEdit={true}
          mutateFn={editTodosMutation.mutate}
          defaultInputData={getTodosDetail.data?.data}
        />
      </div>
    </div>
  );
};

export default EditTodos;
