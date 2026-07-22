import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroBg from "../../assets/images/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="
      relative
      min-h-[80vh]
      sm:min-h-[85vh]
      lg:min-h-screen
      overflow-hidden
      "
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 via-teal-800/40 to-transparent" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Content */}
      <div
        className="
        relative z-10
        flex items-center justify-center
        min-h-[80vh]
        sm:min-h-[85vh]
        lg:min-h-screen
        px-4
        sm:px-6
        lg:px-8
        py-16
        "
      >
        <motion.div
          className="
          w-full
          max-w-6xl
          mx-auto
          text-center
          "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Clinic Name */}
          <p
            className="
            text-teal-200
            font-extrabold

            text-3xl
            xs:text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl

            leading-tight
            mb-4
            sm:mb-6
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
            font-bold

            text-xl
            sm:text-2xl
            md:text-4xl
            lg:text-5xl

            leading-tight
            "
          >
            Pain-Free Life Starts Here.
          </h1>

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
            md:leading-8

            max-w-3xl
            mx-auto

            px-2
            sm:px-4
            "
          >
            Personalized physiotherapy treatments designed to help you
            recover, move better, and live pain-free with expert care.
          </p>

          {/* Buttons */}
          <motion.div
            className="
            mt-8
            md:mt-10

            flex
            flex-col
            sm:flex-row

            gap-4
            justify-center
            items-center

            w-full
            "
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/booking"
              className="
              w-full
              sm:w-auto

              min-w-[220px]

              bg-teal-600
              hover:bg-teal-700

              text-white
              font-medium

              px-6
              py-3.5

              rounded-xl

              flex
              items-center
              justify-center
              gap-3

              shadow-lg
              transition-all
              "
            >
              <FaCalendarCheck />
              Book Appointment
            </Link>

            <a
              href="tel:+919569274008"
              className="
              w-full
              sm:w-auto

              min-w-[220px]

              border
              border-white

              bg-white/10
              backdrop-blur-md

              text-white
              font-medium

              px-6
              py-3.5

              rounded-xl

              flex
              items-center
              justify-center
              gap-3

              hover:bg-white/20
              transition-all
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