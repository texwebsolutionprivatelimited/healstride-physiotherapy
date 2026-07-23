import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  deleteObject,
  ref,
} from "firebase/storage";

import { db, storage } from "../../firebase/firebase";

import toast from "react-hot-toast";

import { uploadImage } from "../../utils/imageUpload";

import { Plus, Search, FileText, X } from "lucide-react";


const emptyForm = {
  slug: "",
  title: "",
  category: "",
  author: "",
  designation: "",
  excerpt: "",
content: [
  {
    heading: "",
    text: "",
  },
],
  coverImage: "",
  imagePath: "",
  active: true,
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [confirmEditBlog, setConfirmEditBlog] = useState(null);

  const [confirmDeleteBlog, setConfirmDeleteBlog] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [imageFile, setImageFile] = useState(null);

  const [uploading, setUploading] = useState(false);

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

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        [field]: value,
      };

      if (
        field === "title" &&
        !editingId &&
        !prev.slug
      ) {
        next.slug = slugify(value);
      }

      return next;
    });
  };

  const handleSectionChange = (index, field, value) => {
  const updatedSections = [...formData.content];

  updatedSections[index][field] = value;

  setFormData((prev) => ({
    ...prev,
    content: updatedSections,
  }));
};

const addSection = () => {
  setFormData((prev) => ({
    ...prev,
    content: [
      ...prev.content,
      {
        heading: "",
        text: "",
      },
    ],
  }));
};

