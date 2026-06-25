"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import blogService from "../../service/blogService";

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }, []);

    useEffect(() => {
        let isMounted = true;
        async function fetchBlogs() {
            try {
                const res = await blogService.getAllBlogs();
                if (isMounted && res?.data?.success) {
                    setBlogs(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchBlogs();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className="bg-[#f8faf9] min-h-screen py-14 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bubblegum text-[#012c14]">
                            Public Finance: The Blog
                        </h1>
                        <p className="mt-4 text-gray-600 text-lg max-w-2xl">
                            Insights, policy discussions, and updates on public finance,
                            taxation, fiscal systems, and digital transformation.
                        </p>
                    </div>
                    {isLoggedIn && (
                        <Link
                            href="/blog-post/create"
                            className="
                                inline-flex items-center justify-center
                                bg-[#016630] text-white font-semibold
                                px-6 py-3 rounded-full hover:bg-[#014c24]
                                transition-colors shadow-md
                            "
                        >
                            Create Post
                        </Link>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-[#1D9E75] animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Loading blog posts...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {blogs.map((blog: any) => (
                            <Link
                                href={`/blog-post/${blog.slug}`}
                                key={blog.id}
                                className="group block bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 border border-gray-100"
                            >
                                {/* Image */}
                                <div className="overflow-hidden">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        onError={(e: any) => {
                                            e.currentTarget.src = "/ngf-logo.png";
                                        }}
                                        className="
                                            w-full h-[250px] object-cover
                                            group-hover:scale-105
                                            transition-transform duration-700
                                        "
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <CalendarDays size={16} />
                                        <span>{blog.date}</span>
                                    </div>

                                    {/* Title */}
                                    <h2
                                        className="
                                            text-2xl font-bold text-[#012c14]
                                            leading-tight mb-4
                                            group-hover:text-[#016630]
                                            transition-colors
                                        "
                                    >
                                        {blog.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 leading-7 mb-6">
                                        {blog.excerpt}
                                    </p>

                                    {/* Read More */}
                                    <div
                                        className="
                                            inline-flex items-center gap-2
                                            text-[#016630] font-semibold
                                            group-hover:gap-4
                                            transition-all duration-300
                                        "
                                    >
                                        Read More
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
