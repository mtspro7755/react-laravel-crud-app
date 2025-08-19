import { useEffect, useState } from "react";
import type { Post } from "../types/Post.ts";
import { deletePost, getPosts } from "../services/postService.ts";
import { Link } from "react-router-dom";

function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts().then((res) => {
            setPosts(res.data);
            setLoading(false);
        });
    }, []); // charge une seule fois au montage

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
            deletePost(id).then(() => {
                setPosts((prev) => prev.filter((post) => post.id !== id));
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            {/* Conteneur principal */}
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-6xl">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                        Gestion des Posts
                    </h1>
                    <Link
                        to="/create"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Ajouter un nouveau Post
                    </Link>
                </div>

                {/* Loader */}
                {loading ? (
                    <p className="text-center text-gray-600 py-10">Chargement...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-600 py-10">
                        Aucun post trouvé. Ajoutez-en un !
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full table-fixed divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="w-16 px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="w-1/4 px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Titre
                                </th>
                                <th className="w-2/4 px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Contenu
                                </th>
                                <th className="w-1/4 px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {post.id}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {post.title}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-700 truncate">
                                        {post.body}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium flex justify-center space-x-2">
                                        <Link
                                            to={`/edit/${post.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 px-3 py-1 border border-indigo-600 rounded-md hover:bg-indigo-50 transition"
                                        >
                                            Modifier
                                        </Link>
                                        <Link
                                            to={`/show/${post.id}`}
                                            className="text-green-600 hover:text-green-900 px-4 py-1 border border-green-600 rounded-md hover:bg-green-50 transition"
                                        >
                                            Voir
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded-md hover:bg-red-50 transition"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostList;
