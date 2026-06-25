"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import blogService from "../../../../service/blogService";
import { toast } from "react-toastify";
import type { MDXEditorMethods } from '@mdxeditor/editor';

// MDXEditor must be loaded dynamically with ssr disabled
const EditorWrapper = dynamic(() => import("../../../../components/EditorWrapper"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center p-10">
            <Loader2 className="w-8 h-8 text-[#1D9E75] animate-spin" />
        </div>
    )
});

export default function EditBlogPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const router = useRouter();
    const { slug } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const editorRef = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!loggedIn) {
            toast.error("You must be logged in to access this page.");
            router.replace(`/blog-post/${slug}`);
        } else {
            setCheckingAuth(false);
        }
    }, [slug, router]);

    useEffect(() => {
        let isMounted = true;
        async function fetchBlog() {
            try {
                const res = await blogService.getBlogBySlug(slug);
                if (isMounted && res?.data?.success) {
                    setBlog(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch blog:", err);
                toast.error("Failed to load blog post");
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchBlog();
        return () => { isMounted = false; };
    }, [slug]);

    const handleSave = async () => {
        if (!editorRef.current) return;
        const newContent = editorRef.current.getMarkdown();

        setSaving(true);
        try {
            const res = await blogService.updateBlog(slug, { content: newContent });
            if (res?.data?.success) {
                toast.success("Blog updated successfully!");
            }
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update blog post");
        } finally {
            setSaving(false);
        }
    };

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf9]">
                <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Checking permissions...</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf9]">
                <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading editor...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">Blog Not Found</h1>
            </div>
        );
    }

    return (
        <section className="bg-[#f8faf9] min-h-screen py-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    {/* Back */}
                    <Link
                        href={`/blog-post/${blog.slug}`}
                        className="
                            inline-flex items-center gap-2
                            text-[#012c14]
                            hover:gap-4 transition-all
                        "
                    >
                        <ArrowLeft size={18} />
                        Back to Post
                    </Link>

                    {/* Save */}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="
                            inline-flex items-center gap-2
                            text-white font-semibold bg-[#016630]
                            px-6 py-2 rounded-full hover:bg-[#014c24] transition-colors
                            disabled:opacity-50 disabled:cursor-not-allowed
                        "
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-[#012c14] mb-2">Editing: {blog.title}</h1>
                <p className="text-gray-500 mb-8">Use the editor below to format your text. MDX features like bold, lists, and headings are fully supported.</p>

                {/* Editor Container */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                    <EditorWrapper
                        markdown={blog.content}
                        editorRef={editorRef}
                    />
                </div>
            </div>
        </section>
    );
}
