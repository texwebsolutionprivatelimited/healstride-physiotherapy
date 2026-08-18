import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import drRashidImage from "../../assets/images/Dr.MD.Rashid.png";

const featureKeys = [
  "clinicIntro.f1",
  "clinicIntro.f2",
  "clinicIntro.f3",
  "clinicIntro.f4",
];

const ClinicIntro = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={drRashidImage}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              {t("clinicIntro.badge")}
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              {t("clinicIntro.title")}
            </h2>

            <p className="mt-6 text-gray-600 leading-7 sm:leading-8 text-base sm:text-lg">
              {t("clinicIntro.desc")}
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {featureKeys.map((key, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 shadow-sm"
                >
                  <CheckCircle
                    size={22}
                    className="text-green-500 flex-shrink-0"
                  />

                  <span className="text-slate-700 font-medium text-sm sm:text-base">
                    {t(key)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClinicIntro;