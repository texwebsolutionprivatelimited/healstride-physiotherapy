import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
} from "swiper/modules";

import "swiper/css";

import treatment1 from "../../assets/images/treatment1.jpg";
import treatment2 from "../../assets/images/treatment2.jpg";
import treatment3 from "../../assets/images/treatment3.jpg";
import treatment4 from "../../assets/images/treatment4.jpg";
import treatment5 from "../../assets/images/treatment5.jpg";
import treatment6 from "../../assets/images/treatment6.jpg";
import treatment7 from "../../assets/images/treatment7.jpg";

const treatments = [
  {
    image: treatment2,
    title: "Dry Needling",
    description: "Relieves muscle tension and trigger points.",
  },
  {
    image: treatment3,
    title: "Cupping Therapy",
    description: "Improves circulation and reduces pain.",
  },
  {
    image: treatment4,
    title: "Sports Rehabilitation",
    description: "Helping athletes recover faster.",
  },
  {
    image: treatment5,
    title: "Exercise Therapy",
    description: "Improve mobility and strength.",
  },
  {
    image: treatment1,
    title: "Manual Therapy",
    description: "Hands-on treatment for better movement.",
  },
  {
    image: treatment7,
    title: "IASTM Therapy",
    description: "Modern soft tissue rehabilitation.",
  },
];

const TreatmentSlider = () => {
  return (
    <section className="bg-slate-50 py-20">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">

          <p className="text-teal-600 uppercase tracking-widest font-semibold">

            Specialized Care

          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-900">

            Treatments We Offer

          </h2>

          <p className="text-gray-600 mt-4">

            Advanced physiotherapy treatments designed to relieve pain,
            restore movement and improve your quality of life.

          </p>

        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={3}
          loop={true}
          speed={4500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {treatments.map((item, index) => (
            <SwiperSlide key={index}>

              <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">

    <div className="relative overflow-hidden">

        <img
            src={item.image}
            alt={item.title}
            className="h-64 w-full object-cover group-hover:scale-110 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        <h3 className="absolute bottom-5 left-5 text-white text-2xl font-bold">

            {item.title}

        </h3>

    </div>

    <div className="p-6">

        <p className="text-gray-600 leading-7">

            {item.description}

        </p>

        <a
  href="/services"
  className="mt-5 inline-block text-teal-600 font-semibold hover:text-teal-800 transition"
>
  Learn More →
</a>

    </div>

</div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
};

export default TreatmentSlider;