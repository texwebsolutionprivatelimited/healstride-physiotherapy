import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaCheck, FaLock, FaCalendarAlt, FaClock, FaUser, FaPhoneAlt, FaStethoscope, FaCommentDots } from "react-icons/fa";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

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
    const { name, value } = e.target;
    
    // For phone input, strip non-numeric characters and limit to 10 digits
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isPhoneValid = formData.phone.length === 10;
  const isNameValid = formData.name.trim().length > 0;
  const isConditionValid = formData.condition.length > 0;
  const isDateValid = formData.date.length > 0;
  const isTimeValid = formData.time.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      condition: true,
      date: true,
      time: true,
    });

    if (!isNameValid || !isPhoneValid || !isConditionValid || !isDateValid || !isTimeValid) {
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        name: formData.name,
        phone: formData.phone.startsWith("+91") ? formData.phone : `+91${formData.phone}`,
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
      setTouched({});

      setTimeout(() => {
        setSubmitted(false);
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
      className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-cover bg-center bg-no-repeat min-h-[70vh]"
      style={{
        backgroundImage: "url('/appointment.jpg')",
      }}
    >
      {/* Dark Gradient Overlay for optimal contrast & image visibility */}
      <div className="absolute inset-0 bg-slate-950/40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-teal-950/45"></div>

      {/* Decorative Soft Glow Effects */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-teal-500/15 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          {/* Section Hero Heading */}
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

            <h1 className="text-[30px] xs:text-[34px] sm:text-[38px] lg:text-[44px] font-bold text-white mt-2 leading-tight drop-shadow-sm">
              {t("appointmentForm.title")}
            </h1>

            <p className="text-slate-200 mt-2 sm:mt-3 max-w-lg mx-auto text-xs xs:text-sm sm:text-base leading-relaxed drop-shadow-xs">
              {t("appointmentForm.subtitle")}
            </p>
          </div>

          {/* Login Notice */}
          {!user && (
            <div className="mb-6 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-100 rounded-2xl p-4 text-xs sm:text-sm text-center shadow-sm">
              {t("appointmentForm.loginNotice")}
            </div>
          )}

          {/* Success Banner */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-5 text-center shadow-md"
            >
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2.5 text-lg font-bold">
                <FaCheck />
              </div>
              <h4 className="font-bold text-emerald-900 text-base sm:text-lg">
                {t("appointmentForm.submittedTitle")}
              </h4>
              <p className="text-emerald-700 mt-1 text-xs sm:text-sm leading-relaxed">
                {t("appointmentForm.submittedDesc")}
              </p>
            </motion.div>
          )}

          {/* Clean White Healthcare Booking Card */}
          <div className="bg-white border border-slate-100 rounded-[20px] shadow-xl shadow-slate-950/10 p-5 xs:p-6 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-slate-800 font-semibold text-xs sm:text-sm mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`
                      w-full
                      h-12 sm:h-13
                      bg-slate-50/70
                      border
                      ${touched.name && !isNameValid ? "border-red-400 bg-red-50/20 focus:ring-red-400/20" : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"}
                      rounded-xl
                      px-4
                      text-slate-900
                      placeholder:text-slate-400
                      focus:bg-white
                      focus:ring-2
                      outline-none
                      transition-all
                      duration-200
                      text-xs sm:text-sm
                    `}
                  />
                </div>
                {touched.name && !isNameValid && (
                  <p className="mt-1 text-xs text-red-500 font-medium">Please enter your full name.</p>
                )}
              </div>

              {/* Phone Number with +91 Prefix */}
              <div>
                <label htmlFor="phone" className="block text-slate-800 font-semibold text-xs sm:text-sm mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 bg-slate-100 border border-r-0 border-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-l-xl flex-shrink-0">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`
                      w-full
                      h-12 sm:h-13
                      bg-slate-50/70
                      border
                      ${touched.phone && !isPhoneValid ? "border-red-400 bg-red-50/20 focus:ring-red-400/20" : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"}
                      rounded-r-xl
                      px-4
                      text-slate-900
                      placeholder:text-slate-400
                      focus:bg-white
                      focus:ring-2
                      outline-none
                      transition-all
                      duration-200
                      text-xs sm:text-sm
                    `}
                  />
                </div>
                {touched.phone && !isPhoneValid && (
                  <p className="mt-1 text-xs text-red-500 font-medium">Please enter a valid 10-digit phone number.</p>
                )}
              </div>

              {/* Condition / Treatment Dropdown */}
              <div>
                <label htmlFor="condition" className="block text-slate-800 font-semibold text-xs sm:text-sm mb-1.5">
                  Condition / Treatment <span className="text-red-500">*</span>
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`
                    w-full
                    h-12 sm:h-13
                    bg-slate-50/70
                    border
                    ${touched.condition && !isConditionValid ? "border-red-400 bg-red-50/20 focus:ring-red-400/20" : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"}
                    rounded-xl
                    px-4
                    text-slate-900
                    focus:bg-white
                    focus:ring-2
                    outline-none
                    transition-all
                    duration-200
                    text-xs sm:text-sm
                  `}
                >
                  <option value="" className="text-slate-500">
                    Select treatment ▼
                  </option>
                  <option value="Knee Pain">{t("conditionsList.kneePain") || "Knee Pain"}</option>
                  <option value="Back Pain">{t("conditionsList.backPain") || "Back Pain"}</option>
                  <option value="Neck Pain">{t("conditionsList.neckPain") || "Neck Pain"}</option>
                  <option value="Shoulder Pain">{t("conditionsList.shoulderPain") || "Shoulder Pain"}</option>
                  <option value="Sciatica">{t("conditionsList.sciatica") || "Sciatica"}</option>
                  <option value="Frozen Shoulder">{t("conditionsList.frozenShoulder") || "Frozen Shoulder"}</option>
                  <option value="Sports Injury">{t("conditionsList.sportsInjury") || "Sports Injury"}</option>
                  <option value="Stroke Rehab">{t("conditionsList.strokeRehab") || "Stroke Rehabilitation"}</option>
                  <option value="Post Surgery Rehab">{t("conditionsList.postSurgeryRehab") || "Post-Surgery Rehabilitation"}</option>
                  <option value="Plantar Fasciitis">{t("conditionsList.plantarFasciitis") || "Plantar Fasciitis"}</option>
                  <option value="Other">Other</option>
                </select>
                {touched.condition && !isConditionValid && (
                  <p className="mt-1 text-xs text-red-500 font-medium">Please select a treatment.</p>
                )}
              </div>

              {/* Preferred Date & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-slate-800 font-semibold text-xs sm:text-sm mb-1.5">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`
                      w-full
                      h-12 sm:h-13
                      bg-slate-50/70
                      border
                      ${touched.date && !isDateValid ? "border-red-400 bg-red-50/20 focus:ring-red-400/20" : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"}
                      rounded-xl
                      px-4
                      text-slate-900
                      focus:bg-white
                      focus:ring-2
                      outline-none
                      transition-all
                      duration-200
                      text-xs sm:text-sm
                    `}
                  />
                  {touched.date && !isDateValid && (
                    <p className="mt-1 text-xs text-red-500 font-medium">Please select a date.</p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-slate-800 font-semibold text-xs sm:text-sm mb-1.5">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`
                      w-full
                      h-12 sm:h-13
                      bg-slate-50/70
                      border
                      ${touched.time && !isTimeValid ? "border-red-400 bg-red-50/20 focus:ring-red-400/20" : "border-slate-200 focus:border-teal-500 focus:ring-teal-500/20"}
                      rounded-xl
                      px-4
                      text-slate-900
                      focus:bg-white
                      focus:ring-2
                      outline-none
                      transition-all
                      duration-200
                      text-xs sm:text-sm
                    `}
                  />
                  {touched.time && !isTimeValid && (
                    <p className="mt-1 text-xs text-red-500 font-medium">Please select a time.</p>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="message" className="block text-slate-800 font-semibold text-xs sm:text-sm mb-1.5">
                  Additional Information <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  name="message"
                  placeholder="Tell us about your symptoms or anything the physiotherapist should know..."
                  value={formData.message}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-slate-50/70
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    text-slate-900
                    placeholder:text-slate-400
                    focus:bg-white
                    focus:border-teal-500
                    focus:ring-2
                    focus:ring-teal-500/20
                    resize-none
                    outline-none
                    transition-all
                    duration-200
                    text-xs sm:text-sm
                  "
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-13 sm:h-14
                  min-h-[52px]
                  bg-teal-600
                  hover:bg-teal-700
                  active:bg-teal-800
                  text-white
                  font-bold
                  rounded-xl
                  shadow-md
                  hover:shadow-lg
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition-all
                  duration-200
                  text-sm sm:text-base
                  flex
                  items-center
                  justify-center
                  gap-2
                  mt-2
                "
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Booking Appointment...</span>
                  </>
                ) : (
                  <span>{t("appointmentForm.bookingBtn")}</span>
                )}
              </motion.button>

              {/* Security Badge */}
              <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                <FaLock className="text-slate-400 text-xs" />
                <span>Your information is secure and will only be used to schedule your appointment.</span>
              </p>

            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;