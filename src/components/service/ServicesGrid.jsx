import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firebase";


const ServicesGrid = () => {

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
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >

          <h2 className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
            text-slate-900
          ">
            Advanced Physiotherapy Services
          </h2>


          <p className="
            text-gray-600
            mt-4
            text-sm
            sm:text-base
            md:text-lg
            max-w-3xl
            mx-auto
            leading-7
          ">
            HealStride offers evidence-based physiotherapy
            treatments designed to reduce pain, restore
            movement, and improve your quality of life.
          </p>

        </motion.div>


        {/* No Services */}
        {services.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No services available.
          </div>
        )}


        {/* Cards */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
          sm:gap-6
          lg:gap-8
        ">

          {services.map((service, index) => (

            <motion.div
              key={service.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="
                bg-white
                rounded-xl
                sm:rounded-2xl
                shadow-md
                overflow-hidden
                hover:shadow-xl
                transition
              "
            >

              {/* Image */}
              <div className="
                overflow-hidden
                h-48
                sm:h-52
                md:h-56
              ">

                <motion.img
                  src={service.imageUrl}
                  alt={service.title}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              </div>


              {/* Content */}
              <div className="
                p-4
                sm:p-6
              ">

                {/* Title */}
                <h3 className="
                  text-lg
                  sm:text-xl
                  font-bold
                  text-slate-900
                ">
                  {service.title}
                </h3>


                {/* Description */}
                <p className="
                  text-gray-600
                  mt-3
                  text-sm
                  sm:text-base
                  leading-7
                ">
                  {service.description}
                </p>


                {/* Benefits */}
                {service.benefits?.length > 0 && (
                  <div className="mt-4">

                    <h4 className="font-semibold">
                      Benefits
                    </h4>

                    <ul className="
                      text-sm
                      text-gray-600
                      mt-2
                      space-y-1
                    ">

                      {service.benefits.map(
                        (benefit, i) => (
                          <li key={i}>
                            ✓ {benefit}
                          </li>
                        )
                      )}

                    </ul>

                  </div>
                )}


                {/* Duration */}
                {service.duration && (
                  <p className="mt-4 text-sm">
                    <b>Duration:</b>{" "}
                    {service.duration}
                  </p>
                )}


                {/* Appointment */}
                <Link
                  to="/booking"
                  className="
                    inline-block
                    mt-5
                    text-teal-600
                    font-semibold
                    text-sm
                    sm:text-base
                    hover:text-teal-800
                    transition
                  "
                >
                  Book Appointment →
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};


export default ServicesGrid;