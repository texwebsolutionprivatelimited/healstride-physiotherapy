import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";

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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">

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
          <p className="text-teal-200 font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight mb-8">
            HealStride Physiotherapy &
            <br />
            Wellness Centre
          </p>

          {/* Tagline */}
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Pain-Free Life Starts Here.
          </h1>

          {/* Description */}
          <p className="mt-8 text-gray-200 text-xl leading-9 max-w-4xl mx-auto">
            Personalized physiotherapy treatments designed to help you
            recover, move better, and live pain-free with expert care.
          </p>

          {/* Buttons */}
          <motion.div
            className="flex justify-center gap-6 mt-14 flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
            }}
          >
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-xl transition duration-300">
              <FaCalendarCheck />
              Book Appointment
            </button>

            <button className="border border-white bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-8 py-4 rounded-xl flex items-center gap-3 transition duration-300">
              <FaPhoneAlt />
              Call Now
            </button>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;