import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase/firebase";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const navigate = useNavigate();

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
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative  py-20 md:py-28 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/appointment.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/70"></div>

      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <span
              className="
                inline-block
                px-4 py-2
                rounded-full
                bg-teal-500/20
                border border-teal-400/30
                text-teal-300
                font-semibold
                uppercase
                tracking-[3px]
                text-xs
                backdrop-blur-md
              "
            >
              Appointment
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-5">
              Book Appointment
            </h2>

            <p className="text-gray-200 mt-4 max-w-2xl mx-auto leading-8">
              Schedule your physiotherapy consultation and begin your
              recovery journey today.
            </p>
          </div>

          {!user && (
            <div className="mb-6 bg-yellow-500/15 backdrop-blur-md border border-yellow-400/20 text-yellow-200 rounded-2xl p-4">
              Please login with Google before booking an appointment.
            </div>
          )}

          {submitted && (
            <div className="mb-6 bg-green-500/15 backdrop-blur-md border border-green-400/20 rounded-2xl p-4">
              <h4 className="font-semibold text-green-300">
                Appointment Request Submitted Successfully 🎉
              </h4>

              <p className="text-green-200 mt-1">
                Our team will contact you shortly.
              </p>
            </div>
          )}

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 max-w-4xl mx-auto"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
              />

              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-400 outline-none"
              >
                <option value="" className="text-black">
                  Select Condition
                </option>
                <option className="text-black">Knee Pain</option>
                <option className="text-black">Back Pain</option>
                <option className="text-black">Neck Pain</option>
                <option className="text-black">Shoulder Pain</option>
                <option className="text-black">Sciatica</option>
                <option className="text-black">Sports Injury</option>
                <option className="text-black">Stroke Rehab</option>
                <option className="text-black">Frozen Shoulder</option>
                <option className="text-black">Post Surgery Rehab</option>
                <option className="text-black">Plantar Fasciitis</option>
              </select>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-teal-400"
                />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <textarea
                rows="5"
                name="message"
                placeholder="Additional Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-300 resize-none outline-none focus:ring-2 focus:ring-teal-400"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-teal-500/30 disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book Appointment"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;