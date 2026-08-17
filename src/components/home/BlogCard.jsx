import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogCard = ({ blog, showButton = false }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={blog.coverImage || blog.image}
        alt={blog.title}
        className="w-full h-44 xs:h-48 sm:h-52 object-cover"
      />

      <div className="p-4 sm:p-5">
        <p className="text-xs sm:text-sm text-gray-500">
          {blog.createdAt?.seconds
            ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
            : blog.date || ""}
        </p>

        <h3 className="text-base xs:text-lg sm:text-xl font-semibold mt-1.5 sm:mt-2 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-xs sm:text-base text-gray-600 mt-2 sm:mt-3 line-clamp-3 leading-relaxed">
          {blog.description}
        </p>

        {showButton && (
          <Link to={`/blogs/${blog.id}`}>
            <button className="mt-3.5 sm:mt-4 bg-teal-600 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-lg hover:bg-teal-700 transition font-medium text-xs sm:text-base">
              {t("blogSection.readMore")}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;