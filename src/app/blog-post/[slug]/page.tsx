"use client";

import Link from "next/link";
import { CalendarDays, ArrowLeft, Loader2, Edit } from "lucide-react";
import { useState, useEffect, use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    // Next.js 16 requires unwrapping params with use() if they are async
    const { slug } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                            text-[#012c14]
                            hover:gap-4 transition-all
                        "
                    >
                        <ArrowLeft size={18} />
                        Back to Blog
                    </Link>

                    {/* Edit */}
                    {isLoggedIn && (
                        <Link
                            href={`/blog-post/${blog.slug}/edit`}
                            className="
                                inline-flex items-center gap-2
                                text-[#016630] font-semibold bg-green-50
                                px-4 py-2 rounded-full hover:bg-green-100 transition-colors
                            "
                        >
                            <Edit size={16} />
                            Edit Post
                        </Link>
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

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#012c14] leading-tight mb-4">
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
                            <span className="block text-xs font-extrabold uppercase tracking-widest text-[#012c14] mb-3">
                                Share
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                {/* Linkedin */}
                                <a
                                    href={shareLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#012c14] flex items-center justify-center text-[#012c14] hover:bg-[#012c14] hover:text-white transition-all duration-200 cursor-pointer font-sans font-bold text-sm leading-none"
                                    title="Share on LinkedIn"
                                >
                                    in
                                </a>
                                {/* Facebook */}
                                <a
                                    href={shareLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#012c14] flex items-center justify-center text-[#012c14] hover:bg-[#012c14] hover:text-white transition-all duration-200 cursor-pointer font-serif font-bold text-base leading-none"
                                    title="Share on Facebook"
                                >
                                    f
                                </a>
                                {/* X (formerly Twitter) */}
                                <a
                                    href={shareLinks.x}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#012c14] flex items-center justify-center text-[#012c14] hover:bg-[#012c14] hover:text-white transition-all duration-200 cursor-pointer"
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
                                    className="w-9 h-9 rounded-full border border-[#012c14] flex items-center justify-center text-[#012c14] hover:bg-[#012c14] hover:text-white transition-all duration-200 cursor-pointer font-sans font-semibold text-sm leading-none"
                                    title="Share on Threads"
                                >
                                    @
                                </a>
                                {/* Email */}
                                <a
                                    href={shareLinks.email}
                                    className="w-9 h-9 rounded-full border border-[#012c14] flex items-center justify-center text-[#012c14] hover:bg-[#012c14] hover:text-white transition-all duration-200 cursor-pointer"
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
                                <span className="block text-xs font-extrabold uppercase tracking-widest text-[#012c14] mb-3">
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
                                prose-headings:text-[#012c14] prose-headings:font-bold
                                prose-p:text-gray-700
                                prose-p:leading-8
                                prose-a:text-[#016630] prose-a:no-underline hover:prose-a:underline
                                prose-li:text-gray-700
                            "
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {formatContent(blog.content)}
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}