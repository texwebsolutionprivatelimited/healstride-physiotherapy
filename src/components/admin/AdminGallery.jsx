import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Trash2, X } from "lucide-react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "../../firebase/firebase";

const AdminGallery = () => {
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
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
    console.log(
      "Bucket Name:",
      storage.app.options.storageBucket
    );
    const file = e.target.files?.[0];

    if (!file) return;

    console.log("Storage:", storage);
    console.log("File:", file);

    try {
      setLoading(true);

      const storageRef = ref(
        storage,
        `gallery/${Date.now()}-${file.name}`
      );

      await uploadBytes(storageRef, file);

      const downloadURL =
        await getDownloadURL(storageRef);

      setForm((prev) => ({
        ...prev,
        url: downloadURL,
      }));
    } catch (error) {

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removePreview = () => {
    setForm({
      ...form,
      url: "",
    });

    const fileInput =
      document.getElementById("galleryImage");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.category ||
      !form.url
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(
        collection(db, "gallery"),
        {
          title: form.title,
          category: form.category,
          imageUrl: form.url,
          createdAt: Timestamp.now(),
        }
      );

      setForm({
        title: "",
        category: "",
        url: "",
      });

      fetchImages();

      alert("Image Added Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add image");
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
        </div>

        <div className="mt-4">
          <input
            id="galleryImage"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="w-full border rounded-xl p-3"
          />
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
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-slate-900">
                  {img.title}
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    {img.category}
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleDelete(img.id)
                  }
                  className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
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