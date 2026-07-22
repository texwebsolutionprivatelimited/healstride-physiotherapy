import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  const handleBookAppointment = () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    navigate("/booking");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("role");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

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
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 md:h-20 px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 min-w-0"
            >
              <img
                src={logo}
                alt="HealStride Logo"
                className="
                  h-10 w-10
                  sm:h-12 sm:w-12
                  md:h-14 md:w-14
                  object-contain
                  flex-shrink-0
                "
              />

              <div className="min-w-0">
                <h1
                  className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  lg:text-2xl
                  font-bold
                  text-teal-700
                  truncate
                "
                >
                  HealStride
                </h1>

                <p className="hidden lg:block text-xs text-gray-500">
                  Physiotherapy & Wellness
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className="font-medium text-gray-700 hover:text-teal-700 transition"
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handleBookAppointment}
              className="
                bg-teal-700
                text-white
                px-5
                py-2.5
                rounded-xl
                hover:bg-teal-800
                transition
              "
            >
              Book Appointment
            </button>

            {!user ? (
              <Link
                to="/login"
                className="
                  border
                  border-teal-700
                  text-teal-700
                  px-5
                  py-2.5
                  rounded-xl
                  hover:bg-teal-50
                  transition
                "
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => navigate("/profile")}
                className="rounded-full hover:ring-2 hover:ring-teal-500 transition"
              >
                <ProfileIcon size={42} />
              </button>
            )}
          </div>

          {/* Tablet CTA */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <button
              onClick={handleBookAppointment}
              className="
                bg-teal-700
                text-white
                px-4
                py-2
                rounded-lg
                text-sm
              "
            >
              Book
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="text-teal-700 text-2xl"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden
              text-teal-700
              text-xl
              p-2
            "
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              lg:hidden
              bg-white
              border-t
              shadow-lg
              px-4
              py-5
              max-h-[80vh]
              overflow-y-auto
            "
          >
            <ul className="flex flex-col gap-1">
              {NAVIGATION.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="
                      block
                      py-3
                      px-3
                      rounded-lg
                      text-gray-700
                      font-medium
                      hover:bg-teal-50
                      hover:text-teal-700
                      transition
                    "
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
              className="
                w-full
                mt-5
                bg-teal-700
                text-white
                py-3
                rounded-xl
                font-medium
              "
            >
              Book Appointment
            </button>

            {!user ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="
                  block
                  w-full
                  mt-3
                  text-center
                  border
                  border-teal-700
                  text-teal-700
                  py-3
                  rounded-xl
                  font-medium
                "
              >
                Login
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                  className="
                    w-full
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-gray-50
                    hover:bg-gray-100
                  "
                >
                  <ProfileIcon size={40} />
                  <span className="font-semibold text-gray-800">
                    My Profile
                  </span>
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="
                    w-full
                    mt-3
                    border
                    border-red-500
                    text-red-500
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;