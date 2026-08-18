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
    <section className="py-10 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center uppercase tracking-wider text-teal-600 font-semibold text-xs sm:text-sm"
        >
          {t("testimonials.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-slate-900 mt-2 leading-tight"
        >
          {t("testimonials.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-slate-600 mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed"
        >
          {t("testimonials.subtitle")}
        </motion.p>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 sm:mt-12 max-w-4xl mx-auto"
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
              className="pb-12"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10 text-center sm:text-left">
                    <FaQuoteLeft className="text-teal-600 text-3xl sm:text-4xl mb-4 mx-auto sm:mx-0 opacity-80" />

                    <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed italic">
                      "{item.review}"
                    </p>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start mt-6 text-center sm:text-left">
                      <img
                        src={item.image || defaultUser}
                        alt={item.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm border-2 border-teal-100"
                        onError={(e) => {
                          e.target.src = defaultUser;
                        }}
                      />

                      <div className="sm:ml-4 mt-3 sm:mt-0">
                        <h4 className="font-bold text-base sm:text-lg text-slate-900">
                          {item.name}
                        </h4>

                        <p className="text-slate-500 text-xs sm:text-sm">
                          {item.designation}
                        </p>

                        <div className="flex justify-center sm:justify-start text-amber-400 mt-1.5 gap-1 text-xs sm:text-sm">
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
            <div className="text-center text-slate-500 py-10 sm:py-16 text-xs sm:text-base">
              {t("testimonials.noTestimonials")}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;