import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { FaQuoteLeft, FaStar } from "react-icons/fa";

import patient1 from "../../assets/images/testimonials/patient1.jpg";
import patient2 from "../../assets/images/testimonials/patient2.jpg";
import patient3 from "../../assets/images/testimonials/patient3.jpg";
import patient4 from "../../assets/images/testimonials/patient4.jpg";
import patient5 from "../../assets/images/testimonials/patient5.jpg";

const testimonials = [
  {
    image: patient1,
    name: "Ravi Kumar",
    profession: "Software Engineer",
    review:
      "After suffering from shoulder pain for years, HealStride helped me regain full mobility. The therapists were knowledgeable and caring.",
  },
  {
    image: patient2,
    name: "Priya Sharma",
    profession: "Teacher",
    review:
      "The home physiotherapy service was excellent. Professional, punctual and extremely supportive throughout my recovery.",
  },
  {
    image: patient3,
    name: "Mohan Verma",
    profession: "Retired Banker",
    review:
      "Their post-surgery rehabilitation program helped me recover much faster than expected. Highly recommended.",
  },
  {
    image: patient4,
    name: "Sneha Reddy",
    profession: "Marketing Executive",
    review:
      "Dry needling therapy significantly reduced my neck pain. The clinic is clean and the staff is very friendly.",
  },
  {
    image: patient5,
    name: "Anil Gupta",
    profession: "Business Owner",
    review:
      "Excellent experience from consultation to treatment. Every session was personalized and effective.",
  },
];

const Testimonials = () => {
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

          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
          >

            {testimonials.map((item, index) => (

              <SwiperSlide key={index}>

                <div className="bg-white rounded-3xl shadow-xl p-10">

                  <FaQuoteLeft className="text-teal-500 text-5xl mb-6" />

                  <p className="text-gray-600 text-xl leading-9">
                    "{item.review}"
                  </p>

                  <div className="flex mt-8 items-center">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />

                    <div className="ml-5">

                      <h4 className="font-bold text-xl">
                        {item.name}
                      </h4>

                      <p className="text-gray-500">
                        {item.profession}
                      </p>

                      <div className="flex text-yellow-400 mt-2">

                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />

                      </div>

                    </div>

                  </div>

                </div>

              </SwiperSlide>

            ))}

          </Swiper>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;