import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    condition: "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        name: formData.name,
        phone: formData.phone,
        condition: formData.condition,
        date: formData.date,
        time: formData.time,
        message: formData.message,
        email: user.email || "",
        profileImage: user.photoURL || "",
        googleName: user.displayName || "",
        status: "pending",

        notificationCreatedAt: serverTimestamp(),
        notificationRead: false,

        createdAt: serverTimestamp(),
      });

      setSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        condition: "",
        date: "",
        time: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (error) {
      console.error(error);
      alert(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/appointment.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/70"></div>

      {/* Decorative Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <span
              className="
                inline-block
                px-4
                py-2
                rounded-full
                bg-teal-500/20
                border
                border-teal-400/30
                text-teal-300
                font-semibold
                uppercase
                tracking-[3px]
                text-xs
                backdrop-blur-md
              "
            >
              {t("appointmentForm.badge")}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
              {t("appointmentForm.title")}
            </h2>

            <p className="text-gray-200 mt-4 max-w-2xl mx-auto leading-7 sm:leading-8">
              {t("appointmentForm.subtitle")}
            </p>
          </div>

          {/* Login Notice */}
          {!user && (
            <div className="mb-6 bg-yellow-500/15 backdrop-blur-md border border-yellow-400/20 text-yellow-200 rounded-2xl p-4">
              {t("appointmentForm.loginNotice")}
            </div>
          )}

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 bg-green-500/15 backdrop-blur-md border border-green-400/20 rounded-2xl p-4">
              <h4 className="font-semibold text-green-300">
                {t("appointmentForm.submittedTitle")}
              </h4>

              <p className="text-green-200 mt-1">
                {t("appointmentForm.submittedDesc")}
              </p>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 max-w-4xl mx-auto"
            >
              {/* Full Name */}
              <input
                type="text"
                name="name"
                placeholder={t("appointmentForm.namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                required
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
                  focus:ring-2
                  focus:ring-teal-400
                  outline-none
                "
              />

              {/* Phone Number */}
              <input
                type="tel"
                name="phone"
                placeholder={t("appointmentForm.phonePlaceholder")}
                value={formData.phone}
                onChange={handleChange}
                required
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
                  focus:ring-2
                  focus:ring-teal-400
                  outline-none
                "
              />

              {/* Condition */}
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                className="
                  w-full
                  bg-white/10
                  border
                  border-white/20
                  rounded-xl
                  px-4
                  py-3
                  text-white
                  focus:ring-2
                  focus:ring-teal-400
                  outline-none
                "
              >
                <option value="" className="text-black">
                  {t("appointmentForm.selectCondition")}
                </option>

                <option value="Knee Pain" className="text-black">
                  {t("conditionsList.kneePain")}
                </option>

                <option value="Back Pain" className="text-black">
                  {t("conditionsList.backPain")}
                </option>

                <option value="Neck Pain" className="text-black">
                  {t("conditionsList.neckPain")}
                </option>

                <option value="Shoulder Pain" className="text-black">
                  {t("conditionsList.shoulderPain")}
                </option>

                <option value="Sciatica" className="text-black">
                  {t("conditionsList.sciatica")}
                </option>

                <option value="Sports Injury" className="text-black">
                  {t("conditionsList.sportsInjury")}
                </option>

                <option value="Stroke Rehab" className="text-black">
                  {t("conditionsList.strokeRehab")}
                </option>

                <option value="Frozen Shoulder" className="text-black">
                  {t("conditionsList.frozenShoulder")}
                </option>

                <option value="Post Surgery Rehab" className="text-black">
                  {t("conditionsList.postSurgeryRehab")}
                </option>

                <option value="Plantar Fasciitis" className="text-black">
                  {t("conditionsList.plantarFasciitis")}
                </option>
              </select>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:ring-2
                    focus:ring-teal-400
                  "
                />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    bg-white/10
                    border
                    border-white/20
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:ring-2
                    focus:ring-teal-400
                  "
                />
              </div>

              {/* Additional Message */}
              <textarea
                rows="5"
                name="message"
                placeholder={t("appointmentForm.msgPlaceholder")}
                value={formData.message}
                onChange={handleChange}
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

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
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
                  disabled:opacity-50
                  transition
                "
              >
                {loading
                  ? t("appointmentForm.bookingLoading")
                  : t("appointmentForm.bookingBtn")}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;