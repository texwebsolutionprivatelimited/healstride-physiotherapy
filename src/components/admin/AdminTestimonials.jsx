import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { useEffect, useState } from "react";

import { db } from "../../firebase/firebase";

const AdminTestimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState(null);

  const [editingId, setEditingId] = useState(null);

  const [testimonials, setTestimonials] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    review: "",
    rating: 5,
    image: "/default-user.png",
    active: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "testimonials")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTestimonials(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      if (
        !formData.name ||
        !formData.review
      ) {
        alert("Please fill required fields");
        return;
      }

      if (editingId) {
        await updateDoc(
          doc(db, "testimonials", editingId),
          {
            ...formData,
          }
        );
      } else {
        await addDoc(
          collection(db, "testimonials"),
          {
            ...formData,
            active: true,
            status: "approved",
            createdAt: serverTimestamp(),
          }
        );
      }

      setIsModalOpen(false);
      setEditingId(null);

      setFormData({
        name: "",
        designation: "",
        review: "",
        rating: 5,
        image: "/default-user.png",
        active: true,
      });

      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      await updateDoc(
        doc(db, "testimonials", id),
        {
          active: true,
          status: "approved",
        }
      );

      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name || "",
      designation:
        item.designation || "",
      review: item.review || "",
      rating: item.rating || 5,
      image:
        item.image ||
        "/default-user.png",
      active: item.active,
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this testimonial?"
      );

    if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(db, "testimonials", id)
      );

      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleView = (item) => {
    setSelectedTestimonial(item);
    setIsViewOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Testimonials
          </h1>

          <p className="text-slate-500 mt-2">
            Manage patient reviews and
            testimonials.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);

            setFormData({
              name: "",
              designation: "",
              review: "",
              rating: 5,
              image:
                "/default-user.png",
              active: true,
            });

            setIsModalOpen(true);
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          + Add Testimonial
        </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Designation
              </th>

              <th className="p-4 text-left">
                Rating
              </th>

              <th className="p-4 text-left">
                Review
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>


          <tbody>

            {testimonials.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500"
                >
                  No testimonials found.
                </td>
              </tr>

            ) : (

              testimonials.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-4">
                    <img
                      src={
                        item.image ||
                        "/default-user.png"
                      }
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>


                  <td className="p-4 font-medium">
                    {item.name}
                  </td>


                  <td className="p-4">
                    {item.designation || "-"}
                  </td>


                  <td className="p-4">
                    {"⭐".repeat(item.rating)}
                  </td>


                  <td className="p-4 max-w-xs truncate">
                    {item.review}
                  </td>


                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >

                      {item.status || "pending"}

                    </span>

                  </td>


                  <td className="p-4">

                    <div className="flex justify-center gap-3">


                      {
                        item.status !== "approved" && (

                          <button
                            onClick={() =>
                              handleApprove(item.id)
                            }
                            title="Approve"
                          >
                            ✅
                          </button>

                        )
                      }


                      <button
                        onClick={() =>
                          handleView(item)
                        }
                        title="View"
                      >
                        👁️
                      </button>


                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                        title="Edit"
                      >
                        ✏️
                      </button>


                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        title="Delete"
                      >
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



      {/* Add / Edit Modal */}

      {isModalOpen && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-full max-w-lg">


            <h2 className="text-2xl font-bold mb-6">

              {editingId
                ? "Edit Testimonial"
                : "Add Testimonial"}

            </h2>


            <div className="space-y-4">


              <input
                type="text"
                placeholder="Patient Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
              />



              <input
                type="text"
                placeholder="Designation"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    designation: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
              />



              <textarea
                rows="4"
                placeholder="Review"
                value={formData.review}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    review: e.target.value
                  })
                }
                className="w-full border rounded-lg p-3"
              />



              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: Number(e.target.value)
                  })
                }
                className="w-full border rounded-lg p-3"
              >

                <option value={5}>
                  Excellent ⭐⭐⭐⭐⭐
                </option>

                <option value={4}>
                  Very Good ⭐⭐⭐⭐
                </option>

                <option value={3}>
                  Good ⭐⭐⭐
                </option>

                <option value={2}>
                  Fair ⭐⭐
                </option>

                <option value={1}>
                  Poor ⭐
                </option>

              </select>



              <label className="flex gap-3 items-center">

                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      active: e.target.checked
                    })
                  }
                />

                Active

              </label>


            </div>



            <div className="flex justify-end gap-3 mt-8">


              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                }}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>



              <button
                onClick={handleSave}
                className="bg-teal-600 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>


            </div>


          </div>

        </div>

      )}



      {/* View Modal */}

      {
        isViewOpen &&
        selectedTestimonial && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-xl p-8 w-full max-w-lg">


              <h2 className="text-2xl font-bold mb-5">
                Testimonial Details
              </h2>


              <p>
                <b>Name:</b>{" "}
                {selectedTestimonial.name}
              </p>


              <p className="mt-2">
                <b>Designation:</b>{" "}
                {selectedTestimonial.designation}
              </p>


              <p className="mt-2">
                <b>Rating:</b>{" "}
                {"⭐".repeat(
                  selectedTestimonial.rating
                )}
              </p>


              <div className="mt-4">

                <b>Review:</b>

                <p className="bg-gray-50 p-4 rounded-lg mt-2">
                  {selectedTestimonial.review}
                </p>

              </div>



              <p className="mt-4">

                <b>Status:</b>{" "}

                {selectedTestimonial.status || "pending"}

              </p>



              <button
                onClick={() =>
                  setIsViewOpen(false)
                }
                className="mt-6 bg-teal-600 text-white px-5 py-2 rounded-lg"
              >
                Close
              </button>


            </div>

          </div>

        )}


    </div>
  );
};


export default AdminTestimonials;