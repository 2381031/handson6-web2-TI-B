import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm, { PostFormInput } from "../components/PostForm";
import axios from "../utils/AxiosInstance";
import {fetchPostDetail} from "./PostDetail";

const editPost = async (data: PostFormInput, id: string | undefined) => {
  return await axios.put(`/post/${id}`, data);
};

const EditPost = () => {
  const { id } = useParams();
  const editPostMutation = useMutation({
    mutationFn: (data: PostFormInput) => editPost(data, id)
  });
  const getPostDetail = useQuery({
    queryKey: ["postDetail", id],
    queryFn: () => fetchPostDetail(id)
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (editPostMutation.isSuccess) {
      navigate("/post", { replace: true });
    }
  }, [editPostMutation.isSuccess]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      {(editPostMutation.isPending || getPostDetail.isFetching) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 flex items-center space-x-4">
            <span className="text-xl font-medium text-gray-700">Editing post...</span>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Post</h1>
        <PostForm
          isEdit={true}
          mutateFn={editPostMutation.mutate}
          defaultInputData={getPostDetail.data?.data}   
        />
      </div>
    </div>
  );
};

export default EditPost;