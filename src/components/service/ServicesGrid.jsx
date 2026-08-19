import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ServicesGrid = () => {
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
            (service) => service.active === true
          );

        setServices(serviceData);
      } catch (error) {
        console.error(
          "Failed to fetch services:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="text-center text-gray-500">
          Loading services...
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-slate-50 border-b border-slate-100 min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            {t("servicesGrid.pageTitle")}
          </h2>

          <p className="text-slate-600 mt-2.5 sm:mt-3 text-xs sm:text-base leading-relaxed">
            {t("servicesGrid.pageSubtitle")}
          </p>
        </motion.div>

        {/* No Services */}
        {services.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No services available.
          </div>
        )}

        {/* Cards */}
        {services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="
                  group
                  bg-white
                  rounded-2xl
                  border
                  border-slate-100
                  shadow-sm
                  hover:shadow-xl
                  hover:border-teal-200
                  transition-all
                  duration-300
                  overflow-hidden
                  flex
                  flex-col
                  h-full
                "
              >
                {/* Image */}
                <div className="overflow-hidden h-48 sm:h-52 w-full flex-shrink-0">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mt-2 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  {service.benefits?.length > 0 && (
                    <div className="mt-3">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        {t("servicesGrid.benefits")}
                      </h4>

                      <ul className="text-xs sm:text-sm text-slate-600 mt-1 space-y-1">
                        {service.benefits.map(
                          (benefit, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="text-teal-600 font-bold">✓</span> {benefit}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Duration */}
                  {service.duration && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600">
                      <span className="font-bold text-slate-900">{t("servicesGrid.duration")}:</span>{" "}
                      {service.duration}
                    </p>
                  )}

                  {/* Appointment */}
                  <div className="mt-auto pt-4">
                    <Link
                      to="/booking"
                      className="
                        inline-flex
                        items-center
                        gap-1
                        text-teal-600
                        font-semibold
                        text-xs
                        sm:text-sm
                        hover:text-teal-700
                        transition-colors
                      "
                    >
                      <span>{t("servicesGrid.bookNow")}</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;