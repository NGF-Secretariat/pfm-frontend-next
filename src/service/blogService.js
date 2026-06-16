import httpService from "./httpService";

class BlogService {
  getAllBlogs() {
    return httpService.get("/blogs");
  }

  getBlogBySlug(slug) {
    return httpService.get(`/blogs/${slug}`);
  }

  createBlog(data) {
    return httpService.post(`/blogs`, data);
  }

  updateBlog(slug, data) {
    return httpService.patch(`/blogs/${slug}`, data);
  }
}

export default new BlogService();
