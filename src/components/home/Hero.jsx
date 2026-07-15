import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroBg from "../../assets/images/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
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
      <div className="relative z-10 flex items-center justify-center min-h-[90vh] sm:min-h-screen px-4 sm:px-6 lg:px-8">

        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >

          {/* Clinic Name */}
          <p
            className="
      text-teal-200
      font-extrabold
      text-3xl
      sm:text-4xl
      md:text-5xl
      lg:text-7xl
      leading-tight
      mb-6
      sm:mb-8
      "
          >
            HealStride Physiotherapy &
            <br />
            Wellness Centre
          </p>

          {/* Tagline */}
          <h1
            className="
      text-white
      text-2xl
      sm:text-3xl
      md:text-5xl
      lg:text-6xl
      font-semibold
      leading-tight
      "
          >
            Pain-Free Life Starts Here.
          </h1>

          {/* Description */}
          <p
            className="
      mt-5
      sm:mt-6
      md:mt-8
      text-gray-200
      text-sm
      sm:text-base
      md:text-lg
      lg:text-xl
      leading-7
      md:leading-9
      max-w-4xl
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
      flex
      flex-col
      sm:flex-row
      justify-center
      gap-4
      sm:gap-6
      mt-8
      md:mt-12
      "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
          >

            {/* Book Appointment */}
            <Link
              to="/contact"
              className="
        bg-teal-600
        hover:bg-teal-700
        text-white
        px-6
        sm:px-8
        py-3
        sm:py-4
        rounded-xl
        flex
        items-center
        justify-center
        gap-3
        shadow-xl
        transition
        duration-300
        w-full
        sm:w-auto
        "
            >
              <FaCalendarCheck />
              Book Appointment
            </Link>

            {/* Call Now */}
            <a
              href="tel:+919569274008"
              className="
        border
        border-white
        bg-white/10
        backdrop-blur-md
        text-white
        hover:bg-white/20
        px-6
        sm:px-8
        py-3
        sm:py-4
        rounded-xl
        flex
        items-center
        justify-center
        gap-3
        transition
        duration-300
        w-full
        sm:w-auto
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