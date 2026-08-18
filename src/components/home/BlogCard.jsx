import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogCard = ({ blog, showButton = false }) => {
  const { t } = useTranslation();

  return (
    <div className="group h-full flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden h-48 sm:h-52 w-full flex-shrink-0">
        <img
          src={blog.coverImage || blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <p className="text-xs font-medium text-teal-600">
          {blog.createdAt?.seconds
            ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
            : blog.date || ""}
        </p>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5 line-clamp-2 leading-snug">
          {blog.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
          {blog.description}
        </p>

        {showButton ? (
          <div className="mt-auto pt-4">
            <Link to={`/blogs/${blog.id}`}>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition font-semibold text-xs sm:text-sm shadow-sm">
                {t("blogSection.readMore")}
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-auto pt-4">
            <Link
              to={`/blogs/${blog.id}`}
              className="inline-flex items-center gap-1 text-teal-600 font-semibold text-xs sm:text-sm hover:text-teal-700 transition-colors"
            >
              <span>{t("blogSection.readMore")}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;