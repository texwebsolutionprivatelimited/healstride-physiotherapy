// src/components/layout/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserCircle } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

import { NAVIGATION } from "../../../constants/navigation";
import logo from "../../../assets/images/logo.png";
import { auth } from "../../../firebase/firebase";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleBookAppointment = () => {
    if (!auth.currentUser) return navigate("/login");
    navigate("/contact");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("role");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    }
  };

  // Reusable profile icon (desktop + mobile)
  const ProfileIcon = ({ size = 40 }) =>
    user?.photoURL ? (
      <img
        src={user.photoURL}
        alt="profile"
        style={{ width: size, height: size }}
        className="rounded-full object-cover border-2 border-teal-700"
      />
    ) : (
      <UserCircle size={size} className="text-teal-700" />
    );

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={logo}
              alt="HealStride Logo"
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-teal-700">
                HealStride
              </h1>
              <p className="hidden sm:block text-xs text-gray-500">
                Physiotherapy & Wellness
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAVIGATION.map((item) => (
            <motion.li key={item.id} whileHover={{ y: -2 }}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-teal-700 transition font-medium"
              >
                {item.title}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleBookAppointment}
            className="bg-teal-700 text-white px-5 py-2 rounded-xl hover:bg-teal-800 transition"
          >
            Book Appointment
          </button>

          {!user ? (
            <Link
              to="/login"
              className="border border-teal-700 text-teal-700 px-5 py-2 rounded-xl hover:bg-teal-50 transition"
            >
              Login
            </Link>
          ) : (
            // ONLY profile icon — click goes to /profile
            <button
              onClick={() => navigate("/profile")}
              title="My Profile"
              className="rounded-full hover:ring-2 hover:ring-teal-500 transition"
            >
              <ProfileIcon size={42} />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-teal-700 text-2xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t px-6 py-5"
        >
          <ul className="flex flex-col gap-5">
            {NAVIGATION.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="text-gray-700 hover:text-teal-700 font-medium"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              setOpen(false);
              handleBookAppointment();
            }}
            className="block w-full text-center mt-5 bg-teal-700 text-white px-5 py-3 rounded-xl"
          >
            Book Appointment
          </button>

          {!user ? (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block w-full text-center mt-3 border border-teal-700 text-teal-700 px-5 py-3 rounded-xl"
            >
              Login
            </Link>
          ) : (
            // Same logic on mobile — sirf profile icon
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full mt-4 flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 p-3 rounded-xl transition"
            >
              <ProfileIcon size={40} />
              <span className="font-semibold text-slate-800">My Profile</span>
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
