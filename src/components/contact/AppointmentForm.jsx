import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { motion } from "framer-motion";

const AppointmentForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    condition: "",
    date: "",
    time: "",
    message: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "appointments"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        email: "",
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
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Heading */}
          <div className="text-center mb-10">
            <span className="text-teal-600 font-semibold uppercase tracking-[3px] text-sm">
              Appointment
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
              Book Appointment
            </h2>

            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Schedule your physiotherapy consultation and begin your recovery journey today.
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4"
            >
              <h4 className="font-semibold text-green-700">
                Appointment Request Submitted Successfully 🎉
              </h4>

              <p className="text-green-600 mt-1">
                Our team will contact you shortly.
              </p>
            </motion.div>
          )}

          {/* Form */}
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
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />

            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            >
              <option value="">Select Condition</option>
              <option>Knee Pain</option>
              <option>Back Pain</option>
              <option>Neck Pain</option>
              <option>Shoulder Pain</option>
              <option>Sciatica</option>
              <option>Sports Injury</option>
              <option>Stroke Rehab</option>
              <option>Frozen Shoulder</option>
              <option>Post Surgery Rehab</option>
              <option>Plantar Fasciitis</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            <textarea
              rows="5"
              name="message"
              placeholder="Additional Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default AppointmentForm;