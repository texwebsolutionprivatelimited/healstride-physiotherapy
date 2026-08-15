import { motion } from "framer-motion";
import {
  FaBone,
  FaWalking,
  FaHeartbeat,
  FaRunning,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ConditionSlider from "./ConditionSlider";

const conditionsData = [
  { key: "kneePain", icon: FaBone },
  { key: "backPain", icon: FaWalking },
  { key: "neckPain", icon: FaBone },
  { key: "shoulderPain", icon: FaHeartbeat },
  { key: "sciatica", icon: FaRunning },
  { key: "tennisElbow", icon: FaBone },
  { key: "frozenShoulder", icon: FaHeartbeat },
  { key: "osteoarthritis", icon: FaBone },
  { key: "strokeRehab", icon: FaHeartbeat },
  { key: "sportsInjury", icon: FaRunning },
  { key: "postSurgeryRehab", icon: FaWalking },
  { key: "plantarFasciitis", icon: FaBone },
];

const Conditions = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-teal-600 uppercase tracking-[3px] sm:tracking-[5px] text-center font-semibold text-xs sm:text-sm"
        >
          {t("conditions.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-4 text-slate-900 leading-tight"
        >
          {t("conditions.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 text-center mt-4 sm:mt-5 max-w-3xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base"
        >
          {t("conditions.subtitle")}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 mt-10 sm:mt-16 items-start">
          {/* LEFT SIDE - CONDITIONS */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {conditionsData.map((item, index) => {
              const Icon = item.icon;
              const translatedCondition = t(`conditionsList.${item.key}`);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:border-teal-500 transition duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 text-lg sm:text-xl group-hover:bg-teal-600 group-hover:text-white transition">
                    <Icon />
                  </div>

                  <h3 className="mt-4 text-base sm:text-lg font-semibold text-slate-900">
                    {translatedCondition}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-gray-600">
                    {t("conditions.treatmentFor", {
                      condition: translatedCondition,
                    })}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT SIDE - IMAGE SLIDER */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <ConditionSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Conditions;