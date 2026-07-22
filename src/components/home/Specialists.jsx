import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Specialists = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const q = query(
          collection(db, "doctors"),
          where("active", "==", true)
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Home page only 3 doctors
        setDoctors(data.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center uppercase tracking-[3px] sm:tracking-[5px] text-teal-600 font-semibold text-xs sm:text-sm"
        >
          OUR SPECIALISTS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4"
        >
          Meet Our Expert Physiotherapists
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base"
        >
          Our experienced specialists provide personalized physiotherapy
          treatments.
        </motion.p>

        {/* Doctors Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 sm:mt-16">

          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -10 }}
              className="
                bg-white
                rounded-3xl
                shadow-lg
                overflow-hidden
                border
                border-gray-100
                hover:shadow-2xl
                transition-all
                duration-300
              "
            >

              <img
                src={doctor.image || "/default-user.png"}
                alt={doctor.name}
                className="
                  w-full
                  h-[280px]
                  sm:h-[340px]
                  lg:h-[380px]
                  object-cover
                "
              />

              <div className="p-5 sm:p-8">

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {doctor.name}
                </h3>

                <p className="text-teal-600 font-semibold mt-2 text-sm sm:text-base">
                  {doctor.role}
                </p>

                <div className="mt-5 space-y-3 text-gray-600 text-sm sm:text-base">

                  <p className="flex gap-3 items-center">
                    <FaAward className="text-teal-600 flex-shrink-0" />
                    {doctor.experience}
                  </p>

                  <p className="flex gap-3 items-center">
                    <FaAward className="text-teal-600 flex-shrink-0" />
                    {doctor.specialization}
                  </p>

                </div>

                <Link
                  to={`/doctors/${doctor.slug}`}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    text-teal-600
                    font-semibold
                    hover:text-teal-700
                    transition
                  "
                >
                  View Profile
                  <FaArrowRight />
                </Link>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Button */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10 sm:mt-12"
        >
          <Link
            to="/doctors"
            className="
              inline-flex
              items-center
              justify-center
              bg-teal-600
              hover:bg-teal-700
              text-white
              px-6 sm:px-8
              py-3
              rounded-xl
              transition
              font-medium
            "
          >
            View All Doctors
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Specialists;