import {useState} from "react";
import * as React from "react";
import {createPost} from "../services/postService.ts";
import {useNavigate} from "react-router-dom";

function PostCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false); // 🔥 état de chargement
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // active le loader
        try {
            await createPost({title, body});
            navigate('/');
        } catch (err) {
            console.error("Erreur lors de la création du post", err);
            alert("Impossible de créer le post. Réessayez !");
        } finally {
            setLoading(false); // désactive le loader
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-2xl">
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Créer un nouveau Post</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Remplissez les champs ci-dessous pour ajouter un article.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Titre du Post
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Entrez le titre du post"
                            required
                            disabled={loading} // désactive pendant envoi
                        />
                    </div>

                    <div>
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                            Contenu du Post
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={6}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                            placeholder="Écrivez le contenu de votre post ici..."
                            required
                            disabled={loading}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
                        }`}
                    >
                        {loading ? "Création en cours..." : "Créer le Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostCreate;
