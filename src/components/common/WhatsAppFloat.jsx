import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const WhatsAppFloat = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.8,
        }}
        className="fixed bottom-14 right-4 sm:bottom-16 sm:right-6 z-40 max-w-[calc(100vw-32px)]"
      >
        <button
          type="button"
          onClick={() => setShowContact(true)}
          aria-label="View clinic contact details"
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
            Contact Clinic
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

            {/* Outer Ring */}
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
        </button>
      </motion.div>

      {/* Clinic Contact & Timing Popup */}
      {showContact && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowContact(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-teal-600 px-6 py-5 text-white flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Contact Clinic
                </h2>

                <p className="text-sm text-teal-50 mt-1">
                  HealStride Physiotherapy & Wellness Centre
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition text-2xl"
                aria-label="Close contact popup"
              >
                ×
              </button>
            </div>

            {/* Contact Details */}
            <div className="px-6 py-6 space-y-5 text-gray-700">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <FaPhoneAlt />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Phone
                  </h3>

                  <p className="text-sm mt-1">
                    +91 82525 80389
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <FaEnvelope />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Email
                  </h3>

                  <p className="text-sm mt-1 break-all">
                    healstride@gmail.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Clinic Address
                  </h3>

                  <p className="text-sm mt-1 leading-relaxed">
                    HealStride Physiotherapy & Wellness Centre,
                    <br />
                    Arera Colony, Bhopal,
                    <br />
                    Madhya Pradesh 462016
                  </p>
                </div>
              </div>

              {/* Clinic Timings */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <FaClock />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Clinic Timings
                  </h3>

                  <p className="text-sm mt-1 leading-relaxed">
                    Monday - Saturday: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Popup Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowContact(false)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppFloat;