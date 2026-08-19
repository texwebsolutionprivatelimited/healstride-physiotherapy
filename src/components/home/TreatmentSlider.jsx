import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <section className="bg-slate-50 py-6 sm:py-8 lg:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
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
            spaceBetween={16}
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
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="pb-4"
          >
            {treatmentsData.map((item, index) => (
              <SwiperSlide key={index} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -3 }}
                  className="
                    group
                    h-full
                    flex
                    flex-col
                    bg-white
                    rounded-[16px]
                    p-4
                    border
                    border-slate-100
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-250
                  "
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-xl w-full flex-shrink-0 aspect-[16/10]">
                    <img
                      src={item.image}
                      alt={t(item.titleKey)}
                      className="
                        w-full
                        h-full
                        object-cover
                        object-center
                        group-hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 mt-3">
                    {/* Treatment Name */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 leading-snug">
                      {t(item.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-3">
                      {t(item.descKey)}
                    </p>

                    {/* Learn More Link */}
                    <div className="mt-auto pt-1">
                      <Link
                        to="/services"
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-teal-600
                          font-semibold
                          hover:text-teal-700
                          transition-colors
                          text-sm
                          group/link
                        "
                      >
                        <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">
                          {t("treatmentSlider.learnMore")}
                        </span>
                      </Link>
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