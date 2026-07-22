import { useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    review: "",
    rating: 5,
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "rating"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "testimonials"), {
        ...formData,
        image: "",
        active: false,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      setFormData({
        name: "",
        designation: "",
        review: "",
        rating: 5,
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="uppercase tracking-[3px] sm:tracking-[4px] text-teal-600 font-semibold text-xs sm:text-sm">
            Patient Feedback
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4 leading-tight">
            Share Your Recovery Journey
          </h2>

          <p className="text-slate-600 mt-4 sm:mt-5 max-w-2xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base">
            Your feedback helps us improve our services and inspires others
            seeking physiotherapy care.
          </p>
        </motion.div>

        {/* Success Message */}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 sm:px-5 py-4 rounded-2xl text-sm sm:text-base"
          >
            Thank you for sharing your experience. Your review has been
            submitted successfully and will be published after admin approval.
          </motion.div>
        )}

        {/* Form */}

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="bg-white border border-slate-100 shadow-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10"
        >
          <div className="space-y-5 sm:space-y-6">

            {/* Name */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
              />
            </div>

            {/* Occupation */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Occupation (Optional)
              </label>

              <input
                type="text"
                name="designation"
                placeholder="Student, Engineer, Teacher, etc."
                value={formData.designation}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
              />
            </div>

            {/* Rating */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Rating *
              </label>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    key={star}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        rating: star,
                      })
                    }
                  >
                    <FaStar
                      size={24}
                      className={
                        star <= formData.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Review */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Feedback *
              </label>

              <textarea
                name="review"
                rows="6"
                required
                placeholder="Tell us about your experience with HealStride..."
                value={formData.review}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 resize-none text-sm sm:text-base"
              />
            </div>

            {/* Note */}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs sm:text-sm text-slate-600">
                Reviews are verified by our team and published after admin
                approval.
              </p>
            </div>

            {/* Button */}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-teal-600
                hover:bg-teal-700
                text-white
                py-3 sm:py-4
                rounded-xl
                font-semibold
                transition
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-sm sm:text-base
              "
            >
              {loading ? "Submitting..." : "Submit Review"}
            </motion.button>

          </div>
        </motion.form>

      </div>
    </section>
  );
};

export default ReviewForm;