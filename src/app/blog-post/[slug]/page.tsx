"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowLeft, Loader2, Edit } from "lucide-react";
import { useState, useEffect, use } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import blogService from "../../../service/blogService";

export default function BlogDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Next.js 16 requires unwrapping params with use() if they are async
    const { slug } = use(params);
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
                    {/* <Link
                        href={`/blog-post/${blog.slug}/edit`}
                        className="
                            inline-flex items-center gap-2
                            text-[#016630] font-semibold bg-green-50
                            px-4 py-2 rounded-full hover:bg-green-100 transition-colors
                        "
                    >
                        <Edit size={16} />
                        Edit Post
                    </Link> */}
                </div>

                {/* Hero Image */}
                <div className="overflow-hidden rounded-3xl shadow-2xl mb-10">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        onError={(e: any) => {
                            e.currentTarget.src = "/ngf-logo.png";
                        }}
                        className="w-full h-[250px] sm:h-[400px] lg:h-[500px] object-cover"
                    />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <CalendarDays size={18} />
                    <span>{blog.date}</span>
                </div>

                {/* Title */}
                <h1
                    className="
                        text-3xl sm:text-5xl
                        font-bold text-[#012c14]
                        leading-tight mb-8
                    "
                >
                    {blog.title}
                </h1>

                {/* Content */}
                <article
                    className="
                        prose prose-lg max-w-none
                        prose-headings:text-[#012c14]
                        prose-p:text-gray-700
                        prose-p:leading-8
                        prose-a:text-[#016630] prose-a:no-underline hover:prose-a:underline
                        prose-li:text-gray-700
                    "
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {blog.content}
                    </ReactMarkdown>
                </article>
            </div>
        </section>
    );
}