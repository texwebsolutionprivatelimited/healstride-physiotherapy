import { blogs } from "../data/blogs";
import { useTranslation } from "react-i18next";

const Blogs = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
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

        {/* Articles */}
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 sm:mb-12"
          >
            {/* Featured Image */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-72 md:h-80 object-cover"
            />

            <div className="p-8">
              {/* Date */}
              <p className="text-teal-600 font-medium">{blog.date}</p>

              {/* Title */}
              <h2 className="text-3xl font-bold mt-3 text-gray-900">
                {blog.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-base leading-6 mt-4">
                {blog.description}
              </p>

              {/* Article Content */}
              <div className="mt-8 space-y-6">
                {blog.content.map((section, index) => (
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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;