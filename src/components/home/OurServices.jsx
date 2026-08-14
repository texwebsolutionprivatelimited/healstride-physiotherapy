import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      className="py-14 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-teal-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <p className="uppercase tracking-[3px] sm:tracking-[6px] text-teal-600 font-semibold text-xs sm:text-sm">
            OUR SERVICES
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 text-slate-900 leading-tight">
            Advanced Physiotherapy Services
          </h2>

          <div className="w-16 sm:w-24 h-1 bg-teal-600 rounded-full mx-auto mt-4 sm:mt-6 mb-4 sm:mb-6"></div>

          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-7 sm:leading-8">
            HealStride offers evidence-based physiotherapy treatments
            designed to reduce pain, restore movement, and improve your
            quality of life.
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service) => {

              const Icon =
                iconMap[service.icon] || FaHeartbeat;

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="
                    bg-white
                    rounded-2xl
                    sm:rounded-3xl
                    overflow-hidden
                    shadow-lg
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >

                  {/* Image */}
                  <div className="relative overflow-hidden h-52 sm:h-60">

                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        hover:scale-110
                        transition-transform
                        duration-500
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>


                    {/* Icon */}
                    <div className="
                      absolute
                      top-4
                      left-4
                      bg-teal-600
                      text-white
                      w-10
                      h-10
                      sm:w-14
                      sm:h-14
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-lg
                      sm:text-2xl
                      shadow-lg
                    ">
                      <Icon />
                    </div>


                    {/* Title */}
                    <h3 className="
                      absolute
                      bottom-4
                      left-4
                      text-white
                      text-lg
                      sm:text-xl
                      lg:text-2xl
                      font-bold
                    ">
                      {service.title}
                    </h3>

                  </div>


                  {/* Content */}
                  <div className="p-5 sm:p-6">

                    <p className="
                      text-gray-600
                      text-sm
                      sm:text-base
                      leading-6
                      sm:leading-7
                    ">
                      {service.description}
                    </p>


                    <Link
                      to={`/services/${service.slug}`}
                      className="
                        mt-5
                        inline-block
                        text-teal-600
                        font-semibold
                        hover:text-teal-800
                        transition
                      "
                    >
                      Learn More →
                    </Link>

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