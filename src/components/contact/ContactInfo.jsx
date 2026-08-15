import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ContactInfo = () => {
  const { t } = useTranslation();

  const contactItems = [
    {
      icon: <FaPhoneAlt />,
      titleKey: "contactInfo.phone",
      content: (
        <a
          href="tel:+919569274008"
          className="text-gray-600 hover:text-teal-600 transition"
        >
          +91 9569274008
        </a>
      ),
    },
    {
      icon: <FaEnvelope />,
      titleKey: "contactInfo.email",
      content: (
        <a
          href="mailto:info@healstride.com"
          className="text-gray-600 hover:text-teal-600 transition break-all"
        >
          info@healstride.com
        </a>
      ),
    },
    {
      icon: <FaMapMarkerAlt />,
      titleKey: "contactInfo.address",
      content: (
        <p className="text-gray-600 text-sm sm:text-base leading-7">
          HealStride Physiotherapy & Wellness Centre
          <br />
          Bhopal, Madhya Pradesh, India
        </p>
      ),
    },
    {
      icon: <FaClock />,
      titleKey: "contactInfo.hours",
      content: (
        <>
          <p className="text-gray-600 text-sm sm:text-base">
            {t("contactInfo.monSat")}
          </p>

          <p className="font-medium text-slate-800 mt-1">
            9:00 AM - 8:00 PM
          </p>

          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            {t("contactInfo.sun")}
          </p>

          <p className="font-medium text-red-500">
            {t("contactInfo.closed")}
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-teal-600 font-semibold uppercase tracking-[3px] sm:tracking-wider text-sm">
            {t("contactInfo.badge")}
          </span>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mt-2">
            {t("contactInfo.title")}
          </h3>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            {t("contactInfo.subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="p-5 sm:p-6 rounded-2xl bg-gray-50 hover:bg-teal-50 hover:shadow-xl transition-all duration-300 text-center"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="bg-teal-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-4 text-lg sm:text-xl"
              >
                {item.icon}
              </motion.div>

              <h4 className="font-semibold text-slate-800 mb-2 text-base sm:text-lg">
                {t(item.titleKey)}
              </h4>

              {item.content}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;