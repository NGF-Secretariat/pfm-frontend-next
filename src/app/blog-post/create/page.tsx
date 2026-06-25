"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import blogService from "../../../service/blogService";
import { toast } from "react-toastify";
import type { MDXEditorMethods } from '@mdxeditor/editor';
import { $getRoot, $createTextNode } from 'lexical';

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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadingCover, setUploadingCover] = useState(false);
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");

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
        image: "",
        excerpt: ""
    });

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingCover(true);
        try {
            const res = await blogService.uploadImage(file);
            if (res?.data?.success) {
                setFormData(prev => ({ ...prev, image: res.data.url }));
                toast.success("Cover image uploaded successfully!");
            }
        } catch (err) {
            console.error("Failed to upload cover image:", err);
            toast.error("Failed to upload cover image");
        } finally {
            setUploadingCover(false);
        }
    };

    const handleInlineImageUpload = async (file: File): Promise<string> => {
        try {
            const res = await blogService.uploadImage(file);
            if (res?.data?.success) {
                return res.data.url;
            }
            throw new Error("Failed to upload inline image");
        } catch (err) {
            console.error("Inline image upload failed:", err);
            throw err;
        }
    };

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

        setSaving(true);
        try {
            // Find the Lexical editor instance from the DOM
            const editorDom = document.querySelector('.prose [contenteditable="true"]') as any;
            const lexicalEditor = editorDom?.__lexicalEditor;
            if (lexicalEditor) {
                // Run a Lexical update to fill empty paragraphs with a non-breaking space
                // so Lexical's markdown exporter won't strip them!
                lexicalEditor.update(() => {
                    const root = $getRoot();
                    const children = root.getChildren();
                    children.forEach(node => {
                        if (node.getType() === 'paragraph') {
                            const paragraph = node as any;
                            if (paragraph.isEmpty() || paragraph.getTextContent() === '') {
                                paragraph.clear();
                                paragraph.append($createTextNode('\u00a0'));
                            }
                        }
                    });
                });
                // Wait for the state update to commit
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            const content = editorRef.current.getMarkdown();

            if (!formData.title || !formData.slug) {
                toast.error("Title and Slug are required.");
                return;
            }

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
                    <div className="md:col-span-2 border-t border-gray-100 pt-6">
                        <label className="block text-sm font-bold text-gray-800 mb-2">Cover Image</label>
                        <div className="flex gap-4 mb-4">
                            <button
                                type="button"
                                onClick={() => setImageInputMode("upload")}
                                className={`px-4 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                                    imageInputMode === "upload"
                                        ? "bg-[#eafbf5] text-[#016630] border border-[#bbf7df]"
                                        : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
                                }`}
                            >
                                Upload Image
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageInputMode("url")}
                                className={`px-4 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                                    imageInputMode === "url"
                                        ? "bg-[#eafbf5] text-[#016630] border border-[#bbf7df]"
                                        : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
                                }`}
                            >
                                Image URL
                            </button>
                        </div>

                        {imageInputMode === "upload" ? (
                            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 hover:border-[#1D9E75] transition-colors">
                                {/* Thumbnail Preview */}
                                <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0 relative border border-gray-200 flex items-center justify-center">
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt="Cover Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-gray-400 text-xs font-medium">No Image Uploaded</div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <h4 className="font-bold text-gray-800 text-sm mb-1">
                                        Upload a high-resolution cover image
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-4 leading-normal">
                                        Supports PNG, JPG, JPEG or WEBP formats. Max file size: 10MB.
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleCoverUpload}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        disabled={uploadingCover}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 hover:border-[#1D9E75] text-[#016630] font-bold text-xs rounded-full hover:bg-gray-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                                    >
                                        {uploadingCover ? (
                                            <>
                                                <Loader2 size={14} className="animate-spin text-[#1D9E75]" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={14} />
                                                Choose File
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] text-sm"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        )}
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
                        imageUploadHandler={handleInlineImageUpload}
                    />
                </div>
            </div>
        </section>
    );
}
