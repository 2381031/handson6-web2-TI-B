import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";

interface PostDetail {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
  thumbnail: string;
}

interface DeletedPost extends PostDetail {
  isDeleted: Boolean;
  deletedOn: string;
}

export const fetchPostDetail = async (id: string | undefined) => {
  return await axios.get<PostDetail>(`/post/${id}`);
};

const deletePost = async (id: string | undefined) => {
  return await axios.delete<DeletedPost>(`post/${id}`);
};

const PostDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="h-8 bg-blue-100 rounded-lg animate-pulse w-3/4 mb-8"></div>
          <div className="space-y-6">
            <div className="h-4 bg-blue-100 rounded-lg animate-pulse w-full"></div>
            <div className="h-4 bg-blue-100 rounded-lg animate-pulse w-full"></div>
            <div className="h-4 bg-blue-100 rounded-lg animate-pulse w-3/4"></div>
          </div>
          <div className="mt-8 flex space-x-8">
            <div className="h-6 bg-blue-100 rounded-full animate-pulse w-24"></div>
            <div className="h-6 bg-blue-100 rounded-full animate-pulse w-24"></div>
            <div className="h-6 bg-blue-100 rounded-full animate-pulse w-28"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const getPostDetail = useQuery({
    queryKey: ["postDetail", id],
    queryFn: () => fetchPostDetail(id),
  });
  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(id),
  });
  const post: PostDetail | undefined = getPostDetail.data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (deletePostMutation.isSuccess) {
      navigate("/post", { replace: true });
    }
  }, [deletePostMutation.isSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      {getPostDetail.isFetching || post === undefined ? (
        <PostDetailSkeleton />
      ) : (
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
            {deletePostMutation.isPending && (
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-2xl p-6 flex items-center space-x-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                  <span className="text-xl font-medium text-gray-700">Menghapus...</span>
                </div>
              </div>
            )}

            {post.thumbnail && (
              <div className="w-full h-80 overflow-hidden">
                <img 
                  src={post.thumbnail} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="p-10">
              <h1 className="text-4xl font-bold text-gray-800 mb-8 leading-tight">{post.title}</h1>

              <div className="prose prose-lg max-w-none text-gray-600 mb-10">
                {post.body}
              </div>

              <div className="flex items-center space-x-8 mb-8">
                <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">👍</span>
                  <span className="font-semibold text-blue-800">{post.reactions.likes}</span>
                </div>
                <div className="flex items-center space-x-3 bg-red-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">👎</span>
                  <span className="font-semibold text-red-800">{post.reactions.dislikes}</span>
                </div>
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full">
                  <span className="text-2xl">👁️</span>
                  <span className="font-semibold text-gray-800">{post.views} dilihat</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg inline-block">
                  ID Pengguna: {post.userId}
                </p>
              </div>

              <div className="fixed bottom-8 right-8 z-50">
                <div className="relative group">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-xl transition-all hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <div className="absolute bottom-16 right-0 bg-white rounded-xl shadow-2xl w-48 hidden group-focus-within:block overflow-hidden">
                    <button
                      onClick={() => navigate("edit")}
                      className="w-full text-left px-6 py-4 text-gray-700 hover:bg-indigo-50 transition-colors flex items-center space-x-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Ubah Post</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Apakah anda yakin ingin menghapus postingan ini?")) {
                          deletePostMutation.mutate();
                        }
                      }}
                      className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Hapus Post</span>
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

export default PostDetail;
