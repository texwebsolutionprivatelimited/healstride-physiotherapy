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
    <section className="bg-slate-50 py-10 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-teal-600 uppercase tracking-wider font-semibold text-xs sm:text-sm">
            {t("treatmentSlider.badge")}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-slate-900 leading-tight">
            {t("treatmentSlider.title")}
          </h2>

          <p className="text-slate-600 mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed">
            {t("treatmentSlider.subtitle")}
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="w-full max-w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            loop={true}
            speed={700}
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
            className="pb-4"
          >
            {treatmentsData.map((item, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -4 }}
                  className="
                    group
                    h-full
                    flex
                    flex-col
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    border
                    border-slate-100
                    shadow-sm
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48 sm:h-52 w-full flex-shrink-0">
                    <img
                      src={item.image}
                      alt={t(item.titleKey)}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                    <h3 className="absolute bottom-3.5 left-4 right-4 text-white text-lg sm:text-xl font-bold drop-shadow-sm">
                      {t(item.titleKey)}
                    </h3>
                  </div>

                  {/* Content Container (Equal Height & Vertically Aligned Button) */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm line-clamp-3">
                      {t(item.descKey)}
                    </p>

                    <div className="mt-auto pt-4">
                      <a
                        href="/services"
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-teal-600
                          font-semibold
                          hover:text-teal-700
                          transition-colors
                          text-xs
                          sm:text-sm
                          group/link
                        "
                      >
                        <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">
                          {t("treatmentSlider.learnMore")}
                        </span>
                      </a>
                    </div>
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