import { useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ReviewForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
      alert(t("common.error"));
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
        py-10
        sm:py-16
        lg:py-24
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
          className="text-center mb-8 sm:mb-12"
        >
          <span
            className="
              inline-block
              px-4
              sm:px-5
              py-2
              rounded-full
              bg-teal-500/15
              border
              border-teal-400/30
              text-teal-300
              font-semibold
              uppercase
              tracking-[3px]
              text-xs
              sm:text-sm
              backdrop-blur-md
            "
          >
            {t("reviewForm.badge")}
          </span>

          <h2
            className="
              mt-4
              sm:mt-5
              text-3xl
              sm:text-5xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
            "
          >
            {t("reviewForm.title")}
          </h2>

          <p
            className="
              mt-4
              sm:mt-5
              text-gray-300
              max-w-3xl
              mx-auto
              text-sm
              sm:text-base
              md:text-lg
              leading-7
              sm:leading-8
            "
          >
            {t("reviewForm.subtitle")}
          </p>
        </motion.div>

        {/* Success Message */}
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
              px-4
              sm:px-5
              py-3.5
              sm:py-4
              rounded-xl
              sm:rounded-2xl
              text-sm
              sm:text-base
            "
          >
            {t("reviewForm.successMsg")}
          </motion.div>
        )}

        {/* Form */}
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
            rounded-2xl
            sm:rounded-3xl
            shadow-2xl
            p-5
            sm:p-8
            lg:p-10
          "
        >
          <div className="space-y-4 sm:space-y-6">
            {/* Name */}
            <div>
              <label className="block text-white mb-1.5 sm:mb-2 font-medium text-sm sm:text-base">
                {t("reviewForm.fullNameLabel")}
              </label>

              <input
                type="text"
                name="name"
                placeholder={t(
                  "reviewForm.fullNamePlaceholder"
                )}
                required
                value={formData.name}
                onChange={handleChange}
                className="
                  w-full
                  bg-white/10
                  border
                  border-white/20
                  rounded-xl
                  px-3.5
                  py-2.5
                  sm:px-4
                  sm:py-3
                  text-white
                  placeholder:text-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-teal-400
                  text-sm
                  sm:text-base
                "
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-white mb-1.5 sm:mb-2 font-medium text-sm sm:text-base">
                {t("reviewForm.occupationLabel")}
              </label>

              <input
                type="text"
                name="designation"
                placeholder={t(
                  "reviewForm.occupationPlaceholder"
                )}
                value={formData.designation}
                onChange={handleChange}
                className="
                  w-full
                  bg-white/10
                  border
                  border-white/20
                  rounded-xl
                  px-3.5
                  py-2.5
                  sm:px-4
                  sm:py-3
                  text-white
                  placeholder:text-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-teal-400
                  text-sm
                  sm:text-base
                "
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-white mb-2 sm:mb-3 font-medium text-sm sm:text-base">
                {t("reviewForm.ratingLabel")}
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
                    aria-label={`Rate ${star} stars`}
                  >
                    <FaStar
                      className={
                        (star <= formData.rating
                          ? "text-yellow-400"
                          : "text-gray-300") +
                        " text-xl sm:text-2xl"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review */}
            <div>
              <label className="block text-white mb-1.5 sm:mb-2 font-medium text-sm sm:text-base">
                {t("reviewForm.feedbackLabel")}
              </label>

              <textarea
                name="review"
                rows="4"
                required
                placeholder={t(
                  "reviewForm.feedbackPlaceholder"
                )}
                value={formData.review}
                onChange={handleChange}
                className="
                  w-full
                  bg-white/10
                  border
                  border-white/20
                  rounded-xl
                  px-3.5
                  py-2.5
                  sm:px-4
                  sm:py-3
                  text-white
                  placeholder:text-gray-300
                  resize-none
                  outline-none
                  focus:ring-2
                  focus:ring-teal-400
                  text-sm
                  sm:text-base
                "
              />
            </div>

            {/* Note */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 sm:p-4">
              <p className="text-gray-200 text-xs sm:text-sm">
                {t("reviewForm.verificationNote")}
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
                bg-gradient-to-r
                from-teal-500
                to-cyan-500
                hover:from-teal-600
                hover:to-cyan-600
                text-white
                py-3.5
                sm:py-4
                rounded-xl
                font-semibold
                shadow-lg
                shadow-teal-500/30
                transition-all
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-sm
                sm:text-base
              "
            >
              {loading
                ? t("reviewForm.submitting")
                : t("reviewForm.submitBtn")}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ReviewForm;