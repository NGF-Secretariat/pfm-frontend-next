"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import { useState, useEffect, use, useRef } from "react";
import { useRouter } from "next/navigation";
import blogService from "../../../../service/blogService";
import { toast } from "react-toastify";
import type { MDXEditorMethods } from '@mdxeditor/editor';

const EditorWrapper = dynamic(() => import("../../../../components/EditorWrapper"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center p-10">
            <Loader2 className="w-8 h-8 text-[#1D9E75] animate-spin" />
        </div>
    )
});

export default function EditBlogClient({
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadingCover, setUploadingCover] = useState(false);
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        author: "",
        date: "",
        image: "",
        excerpt: ""
    });

    const [tempUploadedImage, setTempUploadedImage] = useState<string | null>(null);

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
                    setFormData({
                        title: res.data.data.title || "",
                        slug: res.data.data.slug || "",
                        author: res.data.data.author || "NGF Secretariat",
                        date: res.data.data.date || "",
                        image: res.data.data.image || "",
                        excerpt: res.data.data.excerpt || ""
                    });
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

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.warn("File is too large. Max file size is 5MB.");
            return;
        }

        setUploadingCover(true);
        try {
            const res = await blogService.uploadImage(file, tempUploadedImage);
            if (res?.data?.success) {
                setFormData(prev => ({ ...prev, image: res.data.url }));
                setTempUploadedImage(res.data.url);
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
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.warn("File is too large. Max file size is 5MB.");
            throw new Error("File is too large");
        }

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

    const handleSave = async () => {
        if (!editorRef.current) {
            toast.error("Editor is not ready yet. Please try again.");
            return;
        }

        setSaving(true);
        try {
            const newContent = editorRef.current.getMarkdown();

            const res = await blogService.updateBlog(slug, {
                title: formData.title,
                slug: formData.slug,
                author: formData.author,
                date: formData.date,
                image: formData.image,
                excerpt: formData.excerpt,
                content: newContent
            });
            if (res?.data?.success) {
                toast.success("Blog updated successfully!");
                if (formData.slug !== slug) {
                    router.push(`/blog-post/${formData.slug}/edit`);
                }
            }
        } catch (error: any) {
            console.error("Update failed:", error);
            toast.error(error.response?.data?.message || "Failed to update blog post");
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
                            text-[#08542b]
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

                <h1 className="text-3xl font-bold text-[#08542b] mb-2">Editing: {formData.title || blog.title}</h1>
                <p className="text-gray-500 mb-8">Update the metadata and body content below. MDX features are fully supported.</p>

                {/* Metadata Fields */}
                <div className="bg-white p-6 rounded-3xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                            placeholder="Enter blog title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL friendly)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                            placeholder="e.g. my-new-post"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Produced / Publication Date</label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                            placeholder="e.g. July 29, 2026"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630]"
                            placeholder="e.g. NGF Secretariat"
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
                            <div 
                                onClick={() => {
                                    if (!uploadingCover) fileInputRef.current?.click();
                                }}
                                className="relative flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 hover:bg-gray-100/50 hover:border-[#1D9E75] transition-all cursor-pointer select-none"
                            >
                                {uploadingCover && (
                                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-3xl z-10">
                                        <Loader2 className="w-8 h-8 text-[#016630] animate-spin mb-2" />
                                        <span className="text-sm font-semibold text-gray-700">Uploading image to Cloudinary... Please wait.</span>
                                    </div>
                                )}

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
                                        Click here or choose a file to upload a high-resolution cover image
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!uploadingCover) fileInputRef.current?.click();
                                        }}
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
                                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
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
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#016630] min-h-[80px]"
                            placeholder="A brief summary of the post..."
                        />
                    </div>
                </div>

                <p className="text-gray-500 mb-4">Post Body (MDX Supported)</p>

                {/* Editor Container */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                    <EditorWrapper
                        markdown={blog.content}
                        editorRef={editorRef}
                        imageUploadHandler={handleInlineImageUpload}
                    />
                </div>
            </div>
        </section>
    );
}
