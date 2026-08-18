import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaUsers,
  FaStar,
  FaCalendarAlt,
  FaHeartbeat,
} from "react-icons/fa";

const statsData = [
  {
    icon: <FaUsers size={26} />,
    number: "5000+",
    titleKey: "googleRating.statHappyPatients",
  },
  {
    icon: <FaCalendarAlt size={26} />,
    number: "8+",
    titleKey: "googleRating.statYearsExperience",
  },
  {
    icon: <FaStar size={26} />,
    number: "4.9",
    titleKey: "googleRating.statGoogleRating",
  },
  {
    icon: <FaHeartbeat size={26} />,
    number: "10000+",
    titleKey: "googleRating.statSuccessfulTreatments",
  },
];

const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const numericTarget = parseFloat(value.replace(/[^0-9.]/g, ""));
    const hasPlus = value.includes("+");
    const isDecimal = value.includes(".");

    if (isNaN(numericTarget)) {
      setDisplayValue(value);
      return;
    }

    let current = 0;
    const duration = 1200;
    const steps = 30;
    const increment = numericTarget / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setDisplayValue(
          isDecimal
            ? numericTarget.toFixed(1) + (hasPlus ? "+" : "")
            : Math.floor(numericTarget) + (hasPlus ? "+" : "")
        );
        clearInterval(timer);
      } else {
        setDisplayValue(
          isDecimal
            ? current.toFixed(1) + (hasPlus ? "+" : "")
            : Math.floor(current) + (hasPlus ? "+" : "")
        );
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const GoogleRating = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-10 sm:py-16 lg:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-teal-600 font-semibold uppercase tracking-wider text-xs sm:text-sm">
            {t("googleRating.badge")}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-slate-900 leading-tight">
            {t("googleRating.title")}
          </h2>

          <p className="mt-2.5 sm:mt-3 text-slate-600 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed">
            {t("googleRating.subtitle")}
          </p>
        </motion.div>

        {/* Equal Height Grid Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {statsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="
                bg-white
                rounded-2xl
                p-5
                sm:p-6
                lg:p-8
                border
                border-slate-100
                shadow-sm
                hover:shadow-md
                hover:border-teal-200
                transition-all
                duration-300
                flex
                flex-col
                items-center
                justify-center
                text-center
                h-full
                min-h-[160px]
                sm:min-h-[190px]
              "
            >
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                {item.icon}
              </div>

              {/* Stat Number */}
              <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                <AnimatedCounter value={item.number} />
              </h3>

              {/* Stat Label */}
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-600 leading-snug">
                {t(item.titleKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleRating;