import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BlogCard from "./BlogCard";
import { blogs } from "../../data/blogs";

const BlogSection = ({
  blogsToShow = blogs,
  showButton = false,
  showViewAllButton = false,
}) => {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-teal-600 font-semibold uppercase tracking-[3px] sm:tracking-widest text-center text-xs sm:text-sm"
        >
          {t("blogSection.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center mt-2 sm:mt-3 text-slate-900 leading-tight"
        >
          {t("blogSection.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 text-center mt-2 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed sm:leading-7"
        >
          {t("blogSection.subtitle")}
        </motion.p>

        {/* Blog Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-10"
        >
          {blogsToShow.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
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
            className="flex justify-center mt-8 sm:mt-12"
          >
            <Link to="/blogs">
              <button
                className="
                  bg-teal-600
                  text-white
                  px-5 sm:px-8
                  py-3
                  rounded-lg
                  font-medium
                  hover:bg-teal-700
                  transition
                  text-xs xs:text-sm sm:text-base
                "
              >
                {t("blogSection.readMoreBlogs")}
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;