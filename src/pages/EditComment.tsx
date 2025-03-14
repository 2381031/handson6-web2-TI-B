import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentForm, { CommentFormInput } from "../components/CommentForm";
import axios from "../utils/AxiosInstance";
import {fetchCommentDetail} from "./CommentDetail";

const editComment = async (data: CommentFormInput, id: string | undefined) => {
  return await axios.put(`/comment/${id}`, data);
};

const EditComment = () => {
  const { id } = useParams();
  const editCommentMutation = useMutation({
    mutationFn: (data: CommentFormInput) => editComment(data, id)
  });
  const getCommentDetail = useQuery({
    queryKey: ["commentDetail", id],
    queryFn: () => fetchCommentDetail(id)
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (editCommentMutation.isSuccess) {
      navigate("/comment", { replace: true });
    }
  }, [editCommentMutation.isSuccess]);
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {(editCommentMutation.isPending || getCommentDetail.isFetching) && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 flex items-center space-x-4">
            <span className="text-xl font-medium text-gray-700">Editing comment...</span>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Comment</h1>
        <CommentForm
          isEdit={true}
          mutateFn={editCommentMutation.mutate}
          defaultInputData={{
            body: getCommentDetail.data?.data.body || '',
            userId: getCommentDetail.data?.data.userId || 0,
          }}
        />
      </div>
    </div>
  );
};

export default EditComment;
