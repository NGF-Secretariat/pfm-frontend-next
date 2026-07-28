"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, ArrowLeft, Loader2, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import blogService from "../../../service/blogService";

const formatContent = (content: string): string => {
    if (!content) return "";
    const lines = content.replace(/\r\n/g, "\n").split("\n");
    const cleaned = lines.map(line => line.trim() === "" ? "" : line).join("\n");
    return cleaned.replace(/\n{3,}/g, (match) => {
        const count = match.length - 2;
        return "\n\n" + Array(count).fill("\u00a0").join("\n\n") + "\n\n";
    });
};

const getTagsForBlog = (title: string, content: string): string[] => {
    const tags: string[] = ["Public Finance"];
    const text = (title + " " + content).toLowerCase();
    if (text.includes("debt") || text.includes("loan") || text.includes("borrow") || text.includes("financing")) tags.push("Debt");
    if (text.includes("revenue") || text.includes("tax") || text.includes("igr") || text.includes("levy")) tags.push("Taxation");
    if (text.includes("infrastructure") || text.includes("capital") || text.includes("project") || text.includes("road") || text.includes("power")) tags.push("Infrastructure");
    if (text.includes("health") || text.includes("medical") || text.includes("hospital") || text.includes("doctor")) tags.push("Health");
    if (text.includes("education") || text.includes("school") || text.includes("teacher") || text.includes("university")) tags.push("Education");
    if (text.includes("zone") || text.includes("regional") || text.includes("north") || text.includes("south")) tags.push("Geopolitical");
    if (text.includes("transparency") || text.includes("open") || text.includes("audit") || text.includes("account")) tags.push("Transparency");
    if (text.includes("expenditure") || text.includes("budget") || text.includes("allocation")) tags.push("Expenditure");
    if (tags.length < 3) tags.push("Governance", "Nigeria");
    return Array.from(new Set(tags)).slice(0, 5); // Return top 5 unique tags
};

