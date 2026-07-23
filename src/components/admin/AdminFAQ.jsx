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
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [confirmEditFaq, setConfirmEditFaq] = useState(null);

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
    try {
      const faqSnapshot = await getDocs(
        collection(db, "faqs")
      );

      setFaqs(
        faqSnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );

      const submissionSnapshot = await getDocs(
        collection(db, "faqSubmissions")
      );

      setSubmittedQuestions(
        submissionSnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handlePublishQuestion = async (
    questionData
  ) => {
    try {
      await addDoc(collection(db, "faqs"), {
        question: questionData.question,
        answer: "",
        active: true,
        createdAt: serverTimestamp(),
      });

      await deleteDoc(
        doc(
          db,
          "faqSubmissions",
          questionData.id
        )
      );

      await fetchFaqs();

      alert("Question published successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleSave = async () => {
    if (!formData.question.trim()) {
      alert("Question is required");
      return;
    }

    try {
      if (editingId) {
        await updateDoc(
          doc(db, "faqs", editingId),
          {
            ...formData,
          }
        );
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

      await fetchFaqs();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEdit = (faq) => {
    setEditingId(faq.id);

    setFormData({
      question: faq.question ?? "",
      answer: faq.answer ?? "",
      active: faq.active ?? true,
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?"))
      return;

    try {
      await deleteDoc(doc(db, "faqs", id));
      await fetchFaqs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSubmission = async (
    id
  ) => {
    if (!window.confirm("Delete this question?"))
      return;

    try {
      await deleteDoc(
        doc(db, "faqSubmissions", id)
      );

      await fetchFaqs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            FAQ Management
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
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
          className="
          bg-teal-600
          hover:bg-teal-700
          text-white
          px-4 sm:px-6
          py-2.5 sm:py-3
          rounded-lg
          font-medium
          w-full sm:w-auto
          "
        >
          + Add FAQ
        </button>
      </div>

      {/* FAQ Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-teal-600 text-white">

              <tr>
                <th className="p-3 sm:p-4 text-left">
                  Question
                </th>

                <th className="p-3 sm:p-4 text-left">
                  Status
                </th>

                <th className="p-3 sm:p-4 text-center">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {faqs.length === 0 ? (

                <tr>

                  <td
                    colSpan={3}
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

                    <td className="p-3 sm:p-4 font-medium">
                      {faq.question}
                    </td>

                    <td className="p-3 sm:p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${faq.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {faq.active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td className="p-3 sm:p-4">

                      <div className="flex items-center justify-center gap-2">

                        <button
                          title="View"
                          onClick={() =>
                            alert(
                              `Question:\n\n${faq.question}\n\nAnswer:\n\n${faq.answer}`
                            )
                          }
                          className="h-9 w-9 rounded-lg bg-blue-50 hover:bg-blue-100"
                        >
                          👁️
                        </button>

                        <button
                           title="Edit"
                           onClick={() => setConfirmEditFaq(faq)}
                           className="h-9 w-9 rounded-lg bg-yellow-50 hover:bg-yellow-100"
                          >
                           ✏️
                        </button>

                        <button
                          title="Delete"
                          onClick={() =>
                            handleDelete(faq.id)
                          }
                          className="h-9 w-9 rounded-lg bg-red-50 hover:bg-red-100"
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

      </div>

      {/* Submitted Questions */}

      <div className="mt-8 sm:mt-10">

        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Submitted Questions
        </h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="bg-teal-600 text-white">

                <tr>

                  <th className="p-3 sm:p-4 text-left">
                    Name
                  </th>

                  <th className="p-3 sm:p-4 text-left">
                    Email
                  </th>

                  <th className="p-3 sm:p-4 text-left">
                    Question
                  </th>

                  <th className="p-3 sm:p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {submittedQuestions.length === 0 ? (

                  <tr>

                    <td
                      colSpan={4}
                      className="text-center py-8 text-gray-500"
                    >
                      No Submitted Questions
                    </td>

                  </tr>

                ) : (

                  submittedQuestions.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="p-3 sm:p-4">
                        {item.name}
                      </td>

                      <td className="p-3 sm:p-4">
                        {item.email}
                      </td>

                      <td className="p-3 sm:p-4">
                        {item.question}
                      </td>

                      <td className="p-3 sm:p-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              handlePublishQuestion(item)
                            }
                            className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-3 py-2
                            rounded-lg
                            text-sm
                            font-medium
                            "
                          >
                            Publish
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteSubmission(item.id)
                            }
                            className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-3 py-2
                            rounded-lg
                            text-sm
                            font-medium
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

{/* Edit Confirmation */}
{confirmEditFaq && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

      <h3 className="text-xl font-bold text-slate-900">
        Edit FAQ
      </h3>

      <p className="mt-3 text-slate-600">
        Do you want to edit this FAQ?
      </p>

      <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={() => setConfirmEditFaq(null)}
          className="rounded-lg border px-5 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            handleEdit(confirmEditFaq);
            setConfirmEditFaq(null);
          }}
          className="rounded-lg bg-teal-600 px-5 py-2 text-white hover:bg-teal-700"
        >
          Yes, Edit
        </button>

      </div>

    </div>
  </div>
)}

      {/* Add / Edit Modal */}

      {isModalOpen && (

        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div
            className="
            bg-white
            rounded-xl
            p-4 sm:p-6 md:p-8
            w-[95%]
            max-w-xl
            max-h-[90vh]
            overflow-y-auto
            "
          >

            <h2 className="text-xl sm:text-2xl font-bold mb-6">

              {editingId
                ? "Edit FAQ"
                : "Add FAQ"}

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

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">

              <button
                onClick={() => {
                  setEditingId(null);
                  setIsModalOpen(false);
                }}
                className="
                w-full
                sm:w-auto
                px-5 py-2
                border
                rounded-lg
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="
                w-full
                sm:w-auto
                bg-teal-600
                hover:bg-teal-700
                text-white
                px-5 py-2
                rounded-lg
                "
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