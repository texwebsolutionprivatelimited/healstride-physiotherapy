import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { blogs } from "../../data/blogs";

const BlogSection = ({
  blogsToShow = blogs,
  showButton = false,
  showViewAllButton = false,
}) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-teal-600 font-semibold uppercase tracking-[3px] sm:tracking-widest text-center text-xs sm:text-sm"
        >
          Latest Updates
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-3 text-slate-900"
        >
          Health Blogs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 text-center mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-7"
        >
          Read expert advice, physiotherapy tips, rehabilitation guides and
          wellness articles from HealStride specialists.
        </motion.p>

        {/* Blog Cards */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-14"
        >
          {blogsToShow.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <BlogCard
                blog={blog}
                showButton={showButton}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Blogs Button */}

        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-10 sm:mt-12"
          >
            <Link to="/blogs">
              <button
                className="
                  bg-teal-600
                  text-white
                  px-6 sm:px-8
                  py-3
                  rounded-lg
                  font-medium
                  hover:bg-teal-700
                  transition
                  text-sm sm:text-base
                "
              >
                Read More Blogs
              </button>
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default BlogSection;