export default function BlogDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const router = useRouter();
    // Next.js 16 requires unwrapping params with use() if they are async
    const { slug } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await blogService.deleteBlog(slug);
            if (res?.data?.success) {
                toast.success("Blog post deleted successfully!");
                router.push("/blog-post");
            } else {
                toast.error("Failed to delete blog post.");
            }
        } catch (err: any) {
            console.error("Delete failed:", err);
            toast.error(err.response?.data?.message || "Failed to delete blog post.");
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }, []);

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
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchBlog();
        return () => { isMounted = false; };
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faf9]">
                <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading blog post...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Blog Not Found
                </h1>
            </div>
        );
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedText = encodeURIComponent(blog.title || '');
    const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        x: `https://x.com/intent/post?text=${encodedText}%20${encodedUrl}`,
        threads: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`,
        email: `mailto:?subject=${encodedText}&body=Check out this article: ${encodedUrl}`
    };
    const tags = getTagsForBlog(blog.title || "", blog.content || "");

    return (
        <section className="bg-[#f8faf9] min-h-screen py-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    {/* Back */}
                    <Link
                        href="/blog-post"
                        className="
                            inline-flex items-center gap-2
                            text-[#08542b]
                            hover:gap-4 transition-all
                        "
                    >
                        <ArrowLeft size={18} />
                        Back to Blog
                    </Link>

                    {/* Actions for Logged in session */}
                    {isLoggedIn && (
                        <div className="flex items-center gap-3">
                            <Link
                                href={`/blog-post/${blog.slug}/edit`}
                                className="
                                    inline-flex items-center gap-2
                                    text-[#016630] font-semibold bg-green-50
                                    px-4 py-2 rounded-full hover:bg-green-100 transition-colors text-sm
                                "
                            >
                                <Edit size={16} />
                                Edit Post
                            </Link>
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="
                                    inline-flex items-center gap-2
                                    text-red-600 font-semibold bg-red-50
                                    px-4 py-2 rounded-full hover:bg-red-100 transition-colors text-sm
                                "
                            >
                                <Trash2 size={16} />
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>

                {/* Hero Image */}
                <div className="overflow-hidden rounded-3xl shadow-2xl mb-8">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        onError={(e: any) => {
                            e.currentTarget.src = "/ngf-logo.png";
                        }}
                        className="w-full h-[250px] sm:h-[400px] lg:h-[500px] object-cover"
                    />
                </div>

                {/* Meta & Title Block */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        <CalendarDays size={14} className="text-[#1D9E75]" />
                        <span>{blog.date}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#08542b] leading-tight mb-4">
                        {blog.title}
                    </h1>

                    {blog.excerpt && (
                        <p className="text-base sm:text-lg text-gray-500 italic leading-relaxed font-medium">
                            {blog.excerpt}
                        </p>
                    )}
                </div>

                <div className="border-b border-gray-200 mb-8" />

                {/* Split Layout Container */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Sidebar (Share & Tags) */}
                    <div className="md:col-span-3 flex flex-col gap-8 border-b md:border-b-0 pb-6 md:pb-0 border-gray-200 md:sticky md:top-6">
                        <div>
                            <span className="block text-xs font-extrabold uppercase tracking-widest text-[#08542b] mb-3">
                                Share
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                {/* Linkedin */}
                                <a
                                    href={shareLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#08542b] flex items-center justify-center text-[#08542b] hover:bg-[#08542b] hover:text-white transition-all duration-200 cursor-pointer font-sans font-bold text-sm leading-none"
                                    title="Share on LinkedIn"
                                >
                                    in
                                </a>
                                {/* Facebook */}
                                <a
                                    href={shareLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#08542b] flex items-center justify-center text-[#08542b] hover:bg-[#08542b] hover:text-white transition-all duration-200 cursor-pointer font-serif font-bold text-base leading-none"
                                    title="Share on Facebook"
                                >
                                    f
                                </a>
                                {/* X (formerly Twitter) */}
                                <a
                                    href={shareLinks.x}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#08542b] flex items-center justify-center text-[#08542b] hover:bg-[#08542b] hover:text-white transition-all duration-200 cursor-pointer"
                                    title="Share on X"
                                >
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                {/* Threads */}
                                <a
                                    href={shareLinks.threads}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#08542b] flex items-center justify-center text-[#08542b] hover:bg-[#08542b] hover:text-white transition-all duration-200 cursor-pointer font-sans font-semibold text-sm leading-none"
                                    title="Share on Threads"
                                >
                                    @
                                </a>
                                {/* Email */}
                                <a
                                    href={shareLinks.email}
                                    className="w-9 h-9 rounded-full border border-[#08542b] flex items-center justify-center text-[#08542b] hover:bg-[#08542b] hover:text-white transition-all duration-200 cursor-pointer"
                                    title="Share via Email"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="16" rx="2" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {tags.length > 0 && (
                            <div>
                                <span className="block text-xs font-extrabold uppercase tracking-widest text-[#08542b] mb-3">
                                    Tags
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 rounded text-[11px] font-medium leading-none cursor-default animate-fade-in"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Main Column (Article Content) */}
                    <div className="md:col-span-9 min-w-0">
                        <article
                            className="
                                prose prose-md sm:prose-lg max-w-none
                                prose-headings:text-[#08542b] prose-headings:font-bold
                                prose-p:text-gray-700
                                prose-p:leading-8
                                prose-a:text-[#016630] prose-a:no-underline hover:prose-a:underline
                                prose-li:text-gray-700
                            "
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    img: ({ node, ...props }) => (
                                        <img
                                            {...props}
                                            className="rounded-2xl shadow-md mx-auto max-h-[550px] w-auto object-cover my-6 border border-gray-100"
                                            onError={(e: any) => {
                                                console.warn("Blog body image failed to load:", props.src);
                                            }}
                                        />
                                    )
                                }}
                            >
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-scale-up">
                        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Blog Post?</h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            Are you sure you want to delete <span className="font-semibold text-gray-800">"{blog.title}"</span>? This will permanently erase the post and any uploaded images associated with it. This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={deleting}
                                className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="px-5 py-2.5 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
                            >
                                {deleting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                {deleting ? "Deleting..." : "Yes, Delete Post"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}