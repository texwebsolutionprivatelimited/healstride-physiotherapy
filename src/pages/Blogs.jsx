import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(
        collection(db, "blogs"),
        where("active", "==", true),
        orderBy("createdAt", "desc")
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
    <section className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-20">
          <p className="text-teal-600 font-semibold uppercase tracking-widest">
            Health Articles
          </p>

          <h1 className="text-5xl font-bold mt-3 text-gray-900">
            HealStride Health Blog
          </h1>

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
            Explore expert physiotherapy advice, rehabilitation techniques,
            posture correction tips, injury prevention strategies, and wellness
            articles written by HealStride specialists.
          </p>
        </div>

        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-14"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-72 md:h-80 object-cover"
            />

            <div className="p-8">
              <p className="text-teal-600 font-medium">
                {blog.createdAt?.seconds
                  ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString()
                  : ""}
              </p>

              <h2 className="text-3xl font-bold mt-3 text-gray-900">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-base leading-6 mt-4">
                {blog.description}
              </p>

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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;