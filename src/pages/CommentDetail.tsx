import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";

interface CommentDetail {
    id: number;
    body: string;
    postId: number;
    likes: number;
    userId: number;
    user: {
      username: string;
      fullName: string;
    };
}

interface DeletedComment extends CommentDetail {
  isDeleted: Boolean;
  deletedOn: string;
}

export const fetchCommentDetail = async (id: string | undefined) => {
  return await axios.get<CommentDetail>(`/comment/${id}`);
};

const deleteComment = async (id: string | undefined) => {
  return await axios.delete<DeletedComment>(`comment/${id}`);
};

const CommentDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-2/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
            <div>
              <div className="h-3 bg-slate-200 rounded w-20 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentDetail = () => {
  const { id } = useParams();
  const getCommentDetail = useQuery({
    queryKey: ["commentDetail", id],
    queryFn: () => fetchCommentDetail(id),
  });
  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(id),
  });
  const comment: CommentDetail | undefined = getCommentDetail.data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteCommentMutation.isSuccess) {
      navigate("/comment", { replace: true });
    }
  }, [deleteCommentMutation.isSuccess]);

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      {getCommentDetail.isFetching || comment === undefined ? (
        <CommentDetailSkeleton />
      ) : (
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md">
            {deleteCommentMutation.isPending && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 shadow-xl flex items-center gap-3">
                  <div className="animate-spin h-6 w-6 border-3 border-indigo-600 border-t-transparent rounded-full"></div>
                  <span className="text-gray-700">Deleting...</span>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">@{comment.user.username}</h3>
                    <p className="text-sm text-gray-500">{comment.user.fullName}</p>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="p-1.5 hover:bg-gray-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                    <button
                      onClick={() => navigate("edit")}
                      className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Edit Comment
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this comment?")) {
                          deleteCommentMutation.mutate();
                        }
                      }}
                      className="w-full px-3 py-1.5 text-left text-sm text-red-500 hover:bg-red-50"
                    >
                      Delete Comment
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">{comment.body}</p>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-gray-600 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">{comment.likes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentDetail;
