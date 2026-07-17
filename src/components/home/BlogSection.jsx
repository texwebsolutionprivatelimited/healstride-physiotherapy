import BlogCard from "./BlogCard";
import { blogs } from "../../data/blogs";

const BlogSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-teal-600 font-semibold uppercase tracking-widest text-center">
          Latest Updates
        </p>

        <h2 className="text-4xl font-bold text-center mt-2">
          Health Blogs
        </h2>

        <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
          Read expert advice, physiotherapy tips, rehabilitation guides and
          wellness articles from HealStride specialists.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;