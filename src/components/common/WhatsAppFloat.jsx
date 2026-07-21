import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsAppFloat = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 1,
      }}
      className="
fixed
bottom-4
right-4
sm:bottom-5
sm:right-5
z-50
"
    >
      <a
        href="https://wa.me/919569274008"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center"
      >
        {/* Text Bubble */}

        <div
          className="
          hidden md:flex
          mr-3
          px-4
          py-2
          rounded-full
          bg-white
          shadow-xl
          text-slate-800
          font-medium
          opacity-0
          translate-x-4
          group-hover:opacity-100
          group-hover:translate-x-0
          transition-all
          duration-300
          whitespace-nowrap
          "
        >
          Chat With Us
        </div>

        {/* Button Wrapper */}

        <div className="relative">

          {/* Pulse Ring */}

          <span
            className="
            absolute
            inset-0
            rounded-full
            bg-green-500
            animate-ping
            opacity-25
            "
          />

          <span
            className="
            absolute
            -inset-2
            rounded-full
            border-2
            border-green-400
            opacity-30
            "
          />

          {/* Main Button */}

          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: 5,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
            relative
            flex
            items-center
            justify-center
            w-14
            h-14
            md:w-16
            md:h-16
            rounded-full
            bg-gradient-to-r
            from-green-500
            to-green-600
            text-white
            shadow-2xl
            "
          >
            <FaWhatsapp className="text-3xl md:text-4xl" />
          </motion.div>

        </div>
      </a>
    </motion.div>
  );
};

export default WhatsAppFloat;