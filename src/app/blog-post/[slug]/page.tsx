import BlogDetailsClient from "./BlogDetailsClient";
import blogService from "../../../service/blogService";

export async function generateStaticParams() {
    try {
        const res = await blogService.getAllBlogs();
        if (res?.data?.success && Array.isArray(res.data.data)) {
            const slugs = res.data.data.map((blog: any) => ({ slug: String(blog.slug) }));
            if (slugs.length > 0) return slugs;
        }
    } catch (error) {
        console.error("Failed to fetch blog static params:", error);
    }
    return [{ slug: 'default' }];
}

export default function BlogDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return <BlogDetailsClient params={params} />;
}