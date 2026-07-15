import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { db } from "../firebase/firebase";

const GalleryCategory = ({ category, title }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "gallery")
      );

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (item) =>
            item.category?.toLowerCase() ===
            category.toLowerCase()
        );

      setImages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="text-slate-600 mt-4">
            Explore our {title.toLowerCase()}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            Loading...
          </div>
        ) : images.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow">
            No Images Found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {images.map((image) => (
              <motion.div
                key={image.id}
                whileHover={{
                  y: -10,
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() =>
                  setSelectedImage(image.imageUrl)
                }
              >
                <div className="overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-72 object-cover hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg">
                    {image.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {image.category}
                  </p>
                </div>
              </motion.div>
            ))}

          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
            onClick={() =>
              setSelectedImage(null)
            }
          >
            <button
              className="absolute top-6 right-6 text-white text-3xl"
              onClick={() =>
                setSelectedImage(null)
              }
            >
              <FaTimes />
            </button>

            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryCategory;