import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { blogs } from "../../data/blogs";

const BlogSection = ({
  blogsToShow = blogs,
  showButton = false,
  showViewAllButton = false,
}) => {
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

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {blogsToShow.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              showButton={showButton}
            />
          ))}
        </div>

        {/* View All Blogs Button */}
        {showViewAllButton && (
  <div className="flex justify-center mt-12">
    <Link to="/blogs">
      <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-700 transition">
        Read More Blogs
      </button>
    </Link>
  </div>
)}

      </div>
    </section>
  );
};

export default BlogSection;