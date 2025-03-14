import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Post from "./pages/Post";
import Product from "./pages/Product";
import Recipes from "./pages/Recipes";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AddRecipes from "./pages/AddRecipes";
import EditRecipes from "./pages/EditRecipes";
import RecipesDetail from "./pages/RecipesDetail";
import PostDetail from "./pages/PostDetail";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Comment from "./pages/Comment";
import AddComment from "./pages/AddComment";
import EditComment from "./pages/EditComment";
import CommentDetail from "./pages/CommentDetail";
import Todos from "./pages/Todos";
import TodosDetail from "./pages/TodosDetail";
import AddTodos from "./pages/AddTodos";
import EditTodos from "./pages/EditTodos";

const queryClient = new QueryClient()

function App() {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home/>} />
			<Route path="product" element={<Product />} />
			<Route path="product/add" element={<AddProduct />} />
			<Route path="product/:id/edit" element={<EditProduct/>}/>
			<Route path="product/:id" element={<ProductDetail/>}/>
			<Route path="recipes" element={<Recipes/>} />
			<Route path="recipes/add" element={<AddRecipes/>} />
			<Route path="recipes/:id/edit" element={<EditRecipes/>}/>
			<Route path="recipes/:id" element={<RecipesDetail/>}/>
			<Route path="post" element={<Post />} />
			<Route path="post/add" element={<AddPost />} />
			<Route path="post/:id/edit" element={<EditPost />} />
			<Route path="post/:id" element={<PostDetail />} />
			<Route path="comment" element={<Comment/>} />
			<Route path="comment/add" element={<AddComment/>} />
			<Route path="comment/:id/edit" element={<EditComment/>} />
			<Route path="comment/:id" element={<CommentDetail/>} />
			<Route path="todos" element={<Todos/>} />
			<Route path="todos/add" element={<AddTodos/>}/>
			<Route path="todos/:id/edit" element={<EditTodos/>} />
			<Route path="todos/:id" element={<TodosDetail />} />

		</Route>
	)
	);
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
}

export default App
