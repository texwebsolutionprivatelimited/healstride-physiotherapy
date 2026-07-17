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

import { db } from "../../firebase/firebase";

const AdminFAQ = () => {

  const [faqs, setFaqs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    active: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const snapshot = await getDocs(collection(db, "faqs"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setFaqs(data);
  };

  const handleSave = async () => {

    try {

      if (editingId) {

        await updateDoc(doc(db, "faqs", editingId), {
          ...formData,
        });

      } else {

        await addDoc(collection(db, "faqs"), {
          ...formData,
          createdAt: serverTimestamp(),
        });

      }

      setFormData({
        question: "",
        answer: "",
        active: true,
      });

      setEditingId(null);

      setIsModalOpen(false);

      fetchFaqs();

    } catch (err) {

      console.error(err);

      alert(err.message);

    }

  };

  const handleEdit = (faq) => {

    setEditingId(faq.id);

    setFormData({
      question: faq.question,
      answer: faq.answer,
      active: faq.active,
    });

    setIsModalOpen(true);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this FAQ?")) return;

    await deleteDoc(doc(db, "faqs", id));

    fetchFaqs();

  };

  return (
  <div className="p-8">

    <div className="flex items-center justify-between mb-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          FAQ Management
        </h1>

        <p className="text-slate-500 mt-2">
          Create, update and delete FAQs.
        </p>

      </div>

      <button
        onClick={() => {
          setEditingId(null);

          setFormData({
            question: "",
            answer: "",
            active: true,
          });

          setIsModalOpen(true);
        }}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
      >
        + Add FAQ
      </button>

    </div>

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-teal-600 text-white">

          <tr>

            <th className="p-4 text-left">
              Question
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

          {faqs.length === 0 ? (

            <tr>

              <td
                colSpan="3"
                className="text-center py-10 text-gray-500"
              >
                No FAQs Found.
              </td>

            </tr>

          ) : (

            faqs.map((faq) => (

              <tr
                key={faq.id}
                className="border-b"
              >

                <td className="p-4 font-medium">
                  {faq.question}
                </td>

                <td className="p-4">
                  {faq.active ? "Active" : "Inactive"}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-4">

                    <button
                      title="View"
                      onClick={() =>
                        alert(
                          `Question:\n\n${faq.question}\n\nAnswer:\n\n${faq.answer}`
                        )
                      }
                    >
                      👁️
                    </button>

                    <button
                      title="Edit"
                      onClick={() => handleEdit(faq)}
                    >
                      ✏️
                    </button>

                    <button
                      title="Delete"
                      onClick={() => handleDelete(faq.id)}
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
   {isModalOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-8 w-full max-w-xl">

      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Edit FAQ" : "Add FAQ"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Question"
          className="w-full border rounded-lg p-3"
          value={formData.question}
          onChange={(e) =>
            setFormData({
              ...formData,
              question: e.target.value,
            })
          }
        />

        <textarea
          rows="5"
          placeholder="Answer"
          className="w-full border rounded-lg p-3"
          value={formData.answer}
          onChange={(e) =>
            setFormData({
              ...formData,
              answer: e.target.value,
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
          onClick={() => {
            setEditingId(null);
            setIsModalOpen(false);
          }}
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

export default AdminFAQ;