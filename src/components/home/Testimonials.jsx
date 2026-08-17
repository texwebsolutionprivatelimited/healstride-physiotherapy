import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";

import { db } from "../../firebase/firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FaQuoteLeft, FaStar } from "react-icons/fa";

import defaultUser from "../../assets/images/default-user.png";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const q = query(collection(db, "testimonials"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (item) =>
            item.active === true &&
            item.status === "approved"
        );

      setTestimonials(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center uppercase tracking-[3px] sm:tracking-[5px] text-teal-600 font-semibold text-xs sm:text-sm"
        >
          {t("testimonials.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center text-slate-900 mt-2 sm:mt-4 leading-tight"
        >
          {t("testimonials.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 mt-2 sm:mt-5 max-w-3xl mx-auto leading-relaxed sm:leading-8 text-xs sm:text-base"
        >
          {t("testimonials.subtitle")}
        </motion.p>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-6 sm:mt-10"
        >
          {testimonials.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={testimonials.length > 1}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-xl p-4 xs:p-6 sm:p-8 lg:p-10 mb-8 sm:mb-0">
                    <FaQuoteLeft className="text-teal-500 text-2xl xs:text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-6" />

                    <p className="text-gray-600 text-xs xs:text-sm sm:text-lg lg:text-xl leading-relaxed sm:leading-8 lg:leading-9 italic">
                      "{item.review}"
                    </p>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start mt-5 sm:mt-8 text-center sm:text-left">
                      <img
                        src={item.image || defaultUser}
                        alt={item.name}
                        className="w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 rounded-full object-cover shadow-sm"
                        onError={(e) => {
                          e.target.src = defaultUser;
                        }}
                      />

                      <div className="sm:ml-5 mt-3 sm:mt-0">
                        <h4 className="font-bold text-base xs:text-lg sm:text-xl text-slate-900">
                          {item.name}
                        </h4>

                        <p className="text-gray-500 text-xs sm:text-base">
                          {item.designation}
                        </p>

                        <div className="flex justify-center sm:justify-start text-yellow-400 mt-1.5 sm:mt-2 gap-1 text-xs sm:text-base">
                          {[...Array(item.rating || 5)].map(
                            (_, index) => (
                              <FaStar key={index} />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-gray-500 py-10 sm:py-20 text-xs sm:text-base">
              {t("testimonials.noTestimonials")}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;