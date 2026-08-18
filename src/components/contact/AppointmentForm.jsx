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
      className="relative py-10 sm:py-16 lg:py-20 overflow-hidden bg-cover bg-center bg-no-repeat min-h-[70vh]"
      style={{
        backgroundImage: "url('/appointment.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/75"></div>

      {/* Decorative Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <span
              className="
                inline-block
                px-3.5
                py-1.5
                rounded-full
                bg-teal-500/20
                border
                border-teal-400/30
                text-teal-300
                font-semibold
                uppercase
                tracking-wider
                text-xs
                backdrop-blur-md
              "
            >
              {t("appointmentForm.badge")}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">
              {t("appointmentForm.title")}
            </h2>

            <p className="text-slate-200 mt-2.5 sm:mt-3 max-w-xl mx-auto text-xs sm:text-base leading-relaxed">
              {t("appointmentForm.subtitle")}
            </p>
          </div>

          {/* Login Notice */}
          {!user && (
            <div className="mb-6 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-200 rounded-xl p-4 text-xs sm:text-sm text-center">
              {t("appointmentForm.loginNotice")}
            </div>
          )}

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 rounded-xl p-4 text-center">
              <h4 className="font-semibold text-emerald-300 text-sm sm:text-base">
                {t("appointmentForm.submittedTitle")}
              </h4>

              <p className="text-emerald-200 mt-1 text-xs sm:text-sm">
                {t("appointmentForm.submittedDesc")}
              </p>
            </div>
          )}

          {/* Form Container */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-5 sm:p-8 lg:p-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
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
                  placeholder:text-slate-300
                  focus:ring-2
                  focus:ring-teal-400
                  outline-none
                  text-xs
                  sm:text-sm
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
                  placeholder:text-slate-300
                  focus:ring-2
                  focus:ring-teal-400
                  outline-none
                  text-xs
                  sm:text-sm
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
                  text-xs
                  sm:text-sm
                "
              >
                <option value="" className="text-slate-900 bg-white">
                  {t("appointmentForm.selectCondition")}
                </option>

                <option value="Knee Pain" className="text-slate-900 bg-white">
                  {t("conditionsList.kneePain")}
                </option>

                <option value="Back Pain" className="text-slate-900 bg-white">
                  {t("conditionsList.backPain")}
                </option>

                <option value="Neck Pain" className="text-slate-900 bg-white">
                  {t("conditionsList.neckPain")}
                </option>

                <option value="Shoulder Pain" className="text-slate-900 bg-white">
                  {t("conditionsList.shoulderPain")}
                </option>

                <option value="Sciatica" className="text-slate-900 bg-white">
                  {t("conditionsList.sciatica")}
                </option>

                <option value="Sports Injury" className="text-slate-900 bg-white">
                  {t("conditionsList.sportsInjury")}
                </option>

                <option value="Stroke Rehab" className="text-slate-900 bg-white">
                  {t("conditionsList.strokeRehab")}
                </option>

                <option value="Frozen Shoulder" className="text-slate-900 bg-white">
                  {t("conditionsList.frozenShoulder")}
                </option>

                <option value="Post Surgery Rehab" className="text-slate-900 bg-white">
                  {t("conditionsList.postSurgeryRehab")}
                </option>

                <option value="Plantar Fasciitis" className="text-slate-900 bg-white">
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
                    text-xs
                    sm:text-sm
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
                    text-xs
                    sm:text-sm
                  "
                />
              </div>

              {/* Additional Message */}
              <textarea
                rows="4"
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
                  placeholder:text-slate-300
                  resize-none
                  outline-none
                  focus:ring-2
                  focus:ring-teal-400
                  text-xs
                  sm:text-sm
                "
              />

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-teal-600
                  hover:bg-teal-700
                  active:bg-teal-800
                  text-white
                  py-3.5
                  rounded-xl
                  font-semibold
                  shadow-md
                  hover:shadow-lg
                  disabled:opacity-50
                  transition-all
                  duration-200
                  text-xs
                  xs:text-sm
                  sm:text-base
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