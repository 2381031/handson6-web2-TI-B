import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

interface CommentData {
  comments: Comment[];
}

const fetchCommentList = async () => {
  return await axios.get<CommentData>("/comment");
};

const CommentSkeleton = () => {
  return (
    <div className="animate-pulse p-4 border rounded-lg">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-4 h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

const Comment = () => {
  const getCommentList = useQuery({
    queryKey: ["commentList"],
    queryFn: fetchCommentList,
  });
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <button 
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transform hover:scale-110 transition-all duration-200" 
        onClick={() => navigate("./add")}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Comments Feed
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getCommentList.isFetching
              ? Array.from({ length: 6 }).map((_, index) => (
                  <CommentSkeleton key={index} />
                ))
              : getCommentList.data?.data.comments.map((comments) => (
                <div
                  key={comments.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer"
                  onClick={() => navigate(`/comment/${comments.id}`)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">
                        {comments.user.fullName[0]}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">{comments.user.fullName}</p>
                      <p className="text-sm text-gray-500">@{comments.user.username}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{comments.body}</p>
                  
                  <div className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">{comments.likes} likes</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
