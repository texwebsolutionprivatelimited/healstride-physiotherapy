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
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

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
      className="py-16 md:py-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/appointment-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-white/30"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <span className="text-teal-600 font-semibold uppercase tracking-[3px] text-sm">
              {t("appointmentForm.badge")}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
              {t("appointmentForm.title")}
            </h2>

            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              {t("appointmentForm.subtitle")}
            </p>
          </div>

          {!user && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl p-4">
              {t("appointmentForm.loginNotice")}
            </div>
          )}

          {submitted && (
            <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4">
              <h4 className="font-semibold text-green-700">
                {t("appointmentForm.submittedTitle")}
              </h4>

              <p className="text-green-600 mt-1">
                {t("appointmentForm.submittedDesc")}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 max-w-4xl mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder={t("appointmentForm.namePlaceholder")}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder={t("appointmentForm.phonePlaceholder")}
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
            />

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
            >
              <option value="">{t("appointmentForm.selectCondition")}</option>
              <option value="Knee Pain">{t("conditionsList.kneePain")}</option>
              <option value="Back Pain">{t("conditionsList.backPain")}</option>
              <option value="Neck Pain">{t("conditionsList.neckPain")}</option>
              <option value="Shoulder Pain">{t("conditionsList.shoulderPain")}</option>
              <option value="Sciatica">{t("conditionsList.sciatica")}</option>
              <option value="Sports Injury">{t("conditionsList.sportsInjury")}</option>
              <option value="Stroke Rehab">{t("conditionsList.strokeRehab")}</option>
              <option value="Frozen Shoulder">{t("conditionsList.frozenShoulder")}</option>
              <option value="Post Surgery Rehab">{t("conditionsList.postSurgeryRehab")}</option>
              <option value="Plantar Fasciitis">{t("conditionsList.plantarFasciitis")}</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3"
              />
            </div>

            <textarea
              rows="5"
              name="message"
              placeholder={t("appointmentForm.msgPlaceholder")}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-semibold transition"
            >
              {loading
                ? t("appointmentForm.bookingLoading")
                : t("appointmentForm.bookingBtn")}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;