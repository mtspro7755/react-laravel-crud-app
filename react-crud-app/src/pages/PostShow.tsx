import { useEffect, useState } from "react";
import { getPost } from "../services/postService.ts";
import { useParams } from "react-router-dom";

function PostShow() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getPost(id)
                .then((res) => {
                    setTitle(res.data.title);
                    setBody(res.data.body);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
                Chargement du post...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            {/* Conteneur principal */}
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 lg:p-10 w-full max-w-2xl">
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                        Voir un Post
                    </h1>
                </div>

                <div className="space-y-6">
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
                            readOnly
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 sm:text-sm"
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
                            readOnly
                            rows={6}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 sm:text-sm resize-y"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostShow;
