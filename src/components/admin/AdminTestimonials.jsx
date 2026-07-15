import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AdminTestimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [testimonials, setTestimonials] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    review: "",
    rating: 5,
    image: "",
    active: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
  const snapshot = await getDocs(collection(db, "testimonials"));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setTestimonials(data);
};

useEffect(() => {
  fetchTestimonials();
}, []);

  const handleSave = async () => {
  try {
    await addDoc(collection(db, "testimonials"), {
      ...formData,
      createdAt: serverTimestamp(),
    });

    setIsModalOpen(false);

    setFormData({
      name: "",
      designation: "",
      review: "",
      rating: 5,
      image: "",
      active: true,
    });

    fetchTestimonials();
  } catch (err) {
  console.error(err);
  alert(err.message);
}
};

  return (
    <div className="p-8">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Testimonials
          </h1>

          <p className="text-slate-500 mt-2">
            Manage patient reviews and testimonials.
          </p>
        </div>

        <button
  onClick={() => setIsModalOpen(true)}
  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
>
  + Add Testimonial
</button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-teal-600 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Designation</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Review</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {testimonials.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500"
                >
                  No testimonials found.
                </td>
              </tr>
            ) : (
              testimonials.map((item) => (
                <tr key={item.id} className="border-b">

  <td className="p-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-12 h-12 rounded-full object-cover"
    />
  </td>

  <td className="p-4">{item.name}</td>

  <td className="p-4">
    {"⭐".repeat(item.rating)}
  </td>

  <td className="p-4 max-w-xs truncate">
    {item.review}
  </td>

  <td className="p-4">
    {item.active ? "Active" : "Inactive"}
  </td>

  <td className="p-4">
    <div className="flex justify-center gap-4">

      <button title="View">👁️</button>

      <button title="Edit">✏️</button>

      <button title="Delete">🗑️</button>

    </div>
  </td>

</tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-8 w-full max-w-lg">

            <h2 className="text-2xl font-bold mb-6">
              Add Testimonial
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Patient Name"
                className="w-full border rounded-lg p-3"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Designation"
                className="w-full border rounded-lg p-3"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    designation: e.target.value,
                  })
                }
              />

              <textarea
                rows="4"
                placeholder="Review"
                className="w-full border rounded-lg p-3"
                value={formData.review}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    review: e.target.value,
                  })
                }
              />

              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                className="w-full border rounded-lg p-3"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: Number(e.target.value),
                  })
                }
              />

              

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      active: e.target.checked,
                    })
                  }
                />

                Active

              </label>

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminTestimonials;