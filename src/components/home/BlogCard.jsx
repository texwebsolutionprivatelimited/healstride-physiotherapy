const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <p className="text-sm text-gray-500">{blog.date}</p>

        <h3 className="text-xl font-semibold mt-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 mt-3 line-clamp-3">
          {blog.description}
        </p>

        <button className="mt-5 bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 transition">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BlogCard;