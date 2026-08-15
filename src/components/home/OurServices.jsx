import {
  FaHandsHelping,
  FaRunning,
  FaDumbbell,
  FaBolt,
  FaHeartbeat,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import treatment1 from "../../assets/images/treatment1.jpg";
import treatment2 from "../../assets/images/treatment2.jpg";
import treatment3 from "../../assets/images/treatment3.jpg";
import treatment4 from "../../assets/images/treatment4.jpg";
import treatment5 from "../../assets/images/treatment5.jpg";
import treatment7 from "../../assets/images/treatment7.jpg";

const servicesData = [
  {
    titleKey: "servicesList.physiotherapyTitle",
    descKey: "servicesList.physiotherapyDesc",
    slug: "physiotherapy",
    image: treatment1,
    icon: <FaHandsHelping />,
  },
  {
    titleKey: "servicesList.dryNeedlingTitle",
    descKey: "servicesList.dryNeedlingDesc",
    slug: "dry-needling",
    image: treatment2,
    icon: <FaHeartbeat />,
  },
  {
    titleKey: "servicesList.cuppingTherapyTitle",
    descKey: "servicesList.cuppingTherapyDesc",
    slug: "cupping-therapy",
    image: treatment3,
    icon: <FaBolt />,
  },
  {
    titleKey: "servicesList.iastmTherapyTitle",
    descKey: "servicesList.iastmTherapyDesc",
    slug: "iastm-therapy",
    image: treatment7,
    icon: <FaRunning />,
  },
  {
    titleKey: "servicesList.exerciseTherapyTitle",
    descKey: "servicesList.exerciseTherapyDesc",
    slug: "exercise-therapy",
    image: treatment5,
    icon: <FaDumbbell />,
  },
  {
    titleKey: "servicesList.sportsRehabTitle",
    descKey: "servicesList.sportsRehabDesc",
    slug: "sports-rehabilitation",
    image: treatment4,
    icon: <FaRunning />,
  },
];

const OurServices = () => {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-teal-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-12"
        >
          <p className="uppercase tracking-[3px] sm:tracking-[6px] text-teal-600 font-semibold text-xs sm:text-sm">
            {t("ourServices.badge")}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mt-2 sm:mt-4 text-slate-900 leading-tight">
            {t("ourServices.title")}
          </h2>

          <div className="w-16 sm:w-24 h-1 bg-teal-600 rounded-full mx-auto mt-3 sm:mt-6 mb-3 sm:mb-6"></div>

          <p className="text-gray-600 max-w-3xl mx-auto text-xs sm:text-base lg:text-lg leading-relaxed sm:leading-8">
            {t("ourServices.subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-44 xs:h-52 sm:h-60">
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Icon */}
                <div className="absolute top-3 left-3 bg-teal-600 text-white w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-sm xs:text-base sm:text-2xl shadow-lg">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="absolute bottom-3 left-3 right-3 text-white text-base xs:text-lg sm:text-xl lg:text-2xl font-bold truncate">
                  {t(service.titleKey)}
                </h3>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <p className="text-gray-600 text-xs sm:text-base leading-relaxed sm:leading-7 line-clamp-3 sm:line-clamp-none">
                  {t(service.descKey)}
                </p>

                <Link
                  to={`/services/${service.slug}`}
                  className="mt-3 sm:mt-5 inline-block text-teal-600 font-semibold hover:text-teal-800 transition text-xs sm:text-base"
                >
                  {t("ourServices.learnMore")}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;