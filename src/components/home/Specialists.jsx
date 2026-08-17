import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

const Specialists = ({ limit = 3 }) => {
  const { t } = useTranslation();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const showViewAllButton = doctors.length > limit;

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

        // Show only first "limit" doctors
        setDoctors(limit ? data.slice(0, limit) : data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [limit]);

  if (loading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-700">
            Loading Specialists...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center uppercase tracking-[3px] sm:tracking-[5px] text-teal-600 font-semibold text-xs sm:text-sm"
        >
          {t("specialists.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900 mt-2 sm:mt-4 leading-tight"
        >
          {t("specialists.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-gray-600 mt-2 sm:mt-4 max-w-3xl mx-auto text-xs sm:text-base leading-relaxed sm:leading-normal"
        >
          {t("specialists.subtitle")}
        </motion.p>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mt-6 sm:mt-12">
          {doctors.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No doctors available.
            </div>
          ) : (
            doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="
                  bg-white
                  rounded-2xl
                  sm:rounded-3xl
                  shadow-md
                  sm:shadow-lg
                  overflow-hidden
                  border
                  border-gray-100
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >
                {/* Doctor Image */}
                <img
                  src={doctor.image || "/default-user.png"}
                  alt={doctor.name}
                  className="
                    w-full
                    h-[220px]
                    xs:h-[260px]
                    sm:h-[320px]
                    lg:h-[380px]
                    object-cover
                  "
                />

                {/* Doctor Details */}
                <div className="p-4 xs:p-5 sm:p-8">
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="text-teal-600 font-semibold mt-1.5 sm:mt-2 text-xs xs:text-sm sm:text-base">
                    {doctor.role}
                  </p>

                  <div className="mt-3.5 sm:mt-5 space-y-2 sm:space-y-3 text-gray-600 text-xs sm:text-base">
                    <p className="flex gap-2.5 sm:gap-3 items-center">
                      <FaAward className="text-teal-600 flex-shrink-0" />
                      {doctor.experience}
                    </p>

                    <p className="flex gap-2.5 sm:gap-3 items-center">
                      <FaAward className="text-teal-600 flex-shrink-0" />
                      {doctor.specialization}
                    </p>
                  </div>

                  <Link
                    to={`/doctors/${doctor.slug}`}
                    className="
                      mt-4
                      sm:mt-6
                      inline-flex
                      items-center
                      gap-2
                      text-teal-600
                      font-semibold
                      hover:text-teal-700
                      transition
                      text-xs
                      sm:text-base
                    "
                  >
                    {t("specialists.viewProfile")}
                    <FaArrowRight className="text-xs sm:text-sm" />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* View All Doctors Button */}
        {showViewAllButton && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-8 sm:mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
                  px-5
                  sm:px-8
                  py-3
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                  shadow-lg
                  text-xs
                  xs:text-sm
                  sm:text-base
                "
              >
                {t("specialists.viewAllDoctors")}
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Specialists;