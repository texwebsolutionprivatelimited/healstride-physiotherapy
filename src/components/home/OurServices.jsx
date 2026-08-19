import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import {
  FaHandsHelping,
  FaRunning,
  FaDumbbell,
  FaBolt,
  FaHeartbeat,
} from "react-icons/fa";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const iconMap = {
  activity: FaHeartbeat,
  heart: FaHeartbeat,
  dumbbell: FaDumbbell,
  running: FaRunning,
  hands: FaHandsHelping,
  bolt: FaBolt,
};

const OurServices = () => {
  const { t } = useTranslation();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "services")
        );

        const serviceData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (service) =>
              service.active === true &&
              service.showOnHome === true
          );

        setServices(serviceData);
      } catch (error) {
        console.error(
          "Failed to fetch home services:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="py-6 sm:py-8 lg:py-10 bg-gradient-to-b from-white to-teal-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="uppercase tracking-[3px] sm:tracking-[6px] text-teal-600 font-semibold text-xs sm:text-sm">
            {t("ourServices.badge")}
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mt-2 sm:mt-4 text-slate-900 leading-tight">
            {t("ourServices.title")}
          </h2>

          <div className="w-16 sm:w-24 h-1 bg-teal-600 rounded-full mx-auto mt-3 sm:mt-6 mb-3 sm:mb-6"></div>

          <p className="text-gray-600 max-w-3xl mx-auto text-xs sm:text-base lg:text-lg leading-relaxed sm:leading-8">
            {t("ourServices.subtitle")}
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading services...
          </div>
        )}

        {/* No services */}
        {!loading && services.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No services available.
          </div>
        )}

        {/* Cards */}
        {!loading && services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {services.map((service) => {
              const Icon =
                iconMap[service.icon] || FaHeartbeat;

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="
                    group
                    h-full
                    flex
                    flex-col
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    border
                    border-slate-100
                    shadow-sm
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 sm:h-52 w-full flex-shrink-0">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

                    {/* Icon Badge */}
                    <div
                      className="
                        absolute
                        top-3.5
                        left-3.5
                        bg-teal-600
                        text-white
                        w-10
                        h-10
                        sm:w-12
                        sm:h-12
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-lg
                        sm:text-xl
                        shadow-md
                      "
                    >
                      <Icon />
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        absolute
                        bottom-3.5
                        left-4
                        right-4
                        text-white
                        text-lg
                        sm:text-xl
                        font-bold
                        truncate
                        drop-shadow-sm
                      "
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <p
                      className="
                        text-slate-600
                        text-xs
                        sm:text-sm
                        leading-relaxed
                        line-clamp-3
                      "
                    >
                      {service.description}
                    </p>

                    <div className="mt-auto pt-4">
                      <Link
                        to={`/services/${service.slug}`}
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-teal-600
                          font-semibold
                          hover:text-teal-700
                          transition-colors
                          text-xs
                          sm:text-sm
                          group/link
                        "
                      >
                        <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">
                          {t("ourServices.learnMore")}
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OurServices;