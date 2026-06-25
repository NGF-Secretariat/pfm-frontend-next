"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import blogService from "../../../service/blogService";
import { toast } from "react-toastify";
import type { MDXEditorMethods } from '@mdxeditor/editor';

// MDXEditor must be loaded dynamically with ssr disabled
const EditorWrapper = dynamic(() => import("../../../components/EditorWrapper"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center p-10">
            <Loader2 className="w-8 h-8 text-[#1D9E75] animate-spin" />
        </div>
    )
});

export default function CreateBlogPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const editorRef = useRef<MDXEditorMethods>(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!loggedIn) {
            toast.error("You must be logged in to access this page.");
            router.replace("/blog-post");
        } else {
            setCheckingAuth(false);
        }
    }, [router]);


    // Generate a unique 5-character string once when the component mounts
    const [uniqueSuffix] = useState(() => Math.random().toString(36).substring(2, 7));

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        image: "/blogs/blog-1.jpg",
        excerpt: ""
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const baseSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove non-word chars
            .replace(/[\s_-]+/g, '-') // Swap spaces for hyphens
            .replace(/^-+|-+$/g, '') // Trim hyphens
            .split('-')
            .slice(0, 5) // Take first 5 words for short slug
            .join('-');

        const slug = baseSlug ? `${baseSlug}-${uniqueSuffix}` : "";
        setFormData({ ...formData, title, slug });
    };

    const handleSave = async () => {
        if (!editorRef.current) return;
        const content = editorRef.current.getMarkdown();

        if (!formData.title || !formData.slug) {
            toast.error("Title and Slug are required.");
            return;
        }

        setSaving(true);
        try {
            const res = await blogService.createBlog({ ...formData, content });
            if (res?.data?.success) {
                toast.success("Blog post created successfully!");
                router.push("/blog-post");
            }
        } catch (error) {
            console.error("Create failed:", error);
            toast.error("Failed to create blog post");
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

    return (
        <section className="bg-[#f8faf9] min-h-screen py-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    {/* Back */}
                    <Link
                        href={`/blog-post`}
                        className="
                            inline-flex items-center gap-2
                            text-[#012c14]
                            hover:gap-4 transition-all
                        "
                    >
                        <ArrowLeft size={18} />
                        Back to Blogs
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
                        {saving ? "Publishing..." : "Publish Post"}
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-[#012c14] mb-8">Create New Blog Post</h1>

                {/* Metadata Fields */}
                <div className="bg-white p-6 rounded-3xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                            placeholder="Enter blog title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL friendly)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                            placeholder="e.g. my-new-post"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] min-h-[80px]"
                            placeholder="A brief summary of the post..."
                        />
                    </div>
                </div>

                <p className="text-gray-500 mb-4">Post Body (MDX Supported)</p>

                {/* Editor Container */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 min-h-[400px]">
                    <EditorWrapper
                        markdown={""}
                        editorRef={editorRef}
                    />
                </div>
            </div>
        </section>
    );
}
