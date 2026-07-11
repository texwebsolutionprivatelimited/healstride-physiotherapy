import { motion } from "framer-motion";

import {
  FaUsers,
  FaStar,
  FaCalendarAlt,
  FaHeartbeat,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers size={34} />,
    number: "5000+",
    title: "Happy Patients",
  },
  {
    icon: <FaCalendarAlt size={34} />,
    number: "8+",
    title: "Years Experience",
  },
  {
    icon: <FaStar size={34} />,
    number: "4.9",
    title: "Google Rating",
  },
  {
    icon: <FaHeartbeat size={34} />,
    number: "10000+",
    title: "Successful Treatments",
  },
];

const GoogleRating = () => {
  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="text-teal-600 font-semibold uppercase tracking-widest">

            Trusted by Thousands

          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-900">

            Why Patients Choose HealStride

          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">

            We combine advanced rehabilitation techniques,
            experienced physiotherapists and personalized treatment
            plans to help every patient recover faster.

          </p>

        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 50 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{

                duration: 0.6,

                delay: index * 0.15,

              }}

              viewport={{ once: true }}

              whileHover={{

                y: -10,

                scale: 1.04,

              }}

              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"

            >

              <div className="flex justify-center text-teal-600 mb-5">

                {item.icon}

              </div>

              <h3 className="text-4xl font-bold text-slate-900">

                {item.number}

              </h3>

              <p className="mt-3 text-gray-600">

                {item.title}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default GoogleRating;