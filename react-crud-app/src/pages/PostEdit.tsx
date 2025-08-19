import { useEffect, useState } from "react";
import * as React from "react";
import { getPost, updatePost } from "../services/postService.ts";
import { useNavigate, useParams } from "react-router-dom";

function PostEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true); //  état de chargement
    const [saving, setSaving] = useState(false); //  état pendant la sauvegarde
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getPost(id)
                .then((res) => {
                    setTitle(res.data.title);
                    setBody(res.data.body);
                })
                .finally(() => setLoading(false)); //  stoppe le loader
        }
    }, [id]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setSaving(true);
        try {
            await updatePost(id, { title, body });
            navigate("/");
        } catch (err) {
            console.error("Erreur lors de la mise à jour", err);
            alert("Impossible de modifier le post.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
                Chargement des données...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-2xl">
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                        Modifier un Post
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Modifiez les champs ci-dessous puis sauvegardez vos changements.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Titre du Post
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={saving}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="body"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contenu du Post
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={6}
                            disabled={saving}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y disabled:bg-gray-100"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            saving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
                        }`}
                    >
                        {saving ? "Sauvegarde en cours..." : "Modifier le Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PostEdit;
