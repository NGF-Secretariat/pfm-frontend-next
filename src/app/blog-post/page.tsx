"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

const blogs = [
    {
        id: "digitalising-revenue",
        title:
            "Digitalising Revenue Administration: Lessons for Nigeria.",
        image: "/blogs/blog-1.jpg",
        date: "April 29, 2026",
        excerpt:
            "One of the challenges revenue authorities face is delivering digital transformation quickly and cost-effectively.",
    },
    {
        id: "iran-war-oil",
        title:
            "The Iran War: Impact of Rising Crude Oil Prices on Nigeria’s Mineral Revenue",
        image: "/blogs/blog-2.jpg",
        date: "April 9, 2026",
        excerpt:
            "Impact of rising crude oil prices on Nigeria’s mineral revenue since the outbreak of conflict.",
    },
    {
        id: "digital-tax",
        title:
            "How digital tax reforms can transform Nigeria’s revenue challenges into fiscal successes",
        image: "/blogs/blog-3.jpg",
        date: "March 18, 2026",
        excerpt:
            "Digital tax reforms can help Nigeria improve revenue generation and fiscal sustainability.",
    },
    {
        id: "pfm-africa",
        title:
            "Digital PFM in Action: Building Resilient and Inclusive Fiscal Systems for African Governments",
        image: "/blogs/blog-4.jpg",
        date: "March 18, 2026",
        excerpt:
            "Conversations on Public Financial Management across the African continent are changing rapidly.",
    },
];

export default function BlogPage() {
    return (
        <section className="bg-[#f8faf9] min-h-screen py-14 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-14">
                    <h1 className="text-4xl sm:text-5xl font-bubblegum text-[#012c14]">
                        Public Finance: The Blog
                    </h1>

                    <p className="mt-4 text-gray-600 text-lg max-w-2xl">
                        Insights, policy discussions, and updates on public finance,
                        taxation, fiscal systems, and digital transformation.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blog-post/${blog.id}`}
                            className="
                group bg-white rounded-3xl overflow-hidden
                shadow-md hover:shadow-2xl
                transition-all duration-500
                border border-gray-100
              "
                        >
                            {/* Image */}
                            <div className="overflow-hidden">
                                <Image
                                    src={blog.image || "/blog-4.jpg"}
                                    alt={blog.title}
                                    width={700}
                                    height={500}
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
            </div>
        </section>
    );
}