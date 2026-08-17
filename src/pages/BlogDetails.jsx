import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import { useTranslation } from "react-i18next";

const BlogDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const blog = blogs.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          {t("blogDetails.notFound")}
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">

        {/* Back Button */}
        <Link
          to="/blogs"
          className="text-teal-600 font-semibold hover:underline"
        >
          {t("blogDetails.back")}
        </Link>

        {/* Hero Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[450px] object-cover rounded-2xl mt-6 shadow-lg"
        />

        {/* Date */}
        <p className="mt-8 text-gray-500">
          {blog.date}
        </p>

        {/* Title */}
        <h1 className="text-5xl font-bold text-slate-900 mt-3">
          {blog.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mt-6 leading-9">
          {blog.description}
        </p>

        {/* Blog Content */}
        <div className="mt-12 space-y-10">
          {blog.content.map((section, index) => (
            <div key={index}>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                {section.heading}
              </h2>

              <p className="text-gray-700 text-lg leading-9">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Author Details */}
        <div className="mt-16 bg-white rounded-2xl shadow-md border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Author Information
          </h3>

          <div className="space-y-3">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-slate-900">
                Author:
              </span>{" "}
              {blog.author}
            </p>

            <p className="text-lg text-gray-700">
              <span className="font-semibold text-slate-900">
                Designation:
              </span>{" "}
              {blog.designation}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-teal-600 rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold">
            {t("blogDetails.ctaTitle")}
          </h2>

          <p className="mt-4 text-lg">
            {t("blogDetails.ctaSubtitle")}
          </p>

          <Link
            to="/booking"
            className="inline-block mt-8 bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
          >
            {t("blogDetails.bookBtn")}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogDetails;