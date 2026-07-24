import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import knee from "../../assets/images/kneepain.jpg";
import back from "../../assets/images/backpain.jpg";
import neck from "../../assets/images/neckpain.jpg";
import shoulder from "../../assets/images/shoulderpain.jpg";
import sciatica from "../../assets/images/sciaticapain.jpg";
import tennis from "../../assets/images/tenniselbow.jpg";
import frozen from "../../assets/images/frozenshoulder.jpg";
import osteo from "../../assets/images/Osteoarthritis.jpg";
import stroke from "../../assets/images/strokerehab.jpg";
import sports from "../../assets/images/sportsinjury.jpg";
import surgery from "../../assets/images/postsurgeryrehab.jpg";
import plantar from "../../assets/images/plantarfasciitis.jpg";

const images = [
  { image: knee, title: "Knee Pain" },
  { image: back, title: "Back Pain" },
  { image: neck, title: "Neck Pain" },
  { image: shoulder, title: "Shoulder Pain" },
  { image: sciatica, title: "Sciatica" },
  { image: tennis, title: "Tennis Elbow" },
  { image: frozen, title: "Frozen Shoulder" },
  { image: osteo, title: "Osteoarthritis" },
  { image: stroke, title: "Stroke Rehab" },
  { image: sports, title: "Sports Injury" },
  { image: surgery, title: "Post Surgery Rehab" },
  { image: plantar, title: "Plantar Fasciitis" },
];

// Duplicate the array for seamless looping
const sliderImages = [...images, ...images];

const ConditionSlider = () => {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return (
    <Swiper
      direction="vertical"
      slidesPerView={3}
      spaceBetween={20}
      loop={true}
      speed={8000}
      allowTouchMove={!isMobile}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Autoplay]}
      className="h-[930px]"
      style={{ touchAction: "pan-y" }}
    >
      {sliderImages.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[290px] rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <h3 className="absolute bottom-6 left-6 text-white text-3xl font-bold">
              {item.title}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ConditionSlider;
