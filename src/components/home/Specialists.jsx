import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Specialists = ({ limit = 3 }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-700">
            Loading Specialists...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="text-center uppercase tracking-[5px] text-teal-600 font-semibold"
>
  OUR SPECIALISTS
</motion.p>

        <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center text-4xl lg:text-5xl font-bold text-slate-900 mt-4"
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

<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-14 justify-items-center max-w-5xl mx-auto">
            {doctors.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No doctors available.
            </div>
          ) : (
            doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                className="w-full max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="text-teal-600 font-semibold mt-2 text-sm sm:text-base">
                    {doctor.role}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaAward className="text-teal-600" />
                      <span>{doctor.experience}</span>
                    </div>

                    <div className="flex items-start gap-3 text-gray-600">
                      <FaAward className="text-teal-600 mt-1" />
                      <span>{doctor.specialization}</span>
                    </div>
                  </div>

                  <Link
                    to={`/doctors/${doctor.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition"
                  >
                    View Profile
                    <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
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
            className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 rounded-xl transition font-medium"
          >
            View All Doctors
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Specialists;