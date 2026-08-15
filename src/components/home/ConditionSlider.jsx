import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
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

const imagesData = [
  { image: knee, titleKey: "conditionsList.kneePain" },
  { image: back, titleKey: "conditionsList.backPain" },
  { image: neck, titleKey: "conditionsList.neckPain" },
  { image: shoulder, titleKey: "conditionsList.shoulderPain" },
  { image: sciatica, titleKey: "conditionsList.sciatica" },
  { image: tennis, titleKey: "conditionsList.tennisElbow" },
  { image: frozen, titleKey: "conditionsList.frozenShoulder" },
  { image: osteo, titleKey: "conditionsList.osteoarthritis" },
  { image: stroke, titleKey: "conditionsList.strokeRehab" },
  { image: sports, titleKey: "conditionsList.sportsInjury" },
  { image: surgery, titleKey: "conditionsList.postSurgeryRehab" },
  { image: plantar, titleKey: "conditionsList.plantarFasciitis" },
];

const sliderImages = [...imagesData, ...imagesData];

const ConditionSlider = () => {
  const { t } = useTranslation();

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
              alt={t(item.titleKey)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <h3 className="absolute bottom-6 left-6 text-white text-3xl font-bold">
              {t(item.titleKey)}
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ConditionSlider;
