// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  UserCircle,
  Mail,
  Calendar,
  LogOut,
  Camera,
  Phone,
  Shield,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { auth } from "../firebase/firebase";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) return navigate("/login");
      setUser(u);
      setPhotoURL(u.photoURL || "");
      // Agar displayName nahi hai to email ka pehla part use karo
      setDisplayName(
        u.displayName || (u.email ? u.email.split("@")[0] : "User")
      );
      // TODO: firestore se appointments fetch karo
      setAppointments([]);
    });
    return () => unsub();
  }, [navigate]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim() || "User",
        photoURL: photoURL.trim(),
      });
      toast.success("Profile updated");
    } catch (e) {
      console.log(e);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("role");
    toast.success("Logged out");
    navigate("/");
  };

  if (!user) return null;

  const initials = (displayName || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800">My Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage your profile and appointments
          </p>
        </motion.div>

        {/* Top Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-teal-700 to-teal-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-white/10 rounded-full" />

          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-white text-teal-700 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg">
                  {initials}
                </div>
              )}
              <span className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold">{displayName}</h2>
              <p className="opacity-90 flex items-center justify-center sm:justify-start gap-2 mt-1">
                <Mail size={16} /> {user.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs">
                  <Shield size={12} /> Verified Patient
                </span>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs">
                  <Calendar size={12} /> Joined{" "}
                  {new Date(
                    user.metadata?.creationTime || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-white text-red-600 hover:bg-red-50 font-semibold px-5 py-2.5 rounded-xl transition shadow"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Total", value: appointments.length, icon: Calendar, color: "teal" },
            {
              label: "Upcoming",
              value: appointments.filter((a) => a.status === "upcoming").length,
              icon: Clock,
              color: "blue",
            },
            {
              label: "Completed",
              value: appointments.filter((a) => a.status === "completed").length,
              icon: CheckCircle2,
              color: "green",
            },
            { label: "Sessions", value: 0, icon: Shield, color: "purple" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 shadow-sm border flex items-center gap-3"
            >
              <div className={`p-3 rounded-xl bg-${s.color}-100 text-${s.color}-700`}>
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Edit Profile */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white rounded-2xl shadow-sm border p-6"
          >
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Camera size={18} className="text-teal-700" /> Edit Profile
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Update your personal details
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="https://..."
                />
                {photoURL && (
                  <img
                    src={photoURL}
                    alt="preview"
                    className="w-20 h-20 rounded-full object-cover border mt-3"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-50 text-gray-500"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>

          {/* Appointments */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Calendar size={18} className="text-teal-700" /> My Appointments
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Your booked physiotherapy sessions
                </p>
              </div>
              <button
                onClick={() => navigate("/booking")}
                className="text-sm bg-teal-50 text-teal-700 hover:bg-teal-100 px-4 py-2 rounded-lg font-medium transition"
              >
                + Book New
              </button>
            </div>

            <div className="mt-5">
              {appointments.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-xl">
                  <Calendar
                    size={40}
                    className="mx-auto text-gray-300 mb-3"
                  />
                  <p className="font-medium text-slate-700">
                    No appointments yet
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Book your first session to get started
                  </p>
                  <button
                    onClick={() => navigate("/booking")}
                    className="mt-4 bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {appointments.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center justify-between p-4 border rounded-xl hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-teal-50 text-teal-700 rounded-lg">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {a.service}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                            <Clock size={12} /> {a.date}
                            {a.phone && (
                              <>
                                <Phone size={12} className="ml-2" /> {a.phone}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          a.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : a.status === "upcoming"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
