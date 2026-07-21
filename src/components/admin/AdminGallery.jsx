import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Trash2, Edit, X } from "lucide-react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { uploadImage } from "../../utils/imageUpload";

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    url: "",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "gallery")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setImages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const uploadedUrl = await uploadImage(file, "gallery");
      setForm((prev) => ({
        ...prev,
        url: uploadedUrl,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removePreview = () => {
    setForm({
      ...form,
      url: "",
    });

    const fileInput = document.getElementById("galleryImage");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category) {
      alert("Please fill title and category fields");
      return;
    }

    try {
      setLoading(true);

      const imageUrl =
        form.url ||
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800";

      const payload = {
        title: form.title,
        description: form.description || "",
        category: form.category,
        imageUrl,
      };

      if (editingId) {
        await updateDoc(doc(db, "gallery", editingId), payload);
        alert("Image Updated Successfully");
      } else {
        await addDoc(collection(db, "gallery"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
        alert("Image Added Successfully");
      }

      setEditingId(null);
      setForm({
        title: "",
        description: "",
        category: "",
        url: "",
      });

      const fileInput = document.getElementById("galleryImage");
      if (fileInput) fileInput.value = "";

      fetchImages();
    } catch (error) {
      console.error(error);
      alert("Failed to save image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(
        doc(db, "gallery", id)
      );

      fetchImages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Gallery Management
        </h1>

        <p className="text-slate-500 mt-1">
          Upload and manage clinic gallery images.
        </p>
      </motion.div>

      {/* Upload Form */}
      <motion.form
        onSubmit={handleAdd}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl shadow-lg p-5 md:p-6 mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Image Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">
              Select Category
            </option>

            <option value="clinic">
              Clinic Photos
            </option>

            <option value="machine">
              Machine Photos
            </option>

            <option value="treatment">
              Treatment Photos
            </option>
          </select>

          <textarea
            name="description"
            placeholder="Image Description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none md:col-span-2"
          />
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Image File
            </label>
            <input
              type="file"
              id="galleryImage"
              accept="image/*"
              onChange={handleUpload}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Or Image URL
            </label>
            <input
              type="text"
              name="url"
              placeholder="https://..."
              value={form.url}
              onChange={handleChange}
              className="border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-teal-500 outline-none w-full text-sm"
            />
          </div>
        </div>

        {form.url && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mt-4 relative inline-block"
          >
            <img
              src={form.url}
              alt="Preview"
              className="h-40 w-40 rounded-xl object-cover border"
            />

            <button
              type="button"
              onClick={removePreview}
              className="
        absolute
        -top-2
        -right-2
        bg-red-500
        text-white
        rounded-full
        p-1.5
        shadow-lg
        hover:bg-red-600
        transition
      "
            >
              <X size={14} />
            </button>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700 transition disabled:opacity-50"
        >
          <ImagePlus size={18} />
          {loading ? "Uploading..." : "Add Image"}
        </button>
      </motion.form>

      {/* Gallery Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -5,
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                />

                <span className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg capitalize">
                  {img.category}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-slate-900">
                  {img.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2 line-clamp-4">
                  {img.description}
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => {
                      setEditingId(img.id);

                      setForm({
                        title: img.title,
                        description: img.description || "",
                        category: img.category,
                        url: img.imageUrl,
                      });
                    }}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Edit size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(img.id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="bg-white rounded-3xl shadow-lg p-12 text-center"
        >
          <ImagePlus
            size={60}
            className="mx-auto text-slate-300 mb-4"
          />

          <h3 className="text-xl font-semibold text-slate-700">
            No Images Found
          </h3>

          <p className="text-slate-500 mt-2">
            Upload your first gallery image.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AdminGallery;