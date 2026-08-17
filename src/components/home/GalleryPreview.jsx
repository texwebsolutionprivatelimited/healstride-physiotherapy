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
    <section className="py-8 sm:py-12 lg:py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-teal-600 uppercase tracking-[3px] sm:tracking-[5px] font-semibold text-xs sm:text-sm"
        >
          {t("galleryPreview.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mt-2 sm:mt-4 leading-tight"
        >
          {t("galleryPreview.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 mt-2 sm:mt-4 max-w-3xl mx-auto leading-relaxed md:leading-8 text-xs sm:text-base"
        >
          {t("galleryPreview.subtitle")}
        </motion.p>

        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 md:mt-12">
          {/* Left Large */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg group h-[220px] xs:h-[280px] sm:h-[360px] lg:h-[500px]"
          >
            <img
              src={gallery6}
              alt="Clinic"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700"
            />
          </motion.div>

          {/* Middle */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg group h-[180px] xs:h-[200px] sm:h-[240px]"
            >
              <img
                src={gallery2}
                alt="Treatment"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg group h-[180px] xs:h-[200px] sm:h-[240px]"
            >
              <img
                src={gallery3}
                alt="Equipment"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700"
              />
            </motion.div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 sm:gap-6 sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg group h-[180px] xs:h-[200px] sm:h-[240px]"
            >
              <img
                src={gallery4}
                alt="Reception"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg group h-[180px] xs:h-[200px] sm:h-[240px]"
            >
              <img
                src={gallery5}
                alt="Exercise"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700"
              />
            </motion.div>
          </div>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-8 sm:mt-12 md:mt-16"
        >
          <Link
            to="/gallery"
            className="
              bg-teal-600
              hover:bg-teal-700
              transition
              text-white
              px-5 sm:px-8
              py-3 sm:py-4
              rounded-xl
              flex
              items-center
              gap-2.5 sm:gap-3
              shadow-lg
              font-medium
              text-xs xs:text-sm sm:text-base
            "
          >
            {t("galleryPreview.viewCompleteGallery")}
            <FaArrowRight className="text-xs sm:text-sm" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;