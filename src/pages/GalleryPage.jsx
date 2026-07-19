import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Clinic Photos",
    path: "/gallery/clinic",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  },
  {
    title: "Machine Photos",
    path: "/gallery/machine",
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f4df",
  },
  {
    title: "Treatment Photos",
    path: "/gallery/treatment",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514",
  },
];

const GalleryPage = () => {
  return (
    <section className="pt-28 pb-20 bg-slate-50 min-h-screen"
      className="pt-28 pb-20 min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: "url('/gallery-bg.avif')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[5px] text-teal-600 font-semibold">
            Our Gallery
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            HealStride Gallery
          </h1>

          <p className="text-gray-600 mt-6">
            Browse our clinic, equipment and treatment sessions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {categories.map((item) => (
            <Link
              key={item.title}
              to={item.path}
            >
              <motion.div
                whileHover={{
                  y: -10,
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
};

export default GalleryPage;