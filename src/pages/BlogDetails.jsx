import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";

const BlogDetails = () => {
  const { id } = useParams();

  const blog = blogs.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Blog Not Found</h1>
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
          ← Back to Blogs
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

        {/* Content */}

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

        {/* CTA */}

        <div className="mt-20 bg-teal-600 rounded-3xl p-10 text-center text-white">

          <h2 className="text-3xl font-bold">
            Need Professional Physiotherapy?
          </h2>

          <p className="mt-4 text-lg">
            Our experienced physiotherapists are here to help you recover faster and live pain-free.
          </p>

          <Link
            to="/contact"
            className="inline-block mt-8 bg-white text-teal-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
          >
            Book Appointment
          </Link>

        </div>

      </div>

    </div>
  );
};

export default BlogDetails;