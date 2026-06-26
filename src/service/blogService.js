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

  uploadImage(file, previousImage = null) {
    const formData = new FormData();
    formData.append("file", file);
    if (previousImage) {
      formData.append("previousImage", previousImage);
    }
    return httpService.post("/blogs/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new BlogService();
