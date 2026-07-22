import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FaQuoteLeft, FaStar } from "react-icons/fa";

import defaultUser from "../../assets/images/default-user.png";
import ReviewForm from "../../pages/ReviewForm";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

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
    <section className="py-12 sm:py-16 lg:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center uppercase tracking-[3px] sm:tracking-[5px] text-teal-600 font-semibold text-xs sm:text-sm"
        >
          TESTIMONIALS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-slate-900 mt-4"
        >
          What Our Patients Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 mt-4 sm:mt-5 max-w-3xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base"
        >
          Hear from our patients who have experienced better mobility,
          pain relief, and improved quality of life.
        </motion.p>

        {/* Testimonials Slider */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-10 sm:mt-16"
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
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-10">

                    <FaQuoteLeft className="text-teal-500 text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6" />

                    <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-9">
                      "{item.review}"
                    </p>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start mt-8 text-center sm:text-left">

                      <img
                        src={item.image || defaultUser}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = defaultUser;
                        }}
                      />

                      <div className="sm:ml-5 mt-4 sm:mt-0">

                        <h4 className="font-bold text-lg sm:text-xl">
                          {item.name}
                        </h4>

                        <p className="text-gray-500 text-sm sm:text-base">
                          {item.designation}
                        </p>

                        <div className="flex justify-center sm:justify-start text-yellow-400 mt-2 gap-1">
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
            <div className="text-center text-gray-500 py-12 sm:py-20">
              No testimonials available.
            </div>
          )}
        </motion.div>

      </div>

      <ReviewForm />
    </section>
  );
};

export default Testimonials;