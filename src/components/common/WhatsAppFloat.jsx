import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsAppFloat = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.8,
      }}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-32px)]"
    >
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center"
      >
        {/* Text Bubble */}
        <div
          className="
            hidden md:flex
            mr-2.5
            px-3.5
            py-1.5
            rounded-full
            bg-white
            shadow-lg
            border
            border-slate-100
            text-slate-800
            text-xs
            font-semibold
            opacity-0
            translate-x-3
            group-hover:opacity-100
            group-hover:translate-x-0
            transition-all
            duration-250
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
              bg-emerald-500
              animate-ping
              opacity-25
            "
          />

          <span
            className="
              absolute
              -inset-1
              rounded-full
              border-2
              border-emerald-400
              opacity-30
            "
          />

          {/* Main Button */}
          <motion.div
            whileHover={{
              scale: 1.08,
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
              w-12
              h-12
              sm:w-14
              sm:h-14
              rounded-full
              bg-gradient-to-r
              from-emerald-500
              to-emerald-600
              text-white
              shadow-lg
              hover:shadow-emerald-500/30
            "
          >
            <FaWhatsapp className="text-2xl sm:text-3xl" />
          </motion.div>
        </div>
      </a>
    </motion.div>
  );
};

export default WhatsAppFloat;