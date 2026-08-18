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
    <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-teal-600 uppercase tracking-wider text-center font-semibold text-xs sm:text-sm"
        >
          {t("conditions.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-2 text-slate-900 leading-tight"
        >
          {t("conditions.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-slate-600 text-center mt-2.5 sm:mt-3 max-w-2xl mx-auto leading-relaxed text-xs sm:text-base"
        >
          {t("conditions.subtitle")}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-14 mt-6 sm:mt-12 items-start">
          {/* LEFT SIDE - CONDITIONS */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-2.5 xs:gap-3.5 sm:gap-6"
          >
            {conditionsData.map((item, index) => {
              const Icon = item.icon;
              const translatedCondition = t(
                `conditionsList.${item.key}`
              );

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                  }}
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-6 shadow-md sm:shadow-lg border border-gray-100 hover:border-teal-500 transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 text-sm xs:text-base sm:text-xl group-hover:bg-teal-600 group-hover:text-white transition">
                      <Icon />
                    </div>

                    <h3 className="mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-lg font-semibold text-slate-900 leading-snug">
                      {translatedCondition}
                    </h3>
                  </div>

                  <p className="mt-1 text-[11px] sm:text-xs text-gray-500 line-clamp-1">
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