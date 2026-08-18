import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import gallery1 from "../../assets/images/gallery/gallery1.jpg";
import gallery2 from "../../assets/images/gallery/gallery2.jpg";
import gallery3 from "../../assets/images/gallery/gallery3.jpg";
import gallery4 from "../../assets/images/gallery/gallery4.jpg";
import gallery5 from "../../assets/images/gallery/gallery5.jpg";
import gallery6 from "../../assets/images/gallery/gallery6.jpg";

const GalleryPreview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-teal-600 uppercase tracking-wider font-semibold text-xs sm:text-sm">
            {t("galleryPreview.badge")}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-slate-900 leading-tight">
            {t("galleryPreview.title")}
          </h2>

          <p className="text-slate-600 mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed">
            {t("galleryPreview.subtitle")}
          </p>
        </motion.div>

        {/* Balanced Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Feature Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md h-[240px] sm:h-[320px] lg:h-[496px]"
          >
            <img
              src={gallery6}
              alt="HealStride Physiotherapy Clinic Facility"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
          </motion.div>

          {/* Middle Column Stack */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md h-[200px] sm:h-[236px]"
            >
              <img
                src={gallery2}
                alt="Targeted Dry Needling Therapy Session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md h-[200px] sm:h-[236px]"
            >
              <img
                src={gallery3}
                alt="Advanced Electrotherapy Equipment"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
            </motion.div>
          </div>

          {/* Right Column Stack */}
          <div className="flex flex-col gap-4 sm:gap-6 sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md h-[200px] sm:h-[236px]"
            >
              <img
                src={gallery4}
                alt="Patient Reception & Consultation Area"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md h-[200px] sm:h-[236px]"
            >
              <img
                src={gallery5}
                alt="Guided Rehabilitation & Exercise Area"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
            </motion.div>
          </div>
        </div>

        {/* View Complete Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-8 sm:mt-12"
        >
          <Link
            to="/gallery"
            className="
              group
              bg-teal-600
              hover:bg-teal-700
              active:bg-teal-800
              text-white
              font-semibold
              px-6
              py-3.5
              rounded-xl
              inline-flex
              items-center
              gap-2.5
              shadow-md
              hover:shadow-lg
              focus:outline-none
              focus:ring-2
              focus:ring-teal-500
              focus:ring-offset-2
              transition-all
              duration-200
              text-xs
              xs:text-sm
              sm:text-base
            "
          >
            <span>{t("galleryPreview.viewCompleteGallery")}</span>
            <FaArrowRight className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;