import {
  FaUserMd,
  FaHeartbeat,
  FaHome,
  FaStethoscope,
  FaShieldAlt,
  FaRegSmile,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const featuresData = [
  {
    icon: <FaUserMd />,
    titleKey: "whyChooseUs.f1Title",
    descKey: "whyChooseUs.f1Desc",
  },
  {
    icon: <FaHeartbeat />,
    titleKey: "whyChooseUs.f2Title",
    descKey: "whyChooseUs.f2Desc",
  },
  {
    icon: <FaHome />,
    titleKey: "whyChooseUs.f3Title",
    descKey: "whyChooseUs.f3Desc",
  },
  {
    icon: <FaStethoscope />,
    titleKey: "whyChooseUs.f4Title",
    descKey: "whyChooseUs.f4Desc",
  },
  {
    icon: <FaShieldAlt />,
    titleKey: "whyChooseUs.f5Title",
    descKey: "whyChooseUs.f5Desc",
  },
  {
    icon: <FaRegSmile />,
    titleKey: "whyChooseUs.f6Title",
    descKey: "whyChooseUs.f6Desc",
  },
];

const WhyChooseUs = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-white via-teal-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-12">
          <p className="uppercase tracking-[3px] sm:tracking-[6px] text-teal-600 font-semibold text-xs sm:text-sm">
            {t("whyChooseUs.badge")}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mt-2 sm:mt-4 text-slate-900 leading-tight">
            {t("whyChooseUs.title")}
          </h2>

          <div className="w-16 sm:w-24 h-1 bg-teal-600 rounded-full mx-auto my-3 sm:my-6"></div>

          <p className="text-gray-600 max-w-3xl mx-auto text-xs sm:text-base lg:text-lg leading-relaxed sm:leading-normal">
            {t("whyChooseUs.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuresData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-500 p-4 xs:p-5 sm:p-6 lg:p-8 border border-gray-100 hover:border-teal-300 hover:-translate-y-2"
            >
              <div className="w-11 h-11 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl sm:text-3xl mb-3 sm:mb-6">
                {item.icon}
              </div>

              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-4">
                {t(item.titleKey)}
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed sm:leading-7">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;