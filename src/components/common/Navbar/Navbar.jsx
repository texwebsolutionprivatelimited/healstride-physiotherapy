import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserCircle } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { NAVIGATION } from "../../../constants/navigation";
import logo from "../../../assets/images/logo.png";
import { auth } from "../../../firebase/firebase";
import LanguageSwitcher from "../../LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const getNavigationLabel = (item) => {
    if (item.key) {
      return t(item.key);
    }

    switch (item.path) {
      case "/":
        return t("navbar.home");

      case "/about":
        return t("navbar.about");

      case "/services":
        return t("navbar.services");

      case "/contact":
        return t("navbar.contact");

      default:
        return item.title;
    }
  };

  const ProfileIcon = ({ size = 36 }) =>
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
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100/80"
          : "bg-white border-b border-slate-100 shadow-sm"
      }`}
    >
      <div className="max-w-[1600px] mx-auto h-12 sm:h-13.5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 min-w-0"
            >
              <img
                src={logo}
                alt="HealStride Logo"
                className="
                  h-7 w-7
                  xs:h-8 xs:w-8
                  sm:h-8.5 sm:w-8.5
                  md:h-9 md:w-9
                  object-contain
                  flex-shrink-0
                "
              />

              <div className="min-w-0">
                <h1
                  className="
                    text-sm
                    sm:text-base
                    md:text-lg
                    font-bold
                    text-teal-700
                    truncate
                    leading-tight
                  "
                >
                  HealStride
                </h1>

                <p className="hidden lg:block text-[10px] text-gray-500 leading-none mt-0.5">
                  {t("navbar.tagline")}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-2 lg:gap-2.5 xl:gap-5 2xl:gap-8">
            {NAVIGATION.map((item) => {
              const active = isActive(item.path);
              return (
                <motion.li
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className={`
                      px-3 py-1.5 lg:px-3.5 xl:px-4 xl:py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 block whitespace-nowrap
                      ${
                        active
                          ? "bg-teal-700 text-white shadow-sm"
                          : "text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                      }
                    `}
                  >
                    {getNavigationLabel(item)}
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5 lg:gap-3 xl:gap-5 2xl:gap-6 flex-shrink-0">

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Appointment Button */}
            <button
              onClick={handleBookAppointment}
              className="
                bg-teal-700
                text-white
                px-3
                py-1.5
                lg:px-3.5
                xl:px-4
                xl:py-1.5
                rounded-lg
                hover:bg-teal-800
                hover:scale-105
                hover:shadow-md
                transition-all
                duration-300
                transform
                active:scale-95
                font-semibold
                text-xs xl:text-sm
                shadow-sm
                whitespace-nowrap
              "
            >
              {t("navbar.bookAppointment")}
            </button>

            {/* Login / Profile */}
            {!user ? (
              <Link
                to="/login"
                className="
                  border
                  border-teal-700
                  text-teal-700
                  px-3
                  py-1.5
                  lg:px-3.5
                  xl:px-4
                  xl:py-1.5
                  rounded-lg
                  hover:bg-teal-700
                  hover:text-white
                  hover:scale-105
                  hover:shadow-md
                  transition-all
                  duration-300
                  transform
                  active:scale-95
                  font-semibold
                  text-xs xl:text-sm
                  whitespace-nowrap
                "
              >
                {t("navbar.login")}
              </Link>
            ) : (
              <button
                onClick={() => navigate("/profile")}
                className="
                  rounded-full
                  hover:scale-110
                  hover:ring-4
                  hover:ring-teal-500/40
                  hover:shadow-md
                  transition-all
                  duration-300
                  transform
                  flex-shrink-0
                "
              >
                <ProfileIcon size={32} />
              </button>
            )}
          </div>

          {/* Tablet Actions */}
          <div className="hidden md:flex lg:hidden items-center gap-3">

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Tablet Appointment Button */}
            <button
              onClick={handleBookAppointment}
              className="
                bg-teal-700
                text-white
                px-3.5
                py-1.5
                rounded-lg
                text-xs
                font-semibold
              "
            >
              {t("navbar.bookAppointment")}
            </button>

            {/* Tablet Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="text-teal-700 text-xl p-1"
              aria-label="Toggle Navigation"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              className="
                text-teal-700
                text-xl
                p-1.5
              "
              aria-label="Toggle Navigation"
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
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
              py-4
              max-h-[80vh]
              overflow-y-auto
            "
          >

            {/* Navigation Links */}
            <ul className="flex flex-col gap-1.5">
              {NAVIGATION.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={`
                        block py-2.5 px-3.5 rounded-lg font-semibold text-sm transition-all duration-200
                        ${
                          active
                            ? "bg-teal-700 text-white shadow-sm"
                            : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                        }
                      `}
                    >
                      {getNavigationLabel(item)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Language Switcher */}
            <LanguageSwitcher variant="mobile" />

            {/* Appointment Button */}
            <button
              onClick={() => {
                setOpen(false);
                handleBookAppointment();
              }}
              className="
                w-full
                mt-4
                bg-teal-700
                text-white
                py-2.5
                rounded-xl
                font-semibold
                text-sm
              "
            >
              {t("navbar.bookAppointment")}
            </button>

            {/* Login / Profile */}
            {!user ? (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="
                  block
                  w-full
                  mt-2.5
                  text-center
                  border
                  border-teal-700
                  text-teal-700
                  py-2.5
                  rounded-xl
                  font-semibold
                  text-sm
                "
              >
                {t("navbar.login")}
              </Link>
            ) : (
              <>
                {/* Profile */}
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
                    p-2.5
                    rounded-xl
                    bg-gray-50
                    hover:bg-gray-100
                  "
                >
                  <ProfileIcon size={36} />

                  <span className="font-semibold text-gray-800 text-sm">
                    {t("navbar.myProfile")}
                  </span>
                </button>

                {/* Logout */}
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="
                    w-full
                    mt-2.5
                    border
                    border-red-500
                    text-red-500
                    py-2.5
                    rounded-xl
                    font-semibold
                    text-sm
                  "
                >
                  {t("navbar.logout")}
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