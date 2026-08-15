import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import heroBg from "../../assets/images/hero-bg.jpg";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      className="
      relative
      min-h-0
      sm:min-h-[70vh]
      lg:min-h-[85vh]
      overflow-hidden
      "
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-teal-950/80 via-teal-900/50 to-transparent" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Content */}
      <div
        className="
        relative z-10
        flex items-center justify-center
        min-h-0
        sm:min-h-[70vh]
        lg:min-h-[85vh]
        px-4
        sm:px-6
        lg:px-8
        py-8
        xs:py-10
        sm:py-14
        lg:py-16
        "
      >
        <motion.div
          className="
          w-full
          max-w-6xl
          mx-auto
          text-center
          "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Clinic Name */}
          <p
            className="
            text-teal-200
            font-extrabold

            text-xl
            xs:text-2xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl

            leading-tight
            mb-2
            sm:mb-4
            "
          >
            HealStride Physiotherapy &<br className="hidden xs:inline" /> Wellness Centre
          </p>

          {/* Tagline */}
          <h1
            className="
            text-white
            font-bold

            text-sm
            xs:text-base
            sm:text-xl
            md:text-3xl
            lg:text-4xl

            leading-snug
            sm:leading-tight
            "
          >
            {t("hero.titleLine1")} {t("hero.titleLine2")}
          </h1>

          {/* Description */}
          <p
            className="
            mt-2.5
            sm:mt-4

            text-gray-200

            text-xs
            xs:text-sm
            sm:text-base
            md:text-lg

            leading-relaxed
            sm:leading-7

            max-w-3xl
            mx-auto

            px-1
            sm:px-4
            "
          >
            {t("hero.subtitle")}
          </p>

          {/* Buttons */}
          <motion.div
            className="
            mt-5
            sm:mt-7

            flex
            flex-col
            sm:flex-row

            gap-2.5
            sm:gap-4
            justify-center
            items-center

            w-full
            mx-auto
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/booking"
              className="
              w-full
              sm:w-auto

              sm:min-w-[190px]

              bg-teal-600
              hover:bg-teal-700

              text-white
              font-medium
              text-xs
              xs:text-sm
              sm:text-base

              px-4
              py-2.5
              sm:px-6
              sm:py-3.5

              rounded-xl

              flex
              items-center
              justify-center
              gap-2
              sm:gap-3

              shadow-lg
              transition-all
              "
            >
              <FaCalendarCheck className="text-xs sm:text-base" />
              {t("hero.bookAppointment")}
            </Link>

            <a
              href="tel:+919569274008"
              className="
              w-full
              sm:w-auto

              sm:min-w-[190px]

              border
              border-white/80

              bg-white/10
              backdrop-blur-md

              text-white
              font-medium
              text-xs
              xs:text-sm
              sm:text-base

              px-4
              py-2.5
              sm:px-6
              sm:py-3.5

              rounded-xl

              flex
              items-center
              justify-center
              gap-2
              sm:gap-3

              hover:bg-white/20
              transition-all
              "
            >
              <FaPhoneAlt className="text-xs sm:text-base" />
              {t("contactInfo.phone")}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;