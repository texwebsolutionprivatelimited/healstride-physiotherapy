import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroBg from "../../assets/images/hero-bg.jpg";

const Hero = () => {
  return (
    <section
        className="relative min-h-[85vh] sm:min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/65 via-teal-800/30 to-transparent"></div>

      {/* Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[85vh] sm:min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl lg:max-w-5xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Clinic Name */}
          <h1
            className="
      text-teal-200
      font-extrabold
      text-2xl
      xs:text-3xl
      sm:text-4xl
      md:text-4xl
      lg:text-6xl
      xl:text-7xl
      leading-tight
      mb-4
      sm:mb-6
      "
          >
            HealStride Physiotherapy &
            <br />
            Wellness Centre
          </h1>

          {/* Tagline */}
          <h2
            className="
      text-white
      text-xl
      sm:text-2xl
      md:text-4xl
      lg:text-5xl
      font-semibold
      leading-tight
      "
          >
            Pain-Free Life Starts Here.
          </h2>

          {/* Description */}
          <p
            className="
      mt-4
      sm:mt-6
      text-gray-200
      text-sm
      sm:text-base
      md:text-lg
      lg:text-xl
      leading-6
      sm:leading-7
      max-w-3xl
      mx-auto
      px-2
      "
          >
            Personalized physiotherapy treatments designed to help you
            recover, move better, and live pain-free with expert care.
          </p>

          {/* Buttons */}
          <motion.div
            className="
      mt-8
      flex
      flex-col
      sm:flex-row
      items-center
      justify-center
      gap-4
      "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/booking"
              className="
        w-full
        max-w-[280px]
        sm:w-auto
        bg-teal-600
        hover:bg-teal-700
        text-white
        px-6
        py-3
        rounded-xl
        flex
        items-center
        justify-center
        gap-3
        shadow-xl
        "
            >
              <FaCalendarCheck />
              Book Appointment
            </Link>

            <a
              href="tel:+919569274008"
              className="
        w-full
        max-w-[280px]
        sm:w-auto
        border
        border-white
        bg-white/10
        backdrop-blur-md
        text-white
        hover:bg-white/20
        px-6
        py-3
        rounded-xl
        flex
        items-center
        justify-center
        gap-3
        "
            >
              <FaPhoneAlt />
              Call Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;