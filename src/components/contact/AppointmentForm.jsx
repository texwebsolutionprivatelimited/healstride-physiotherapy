import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    condition: "",
    date: "",
    time: "",
    message: "",
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
        createdAt: serverTimestamp(),
      });

      alert("Appointment booked successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        condition: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-6">
        Book Appointment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
        />

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          required
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

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
          />

        </div>

        <textarea
          rows="4"
          name="message"
          placeholder="Additional Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>

      </form>
    </div>
  );
};

export default AppointmentForm;