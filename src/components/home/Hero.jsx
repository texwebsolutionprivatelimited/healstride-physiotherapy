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
        w-full
        min-h-[520px]
        sm:min-h-[600px]
        lg:min-h-[680px]
        flex
        items-center
        justify-center
        overflow-hidden
      "
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay: Reduced opacity for better image visibility while retaining strong text contrast */}
      <div className="absolute inset-0 bg-slate-950/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-teal-950/30" />

      {/* Content Container */}
      <div
        className="
          relative z-10
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-12
          sm:py-16
          lg:py-24
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <motion.div
          className="
            w-full
            max-w-4xl
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
              text-teal-300
              font-extrabold
              text-lg
              xs:text-xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              leading-tight
              mb-2
              sm:mb-3
              tracking-wide
              drop-shadow-sm
            "
          >
            {t("hero.clinicName")}
          </p>

          {/* Tagline / Main Heading */}
          <h1
            className="
              text-white
              font-bold
              text-xl
              xs:text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              leading-snug
              sm:leading-tight
              drop-shadow-md
              max-w-3xl
              mx-auto
            "
          >
            {t("hero.tagline")}
          </h1>

          {/* Description */}
          <p
            className="
              mt-3
              sm:mt-5
              text-slate-100
              text-xs
              xs:text-sm
              sm:text-base
              md:text-lg
              leading-relaxed
              sm:leading-7
              max-w-2xl
              mx-auto
              px-2
              drop-shadow-sm
            "
          >
            {t("hero.description")}
          </p>

          {/* Buttons: Equal Height & Aligned */}
          <motion.div
            className="
              mt-6
              sm:mt-8
              flex
              flex-col
              sm:flex-row
              gap-3
              sm:gap-4
              justify-center
              items-center
              w-full
              sm:w-auto
              mx-auto
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Book Appointment (Primary CTA) */}
            <Link
              to="/booking"
              className="
                w-full
                sm:w-auto
                sm:min-w-[200px]
                h-12
                sm:h-14
                bg-teal-600
                hover:bg-teal-700
                active:bg-teal-800
                text-white
                font-semibold
                text-sm
                sm:text-base
                px-6
                rounded-xl
                flex
                items-center
                justify-center
                gap-2.5
                shadow-lg
                hover:shadow-teal-900/30
                transition-all
                duration-200
              "
            >
              <FaCalendarCheck className="text-base flex-shrink-0" />
              <span>{t("hero.bookAppointment")}</span>
            </Link>

            {/* Call Now (Secondary CTA) */}
            <a
              href="tel:+91XXXXXXXXXX"
              className="
                w-full
                sm:w-auto
                sm:min-w-[200px]
                h-12
                sm:h-14
                border
                border-white/70
                bg-white/15
                hover:bg-white/25
                backdrop-blur-md
                text-white
                font-semibold
                text-sm
                sm:text-base
                px-6
                rounded-xl
                flex
                items-center
                justify-center
                gap-2.5
                shadow-md
                transition-all
                duration-200
              "
            >
              <FaPhoneAlt className="text-sm flex-shrink-0" />
              <span>{t("hero.callNow")}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;