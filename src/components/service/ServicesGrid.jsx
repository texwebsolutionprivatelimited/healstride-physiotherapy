import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import treatment1 from "../../assets/images/treatment1.jpg";
import treatment2 from "../../assets/images/treatment2.jpg";
import treatment3 from "../../assets/images/treatment3.jpg";
import treatment4 from "../../assets/images/treatment4.jpg";
import treatment5 from "../../assets/images/treatment5.jpg";
import treatment6 from "../../assets/images/treatment6.jpg";
import treatment7 from "../../assets/images/treatment7.jpg";

const servicesData = [
  {
    titleKey: "servicesList.physiotherapyTitle",
    descKey: "servicesList.physiotherapyDesc",
    image: treatment1,
    benefits: [
      "Pain Relief",
      "Improved Mobility",
      "Better Strength"
    ],
    duration: "45 Minutes"
  },
  {
    titleKey: "servicesList.dryNeedlingTitle",
    descKey: "servicesList.dryNeedlingDesc",
    image: treatment2,
    benefits: [
      "Muscle Relaxation",
      "Pain Reduction",
      "Faster Recovery"
    ],
    duration: "30 Minutes"
  },
  {
    titleKey: "servicesList.cuppingTherapyTitle",
    descKey: "servicesList.cuppingTherapyDesc",
    image: treatment3,
    benefits: [
      "Better Circulation",
      "Pain Relief",
      "Muscle Recovery"
    ],
    duration: "40 Minutes"
  },
  {
    titleKey: "servicesList.iastmTherapyTitle",
    descKey: "servicesList.iastmTherapyDesc",
    image: treatment7,
    benefits: [
      "Scar Tissue Release",
      "Better Movement",
      "Healing Support"
    ],
    duration: "45 Minutes"
  },
  {
    titleKey: "servicesList.exerciseTherapyTitle",
    descKey: "servicesList.exerciseTherapyDesc",
    image: treatment5,
    benefits: [
      "Strength Building",
      "Flexibility",
      "Balance Improvement"
    ],
    duration: "45 Minutes"
  },
  {
    titleKey: "servicesList.sportsRehabTitle",
    descKey: "servicesList.sportsRehabDesc",
    image: treatment4,
    benefits: [
      "Injury Recovery",
      "Performance Improvement",
      "Strength Training"
    ],
    duration: "60 Minutes"
  },
  {
    titleKey: "conditionsList.kneePain",
    descKey: "servicesList.physiotherapyDesc",
    image: treatment1,
    benefits: [
      "Pain Management",
      "Joint Mobility",
      "Strength Recovery"
    ],
    duration: "45 Minutes"
  },
  {
    titleKey: "conditionsList.backPain",
    descKey: "servicesList.physiotherapyDesc",
    image: treatment6,
    benefits: [
      "Posture Correction",
      "Pain Relief",
      "Flexibility"
    ],
    duration: "45 Minutes"
  },
  {
    titleKey: "conditionsList.neckPain",
    descKey: "servicesList.physiotherapyDesc",
    image: treatment2,
    benefits: [
      "Reduce Stiffness",
      "Improve Movement",
      "Relax Muscles"
    ],
    duration: "40 Minutes"
  },
  {
    titleKey: "conditionsList.shoulderPain",
    descKey: "servicesList.physiotherapyDesc",
    image: treatment7,
    benefits: [
      "Pain Reduction",
      "Movement Recovery",
      "Strength"
    ],
    duration: "45 Minutes"
  },
];

const ServicesGrid = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            {t("servicesGrid.pageTitle")}
          </h2>

          <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-7">
            {t("servicesGrid.pageSubtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02
              }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="overflow-hidden h-48 sm:h-52 md:h-56">
                <motion.img
                  src={service.image}
                  alt={t(service.titleKey)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t(service.titleKey)}
                </h3>

                <p className="text-gray-600 mt-3 text-sm sm:text-base leading-7">
                  {t(service.descKey)}
                </p>

                <div className="mt-4">
                  <h4 className="font-semibold">{t("servicesGrid.benefits")}</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    {service.benefits.map((b, i) => (
                      <li key={i}>✓ {b}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-sm">
                  <b>{t("servicesGrid.duration")}</b> {service.duration}
                </p>

                <Link
                  to="/booking"
                  className="inline-block mt-5 text-teal-600 font-semibold text-sm sm:text-base hover:text-teal-800 transition"
                >
                  {t("servicesGrid.bookNow")}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;