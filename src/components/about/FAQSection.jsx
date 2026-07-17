import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const [faqs, setFaqs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [questionForm, setQuestionForm] = useState({
    name: "",
    email: "",
    question: "",
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "faqs")
      );

      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((faq) => faq.active);

      setFaqs(data);
    } catch (error) {
      console.error(
        "Error loading FAQs:",
        error
      );
    }
  };

  const handleQuestionSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(
        collection(db, "faqSubmissions"),
        {
          name: questionForm.name,
          email: questionForm.email,
          question: questionForm.question,
          status: "pending",
          createdAt: serverTimestamp(),
        }
      );

      alert(
        "Your question has been submitted successfully."
      );

      setQuestionForm({
        name: "",
        email: "",
        question: "",
      });
    } catch (error) {
      console.error("FAQ Submit Error:", error.code, error.message);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-600">
            Have questions? We have answers.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen =
              openIndex === index;

            return (
              <motion.div
                key={faq.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    index * 0.05,
                }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(
                      isOpen
                        ? null
                        : index
                    )
                  }
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-800 pr-4">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${isOpen
                        ? "rotate-180"
                        : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 leading-7">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Ask Question Form */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mt-12 bg-white rounded-3xl shadow-md p-6 md:p-8"
        >
          <h3 className="text-2xl font-bold text-slate-800">
            Didn't find your answer?
          </h3>

          <p className="text-slate-600 mt-2 mb-6">
            Submit your question and
            our team will review it.
            Once approved, it may be
            added to the FAQ section.
          </p>

          <form
            onSubmit={
              handleQuestionSubmit
            }
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={
                questionForm.name
              }
              onChange={(e) =>
                setQuestionForm({
                  ...questionForm,
                  name:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              value={
                questionForm.email
              }
              onChange={(e) =>
                setQuestionForm({
                  ...questionForm,
                  email:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
            />

            <textarea
              rows="5"
              placeholder="Enter your question..."
              required
              value={
                questionForm.question
              }
              onChange={(e) =>
                setQuestionForm({
                  ...questionForm,
                  question:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              {loading
                ? "Submitting..."
                : "Submit Question"}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;