const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Home</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li className="text-green-600 hover:text-green-700">
                <a href="/todos" className="flex items-center">
                  <span className="mr-2">📝</span> Todos
                </a>
              </li>
              <li className="text-green-600 hover:text-green-700">
                <a href="/recipes" className="flex items-center">
                  <span className="mr-2">🍳</span> Recipes
                </a>
              </li>
              <li className="text-green-600 hover:text-green-700">
                <a href="/posts" className="flex items-center">
                  <span className="mr-2">📰</span> Posts
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Welcome Message</h2>
            <p className="text-gray-600">
              Welcome to your personal dashboard. Here you can manage all your tasks, recipes, and posts in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;