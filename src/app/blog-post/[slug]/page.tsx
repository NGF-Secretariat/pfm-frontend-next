"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";

const blogData: any = {
    "digitalising-revenue": {
        title:
            "Digitalising Revenue Administration: Lessons for Nigeria.",
        image: "/blogs/blog-1.jpg",
        date: "April 29, 2026",
        content: `
      Digital transformation in revenue administration remains one of the
      most important reforms for developing economies.

      Nigeria continues to explore ways to modernize tax collection,
      reduce leakages, and improve transparency across public finance systems.

      The transition toward digital revenue systems improves accountability,
      expands the tax base, and reduces inefficiencies associated with
      manual processes.

      However, challenges including infrastructure gaps, limited digital
      literacy, and institutional resistance continue to slow implementation.
    `,
    },

    "iran-war-oil": {
        title:
            "The Iran War: Impact of Rising Crude Oil Prices on Nigeria’s Mineral Revenue",
        image: "/blogs/blog-2.jpg",
        date: "April 9, 2026",
        content: `
      Rising crude oil prices have significant implications for Nigeria’s
      mineral revenue and fiscal projections.

      Oil-exporting nations often experience short-term revenue gains
      during geopolitical crises, but long-term economic stability
      depends on diversification and prudent fiscal management.
    `,
    },

    "digital-tax": {
        title:
            "How digital tax reforms can transform Nigeria’s revenue challenges into fiscal successes",
        image: "/blogs/blog-3.jpg",
        date: "March 18, 2026",
        content: `
      Digital taxation has become increasingly relevant as governments
      seek sustainable revenue sources in the digital economy.

      Nigeria’s fiscal authorities are exploring reforms that can
      improve compliance while supporting innovation and economic growth.
    `,
    },

    "pfm-africa": {
        title:
            "Digital PFM in Action: Building Resilient and Inclusive Fiscal Systems for African Governments",
        image: "/blogs/blog-4.jpg",
        date: "March 18, 2026",
        content: `
      Across Africa, governments are adopting digital public financial
      management systems to improve transparency, resilience,
      and service delivery.

      These reforms support evidence-based budgeting,
      fiscal sustainability, and citizen engagement.
    `,
    },
};

export default function BlogDetailsPage({
    params,
}: {
    params: { slug: string };
}) {
    const blog = blogData[params.slug];

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

                {/* Back */}
                <Link
                    href="/blog-post"
                    className="
            inline-flex items-center gap-2
            text-[#012c14] mb-8
            hover:gap-4 transition-all
          "
                >
                    <ArrowLeft size={18} />
                    Back to Blog
                </Link>

                {/* Hero Image */}
                <div className="overflow-hidden rounded-3xl shadow-2xl mb-10">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        width={1400}
                        height={700}
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
          "
                >
                    {blog.content.split("\n").map((paragraph: string, index: number) => (
                        paragraph.trim() ? (
                            <p key={index}>{paragraph}</p>
                        ) : null
                    ))}
                </article>
            </div>
        </section>
    );
}