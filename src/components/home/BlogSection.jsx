import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { FaArrowRight } from "react-icons/fa";

const BlogSection = ({
  blogsToShow = [],
  showButton = false,
  showViewAllButton = false,
}) => {
  const { t } = useTranslation();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(
        collection(db, "blogs"),
        where("active", "==", true)
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      id="blogs"
      className="py-6 sm:py-8 lg:py-10 bg-slate-50 border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-teal-600 font-semibold uppercase tracking-wider text-center text-xs sm:text-sm"
        >
          {t("blogSection.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-2 text-slate-900 leading-tight"
        >
          {t("blogSection.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-slate-600 text-center mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed"
        >
          {t("blogSection.subtitle")}
        </motion.p>

        {/* Blog Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 sm:mt-12 items-stretch"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
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
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-8 sm:mt-12"
          >
            <Link to="/blogs" className="group">
              <button
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  bg-teal-600
                  hover:bg-teal-700
                  active:bg-teal-800
                  text-white
                  px-6
                  py-3.5
                  rounded-xl
                  font-semibold
                  shadow-md
                  hover:shadow-lg
                  transition-all
                  duration-200
                  text-xs
                  xs:text-sm
                  sm:text-base
                "
              >
                <span>{t("blogSection.readMoreBlogs")}</span>
                <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;