const removeSection = (index) => {
  if (formData.content.length === 1) return;

  setFormData((prev) => ({
    ...prev,
    content: prev.content.filter((_, i) => i !== index),
  }));
};

  if (loading) {
  return (
    <div className="flex items-center justify-center py-24">
      Loading...
    </div>
  );
}

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEdit = (blog) => {
  setEditingId(blog.id);

  setFormData({
    slug: blog.slug || "",
    title: blog.title || "",
    category: blog.category || "",
    author: blog.author || "",
    designation: blog.designation || "",
    excerpt: blog.description || "",
    content: blog.content || "",
    coverImage: blog.coverImage || "",
    imagePath: blog.imagePath || "",
    active: blog.active ?? true,
  });

  setImageFile(null);

  setIsModalOpen(true);
};

  const handleSave = async () => {
  if (!formData.title.trim()) {
    alert("Blog title is required.");
    return;
  }

  try {
    setUploading(true);

    let imageUrl = "";
    let imagePath = formData.imagePath || "";

    // Upload image
    if (imageFile) {
      if (imagePath) {
        try {
          await deleteObject(ref(storage, imagePath));
        } catch (e) {
          console.warn(e.message);
        }
      }

      imageUrl = await uploadImage(imageFile, "blogs");
      imagePath = "";
    }

    // Image URL
    else if (formData.coverImage.trim()) {
      imageUrl = formData.coverImage.trim();
    }

    // Placeholder
    else {
      imageUrl =
        "https://placehold.co/1200x700?text=HealStride+Blog";
    }

    const payload = {
      title: formData.title,
      slug: slugify(formData.slug),

      category: formData.category,

      author: formData.author,
      designation: formData.designation,

      description: formData.excerpt,

content: formData.content.filter(
  (section) =>
    section.heading.trim() !== "" || section.text.trim() !== ""
),

      coverImage: imageUrl,
      imagePath,

      active: formData.active,
    };

    if (editingId) {
  await updateDoc(doc(db, "blogs", editingId), payload);
} else {
  await addDoc(collection(db, "blogs"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}


toast.success(
  editingId
    ? "Blog updated successfully!"
    : "Blog created successfully!",
  {
    style: {
      borderRadius: "12px",
      background: "#0f766e",
      color: "#fff",
      fontWeight: "600",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#0f766e",
    },
  }
);

    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setFormData(emptyForm);

    await fetchBlogs();

  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setUploading(false);
  }
};

const handleDelete = async (blog) => {
  try {
    await deleteDoc(doc(db, "blogs", blog.id));

    setConfirmDeleteBlog(null);

    await fetchBlogs();

    toast.success("Blog deleted successfully!", {
      style: {
        borderRadius: "12px",
        background: "#0f766e",
        color: "#fff",
        fontWeight: "600",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#0f766e",
      },
    });

  } catch (err) {
    console.error(err);

    toast.error("Failed to delete blog.");
  }
};
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Blog Management
          </h1>

          <p className="text-slate-500 mt-1">
            Create, edit and publish physiotherapy blogs.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="
            flex
            items-center
            gap-2
            bg-teal-600
            hover:bg-teal-700
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            transition
          "
        >
          <Plus size={18} />
          Add Blog
        </button>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search blogs..."
            className="
              w-full
              border
              rounded-xl
              py-3
              pl-11
              pr-4
              outline-none
              focus:ring-2
              focus:ring-teal-500
            "
          />

        </div>

      </div>

      {/* Blogs */}
{blogs.length === 0 ? (
  <div
    className="
      bg-white
      rounded-2xl
      shadow
      border
      py-20
      px-6
      text-center
    "
  >
    <div
      className="
        w-20
        h-20
        rounded-full
        bg-teal-100
        mx-auto
        flex
        items-center
        justify-center
      "
    >
      <FileText
        size={36}
        className="text-teal-600"
      />
    </div>

    <h2 className="text-2xl font-semibold mt-6">
      No Blogs Yet
    </h2>

    <p className="text-slate-500 mt-3 max-w-lg mx-auto">
      Create informative physiotherapy articles to educate your
      patients and improve your clinic's online presence.
    </p>

    <button
      onClick={openAdd}
      className="
        mt-8
        bg-teal-600
        hover:bg-teal-700
        text-white
        px-6
        py-3
        rounded-xl
      "
    >
      Create First Blog
    </button>
  </div>
) : (
  <div className="bg-white rounded-2xl shadow border overflow-hidden">
    <table className="w-full">
      <thead className="bg-slate-100">
  <tr>
    <th className="p-4 text-left">Cover</th>
    <th className="p-4 text-left">Title</th>
    <th className="p-4 text-left">Category</th>
    <th className="p-4 text-left">Author</th>
    <th className="p-4 text-left">Created</th>
    <th className="p-4 text-left">Status</th>
    <th className="p-4 text-center">Actions</th>
  </tr>
</thead>

      <tbody>
        {blogs.map((blog) => (
          <tr
  key={blog.id}
  className="border-t hover:bg-slate-50 transition"
>
  {/* Cover */}
  <td className="p-4">
    <img
      src={blog.coverImage}
      alt={blog.title}
      className="w-20 h-14 object-cover rounded-lg border"
    />
  </td>

  {/* Title */}
  <td className="p-4">
    <div className="font-semibold text-slate-800">
      {blog.title}
    </div>

    <div className="text-xs text-slate-500 mt-1">
      {blog.slug}
    </div>
  </td>

  {/* Category */}
  <td className="p-4">
    {blog.category || "-"}
  </td>

  {/* Author */}
  <td className="p-4">
    <div>{blog.author}</div>

    <div className="text-xs text-slate-500">
      {blog.designation}
    </div>
  </td>

  {/* Date */}
  <td className="p-4">
    {blog.createdAt?.seconds
      ? new Date(blog.createdAt.seconds * 1000)
          .toLocaleDateString()
      : "-"}
  </td>

  {/* Status */}
  <td className="p-4">
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        blog.active
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {blog.active ? "Published" : "Draft"}
    </span>
  </td>

  {/* Actions */}
  <td className="p-4 text-center">
    <div className="flex justify-center gap-2">
      <button
  onClick={() => setConfirmEditBlog(blog)}
  className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
>
  Edit
</button>

      <button
  onClick={() => setConfirmDeleteBlog(blog)}
  className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
>
  Delete
</button>
    </div>
  </td>
</tr>
        ))}
      </tbody>
    </table>
  </div>
)}
        {/* Blog Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

    <div
      className="
        bg-white
        rounded-2xl
        w-full
        max-w-5xl
        max-h-[90vh]
        overflow-y-auto
        p-5
        sm:p-8
        relative
      "
    >

      {/* Close Button */}
      <button
        onClick={() => {
          setIsModalOpen(false);
          setEditingId(null);
          setFormData(emptyForm);
          setImageFile(null);
        }}
        disabled={uploading}
        className="
          absolute
          top-4
          right-4
          w-9
          h-9
          rounded-full
          hover:bg-slate-100
          flex
          items-center
          justify-center
        "
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-6 pr-10">
        {editingId ? "Edit Blog" : "Add Blog"}
      </h2>

      {/* Form starts here */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Cover Image */}
  <div className="md:col-span-2">

    <label className="block text-sm font-medium text-slate-700 mb-2">
      Cover Image
    </label>

    {/* Upload */}
    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setImageFile(e.target.files?.[0] || null)
      }
      className="
        w-full
        border
        rounded-lg
        p-2
        file:mr-4
        file:px-4
        file:py-2
        file:border-0
        file:rounded-lg
        file:bg-teal-50
        file:text-teal-700
        file:font-medium
        hover:file:bg-teal-100
      "
    />

    <p className="text-center text-sm text-slate-500 my-3">
      OR
    </p>

    {/* URL */}
    <input
      type="url"
      placeholder="https://example.com/blog-image.jpg"
      value={formData.coverImage}
      onChange={(e) =>
        handleChange("coverImage", e.target.value)
      }
      className="
        w-full
        border
        rounded-lg
        p-3
        focus:ring-2
        focus:ring-teal-500
        outline-none
      "
    />

    {/* Preview */}
    {(imageFile || formData.coverImage) && (
      <div className="mt-5 flex justify-center">

        <img
          src={
            imageFile
              ? URL.createObjectURL(imageFile)
              : formData.coverImage
          }
          alt="Preview"
          className="
            w-full
            max-w-lg
            h-56
            object-cover
            rounded-xl
            border-4
            border-teal-100
            shadow
          "
        />

      </div>
      
    )}

    

  </div>
  {/* Blog Title */}
<input
  type="text"
  placeholder="Blog Title"
  value={formData.title}
  onChange={(e) => handleChange("title", e.target.value)}
  className="border rounded-lg p-3"
/>

{/* Slug */}
<input
  type="text"
  placeholder="blog-slug"
  value={formData.slug}
  onChange={(e) => handleChange("slug", e.target.value)}
  className="border rounded-lg p-3"
/>

{/* Category */}
<input
  type="text"
  placeholder="Category (e.g. Back Pain, Sports Injury)"
  value={formData.category}
  onChange={(e) => handleChange("category", e.target.value)}
  className="border rounded-lg p-3"
/>

{/* Author */}
<input
  type="text"
  placeholder="Author Name"
  value={formData.author}
  onChange={(e) => handleChange("author", e.target.value)}
  className="border rounded-lg p-3"
/>

{/* Designation */}
<input
  type="text"
  placeholder="Author Designation"
  value={formData.designation}
  onChange={(e) => handleChange("designation", e.target.value)}
  className="border rounded-lg p-3 md:col-span-2"
/>
{/* Short Description */}
<textarea
  rows="3"
  placeholder="Short Description"
  value={formData.excerpt}
  onChange={(e) => handleChange("excerpt", e.target.value)}
  className="
    border
    rounded-lg
    p-3
    md:col-span-2
    resize-none
  "
/>

{/* Blog Sections */}
<div className="md:col-span-2">
  <label className="block text-sm font-medium mb-3">
    Blog Sections
  </label>

  {formData.content.map((section, index) => (
    <div
      key={index}
      className="border rounded-lg p-4 mb-4 bg-gray-50"
    >
      <input
        type="text"
        placeholder="Section Heading"
        value={section.heading}
        onChange={(e) =>
          handleSectionChange(index, "heading", e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-3"
      />

      <textarea
        rows="5"
        placeholder="Section Content"
        value={section.text}
        onChange={(e) =>
          handleSectionChange(index, "text", e.target.value)
        }
        className="w-full border rounded-lg p-3 resize-y"
      />

      <div className="flex justify-end mt-3">
        <button
          type="button"
          onClick={() => removeSection(index)}
          className="text-red-600 hover:text-red-700 font-medium"
        >
          Remove Section
        </button>
      </div>
    </div>
  ))}

  <button
    type="button"
    onClick={addSection}
    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
  >
    + Add Section
  </button>
</div>

{/* Published */}
<label className="flex items-center gap-3 md:col-span-2">
  <input
    type="checkbox"
    checked={formData.active}
    onChange={(e) =>
      handleChange("active", e.target.checked)
    }
  />

  Publish this blog on the website
</label>

</div>

      {/* Footer */}

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => {
            setIsModalOpen(false);
            setEditingId(null);
          }}
          className="px-5 py-3 border rounded-lg"
        >
          Cancel
        </button>

        <button
  onClick={handleSave}
  disabled={uploading}
  className="
    bg-teal-600
    hover:bg-teal-700
    text-white
    px-5
    py-3
    rounded-lg
    disabled:opacity-50
  "
>
{uploading
  ? editingId
    ? "Updating..."
    : "Saving..."
  : editingId
    ? "Update Blog"
    : "Save Blog"}
    
    </button>

      </div>

    </div>

  </div>
)}

{confirmEditBlog && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

      <h2 className="text-xl font-bold text-slate-800">
        Confirm Edit
      </h2>

      <p className="mt-3 text-slate-600">
        Do you want to edit this blog?
      </p>

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={() => setConfirmEditBlog(null)}
          className="px-5 py-2 border rounded-lg"
        >
          No
        </button>

        <button
          onClick={() => {
            openEdit(confirmEditBlog);   // opens the form
            setConfirmEditBlog(null);    // closes confirmation
          }}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Yes
        </button>

      </div>

    </div>
  </div>
)}

{confirmDeleteBlog && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

      <h2 className="text-xl font-bold text-red-600">
        Delete Blog
      </h2>

      <p className="mt-3 text-slate-600">
        Are you sure you want to delete
        <span className="font-semibold">
          {" "}{confirmDeleteBlog.title}
        </span>
        ?
      </p>

      <p className="text-sm text-red-500 mt-2">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => setConfirmDeleteBlog(null)}
          className="px-5 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
onClick={() => handleDelete(confirmDeleteBlog)}
  className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
>
  Delete
</button>
      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default AdminBlogs;