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
        notificationRead: false,
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
      alert("Failed to submit testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        overflow-hidden
        py-16
        md:py-24
      "
      style={{
        backgroundImage: "url('/review-bg.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/75" />

      {/* Blur Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span
            className="
              inline-block
              px-5
              py-2
              rounded-full
              bg-teal-500/15
              border
              border-teal-400/30
              text-teal-300
              font-semibold
              uppercase
              tracking-[3px]
              text-sm
              backdrop-blur-md
            "
          >
            Patient Testimonials
          </span>

          <h2
            className="
              mt-5
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
            "
          >
            Share Your

            <span className="block text-teal-400">
              Experience With Us
            </span>
          </h2>

          <p
            className="
              mt-5
              text-gray-300
              max-w-3xl
              mx-auto
              text-base
              md:text-lg
              leading-8
            "
          >
            We value your feedback. Tell us about your experience at
            HealStride Physiotherapy and help others make informed
            healthcare decisions.
          </p>
        </motion.div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mb-6
              bg-green-500/20
              backdrop-blur-md
              border
              border-green-400/30
              text-white
              px-5
              py-4
              rounded-2xl
            "
          >
            Thank you for your valuable feedback.
            Your review has been submitted successfully.
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-3xl
            shadow-2xl
            p-6
            sm:p-8
            lg:p-10
          "
        >
          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Patient Name *
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="
                  w-full
                  bg-white/10
                  border
                  border-white/20
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-teal-400
                "
              />
            </div>

            {/* Profession */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Profession (Optional)
              </label>

              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Teacher, Engineer, Student"
                className="
                  w-full
                  bg-white/10
                  border
                  border-white/20
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-teal-400
                "
              />
            </div>
            {/* Rating */}
            <div>
              <label className="block text-white mb-3 font-medium">
                Rating *
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
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
                      size={30}
                      className={
                        star <= formData.rating
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Your Review *
              </label>

              <textarea
                name="review"
                rows="6"
                required
                value={formData.review}
                onChange={handleChange}
                placeholder="Share your treatment experience..."
                className="
                  w-full
                  bg-white/10
                  border
                  border-white/20
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  placeholder:text-gray-300
                  resize-none
                  outline-none
                  focus:ring-2
                  focus:ring-teal-400
                "
              />
            </div>

            <div className="bg-white/10 border border-white/20 rounded-xl p-4">
              <p className="text-gray-200 text-sm">
                All testimonials are reviewed for authenticity before being
                published on our website.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-teal-500
                to-cyan-500
                hover:from-teal-600
                hover:to-cyan-600
                text-white
                py-4
                rounded-xl
                font-semibold
                shadow-lg
                shadow-teal-500/30
                transition-all
                duration-300
                disabled:opacity-50
              "
            >
              {loading ? "Submitting..." : "Send Review"}
            </button>

          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ReviewForm;