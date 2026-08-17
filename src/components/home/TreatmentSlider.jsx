import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";

import treatment1 from "../../assets/images/treatment1.jpg";
import treatment2 from "../../assets/images/treatment2.jpg";
import treatment3 from "../../assets/images/treatment3.jpg";
import treatment4 from "../../assets/images/treatment4.jpg";
import treatment5 from "../../assets/images/treatment5.jpg";
import treatment7 from "../../assets/images/treatment7.jpg";

const treatmentsData = [
  {
    image: treatment2,
    titleKey: "servicesList.dryNeedlingTitle",
    descKey: "servicesList.dryNeedlingDesc",
  },
  {
    image: treatment3,
    titleKey: "servicesList.cuppingTherapyTitle",
    descKey: "servicesList.cuppingTherapyDesc",
  },
  {
    image: treatment4,
    titleKey: "servicesList.sportsRehabTitle",
    descKey: "servicesList.sportsRehabDesc",
  },
  {
    image: treatment5,
    titleKey: "servicesList.exerciseTherapyTitle",
    descKey: "servicesList.exerciseTherapyDesc",
  },
  {
    image: treatment1,
    titleKey: "servicesList.manualTherapyTitle",
    descKey: "servicesList.manualTherapyDesc",
  },
  {
    image: treatment7,
    titleKey: "servicesList.iastmTherapyTitle",
    descKey: "servicesList.iastmTherapyDesc",
  },
];

const TreatmentSlider = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 py-8 sm:py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-10"
        >
          <p className="text-teal-600 uppercase tracking-widest sm:tracking-widest font-semibold text-xs sm:text-sm">
            {t("treatmentSlider.badge")}
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 text-slate-900 leading-tight">
            {t("treatmentSlider.title")}
          </h2>

          <p className="text-gray-600 mt-2 sm:mt-4 max-w-3xl mx-auto text-xs sm:text-base leading-relaxed sm:leading-7">
            {t("treatmentSlider.subtitle")}
          </p>
        </motion.div>

        {/* Slider */}
        <div className="w-full max-w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
          {treatmentsData.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="
                      h-44
                      xs:h-52
                      sm:h-64
                      lg:h-72
                      w-full
                      object-cover
                      group-hover:scale-110
                      transition
                      duration-700
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>

                  <h3 className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-white text-base xs:text-lg sm:text-2xl font-bold">
                    {t(item.titleKey)}
                  </h3>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-gray-600 leading-relaxed sm:leading-7 text-xs sm:text-base line-clamp-3 sm:line-clamp-none">
                    {t(item.descKey)}
                  </p>

                  <a
                    href="/services"
                    className="
                      mt-3
                      sm:mt-5
                      inline-block
                      text-teal-600
                      font-semibold
                      hover:text-teal-800
                      transition
                      text-xs
                      sm:text-base
                    "
                  >
                    {t("treatmentSlider.learnMore")}
                  </a>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSlider;