import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaStar,
  FaCalendarAlt,
  FaHeartbeat,
} from "react-icons/fa";

const statsData = [
  {
    icon: <FaUsers size={34} />,
    number: "5000+",
    titleKey: "googleRating.statHappyPatients",
  },
  {
    icon: <FaCalendarAlt size={34} />,
    number: "8+",
    titleKey: "googleRating.statYearsExperience",
  },
  {
    icon: <FaStar size={34} />,
    number: "4.9",
    titleKey: "googleRating.statGoogleRating",
  },
  {
    icon: <FaHeartbeat size={34} />,
    number: "10000+",
    titleKey: "googleRating.statSuccessfulTreatments",
  },
];

const GoogleRating = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-10"
        >
          <p className="text-teal-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">
            {t("googleRating.badge")}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 text-slate-900 leading-tight">
            {t("googleRating.title")}
          </h2>

          <p className="mt-2 sm:mt-4 text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed sm:leading-normal">
            {t("googleRating.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {statsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-xl border border-gray-100 p-3.5 xs:p-5 sm:p-6 lg:p-8 text-center flex flex-col justify-center items-center"
            >
              <div className="flex justify-center text-teal-600 mb-2 sm:mb-5 text-2xl sm:text-3xl">
                {item.icon}
              </div>

              <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                {item.number}
              </h3>

              <p className="mt-1 sm:mt-3 text-xs sm:text-sm lg:text-base text-gray-600 leading-snug">
                {t(item.titleKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleRating;