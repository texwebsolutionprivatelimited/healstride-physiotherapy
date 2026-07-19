import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../firebase/firebase";

const emptyForm = {
  slug: "",
  name: "",
  role: "",
  image: "",
  imagePath: "", 
  education: "",
  experience: "",
  registration: "",
  specialization: "",
  description: "",
  active: true,
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const snap = await getDocs(collection(db, "doctors"));
      setDoctors(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (doc) => {
    setEditingId(doc.id);
    setFormData({ ...emptyForm, ...doc });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-generate slug from name if slug empty & not editing
      if (field === "name" && !editingId && !prev.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.slug.trim()) {
      alert("Name and slug are required");
      return;
    }

    try {
      setUploading(true);
      let imageUrl = formData.image;
      let imagePath = formData.imagePath;

      // Upload new image if selected
      if (imageFile) {
        // Delete old image if replacing
        if (imagePath) {
          try {
            await deleteObject(ref(storage, imagePath));
          } catch (e) {
            console.warn("Old image delete failed:", e.message);
          }
        }
        const newPath = `doctors/${Date.now()}-${imageFile.name}`;
        const storageRef = ref(storage, newPath);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
        imagePath = newPath;
      }

      const payload = {
        ...formData,
        slug: slugify(formData.slug),
        image: imageUrl,
        imagePath,
      };

      if (editingId) {
        await updateDoc(doc(db, "doctors", editingId), payload);
      } else {
        await addDoc(collection(db, "doctors"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      setIsModalOpen(false);
      setEditingId(null);
      setFormData(emptyForm);
      setImageFile(null);
      await fetchDoctors();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docItem) => {
    if (!window.confirm(`Delete ${docItem.name}?`)) return;
    try {
      if (docItem.imagePath) {
        try {
          await deleteObject(ref(storage, docItem.imagePath));
        } catch (e) {
          console.warn("Image delete failed:", e.message);
        }
      }
      await deleteDoc(doc(db, "doctors", docItem.id));
      await fetchDoctors();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const toggleActive = async (docItem) => {
    try {
      await updateDoc(doc(db, "doctors", docItem.id), {
        active: !docItem.active,
      });
      await fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Doctor Management
          </h1>
          <p className="text-slate-500 mt-2">
            Add, edit, or remove doctor profiles.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          + Add Doctor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No doctors added yet.
                </td>
              </tr>
            ) : (
              doctors.map((d) => (
                <tr key={d.id} className="border-b">
                  <td className="p-4">
                    {d.image ? (
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-200" />
                    )}
                  </td>
                  <td className="p-4 font-medium">{d.name}</td>
                  <td className="p-4 text-gray-600">{d.role}</td>
                  <td className="p-4 text-gray-500 text-sm">{d.slug}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(d)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${d.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                        }`}
                    >
                      {d.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <button title="Edit" onClick={() => openEdit(d)}>
                        ✏️
                      </button>
                      <button title="Delete" onClick={() => handleDelete(d)}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl my-auto relative">
            {/* Close (X) button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData(emptyForm);
                setImageFile(null);
              }}
              disabled={uploading}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 text-xl leading-none"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 pr-10">
              {editingId ? "Edit Doctor" : "Add Doctor"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full border rounded-lg p-2"
                />
                {(imageFile || formData.image) && (
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : formData.image
                    }
                    alt="preview"
                    className="mt-3 w-24 h-24 rounded-full object-cover"
                  />
                )}
              </div>

              <input
                type="text"
                placeholder="Name (e.g. Dr. Sai Krishna)"
                className="border rounded-lg p-3"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Slug (e.g. dr-sai-krishna)"
                className="border rounded-lg p-3"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
              />
              <input
                type="text"
                placeholder="Role (e.g. Senior Physiotherapist)"
                className="border rounded-lg p-3 md:col-span-2"
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
              />
              <input
                type="text"
                placeholder="Education"
                className="border rounded-lg p-3"
                value={formData.education}
                onChange={(e) => handleChange("education", e.target.value)}
              />
              <input
                type="text"
                placeholder="Experience (e.g. 10+ Years)"
                className="border rounded-lg p-3"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
              />
              <input
                type="text"
                placeholder="Registration No."
                className="border rounded-lg p-3"
                value={formData.registration}
                onChange={(e) => handleChange("registration", e.target.value)}
              />
              <input
                type="text"
                placeholder="Specialization"
                className="border rounded-lg p-3"
                value={formData.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
              />
              <textarea
                rows="4"
                placeholder="Description"
                className="border rounded-lg p-3 md:col-span-2"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />

              <label className="flex items-center gap-3 md:col-span-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => handleChange("active", e.target.checked)}
                />
                Active (show on public site)
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                }}
                disabled={uploading}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={uploading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg disabled:opacity-60"
              >
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;
