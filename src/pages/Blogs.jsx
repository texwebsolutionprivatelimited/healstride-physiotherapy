import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const Blogs = () => {
  const { t } = useTranslation();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500">
        Loading blogs...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Back to Home */}
        <div className="mb-8">
          <Link
            to="/#blogs"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-teal-600 font-semibold uppercase tracking-widest text-xs sm:text-sm">
            {t("blogsPage.badge")}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 text-gray-900 leading-tight">
            {t("blogsPage.title")}
          </h1>

          <p className="text-gray-600 text-xs sm:text-base mt-2 sm:mt-4 max-w-3xl mx-auto leading-relaxed">
            {t("blogsPage.subtitle")}
          </p>
        </div>

        {/* Blogs */}
        {blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No blogs available.
          </div>
        ) : (
          blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 sm:mb-12"
            >
              {/* Cover Image */}
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-72 md:h-80 object-cover"
              />

              <div className="p-8">

                {/* Date */}
                <p className="text-teal-600 font-medium">
                  {blog.createdAt?.seconds
                    ? new Date(
                        blog.createdAt.seconds * 1000
                      ).toLocaleDateString()
                    : ""}
                </p>

                {/* Title */}
                <h2 className="text-3xl font-bold mt-3 text-gray-900">
                  {blog.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base leading-6 mt-4">
                  {blog.description}
                </p>

                {/* Blog Content */}
                <div className="mt-8 space-y-6">
                  {blog.content?.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {section.heading}
                      </h3>

                      <p className="text-gray-700 leading-6 text-base">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Author Details */}
                <div className="mt-10 border-t pt-6">
                  <p className="text-lg">
                    <span className="font-semibold">
                      Author:
                    </span>{" "}
                    {blog.author}
                  </p>

                  <p className="text-lg mt-2">
                    <span className="font-semibold">
                      Designation:
                    </span>{" "}
                    {blog.designation}
                  </p>
                </div>

              </div>
            </article>
          ))
        )}

      </div>
    </section>
  );
};

export default Blogs;