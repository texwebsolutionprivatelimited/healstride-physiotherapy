import { useEffect, useState } from "react";
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
        .filter((item) => item.active);

      setTestimonials(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">

        <p className="text-center uppercase tracking-[5px] text-teal-600 font-semibold">
          TESTIMONIALS
        </p>

        <h2 className="text-5xl font-bold text-center text-slate-900 mt-4">
          What Our Patients Say
        </h2>

        <p className="text-center text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
          Hear from our patients who have experienced better mobility,
          pain relief, and improved quality of life.
        </p>

        <div className="mt-16">

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

                  <div className="bg-white rounded-3xl shadow-xl p-10">

                    <FaQuoteLeft className="text-teal-500 text-5xl mb-6" />

                    <p className="text-gray-600 text-xl leading-9">
                      "{item.review}"
                    </p>

                    <div className="flex mt-8 items-center">

                      <img
                        src={defaultUser}
                        alt={item.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />

                      <div className="ml-5">

                        <h4 className="font-bold text-xl">
                          {item.name}
                        </h4>

                        <p className="text-gray-500">
                          {item.designation}
                        </p>

                        <div className="flex text-yellow-400 mt-2 gap-1">
                          {[...Array(item.rating)].map((_, index) => (
                            <FaStar key={index} />
                          ))}
                        </div>

                      </div>

                    </div>

                  </div>

                </SwiperSlide>

              ))}

            </Swiper>

          ) : (

            <div className="text-center text-gray-500 py-20">
              No testimonials available.
            </div>

          )}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;