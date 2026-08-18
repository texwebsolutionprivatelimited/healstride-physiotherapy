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
    <section className="py-10 sm:py-16 lg:py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center uppercase tracking-wider text-teal-600 font-semibold text-xs sm:text-sm"
        >
          {t("specialists.badge")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 leading-tight"
        >
          {t("specialists.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-slate-600 mt-2.5 sm:mt-3 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed"
        >
          {t("specialists.subtitle")}
        </motion.p>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8 sm:mt-12 items-stretch">
          {doctors.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 py-10">
              No doctors available.
            </div>
          ) : (
            doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -4 }}
                className="
                  group
                  h-full
                  flex
                  flex-col
                  bg-white
                  rounded-2xl
                  shadow-sm
                  border
                  border-slate-100
                  hover:shadow-xl
                  hover:border-teal-200
                  transition-all
                  duration-300
                  overflow-hidden
                "
              >
                {/* Doctor Image */}
                <div className="relative overflow-hidden h-[260px] sm:h-[300px] w-full flex-shrink-0">
                  <img
                    src={doctor.image || "/default-user.png"}
                    alt={doctor.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                  />
                </div>

                {/* Doctor Details */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="text-teal-600 font-semibold mt-1 text-xs sm:text-sm">
                    {doctor.role}
                  </p>

                  <div className="mt-3 space-y-2 text-slate-600 text-xs sm:text-sm">
                    <p className="flex gap-2 items-center">
                      <FaAward className="text-teal-600 flex-shrink-0" />
                      {doctor.experience}
                    </p>

                    <p className="flex gap-2 items-center">
                      <FaAward className="text-teal-600 flex-shrink-0" />
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="mt-auto pt-4">
                    <Link
                      to={`/doctors/${doctor.slug}`}
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
                      "
                    >
                      <span>{t("specialists.viewProfile")}</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
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