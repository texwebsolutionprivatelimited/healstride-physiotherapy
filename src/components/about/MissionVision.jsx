import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const MissionVision = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            {t("missionVision.badge")}
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            {t("missionVision.title")}
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {t("missionVision.subtitle")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Target
                size={32}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              {t("missionVision.missionTitle")}
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              {t("missionVision.missionDesc")}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-green-100"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
              <Eye
                size={32}
                className="text-green-600"
              />
            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              {t("missionVision.visionTitle")}
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              {t("missionVision.visionDesc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;