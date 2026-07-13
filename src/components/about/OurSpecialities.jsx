import { motion } from "framer-motion";
import {
  Activity,
  Bone,
  Dumbbell,
  Brain,
  HeartPulse,
  ShieldPlus,
} from "lucide-react";

const specialities = [
  {
    icon: Bone,
    title: "Back & Neck Pain",
    description:
      "Effective treatment for chronic back pain, neck stiffness, and posture-related issues.",
  },
  {
    icon: Dumbbell,
    title: "Sports Injury Rehab",
    description:
      "Recovery programs designed for athletes and active individuals to regain strength and mobility.",
  },
  {
    icon: Activity,
    title: "Post Surgery Rehabilitation",
    description:
      "Personalized physiotherapy plans to accelerate recovery after surgeries and injuries.",
  },
  {
    icon: HeartPulse,
    title: "Arthritis Management",
    description:
      "Pain management and mobility improvement programs for arthritis and joint conditions.",
  },
  {
    icon: Brain,
    title: "Neurological Physiotherapy",
    description:
      "Specialized care for stroke, Parkinson’s disease, and neurological disorders.",
  },
  {
    icon: ShieldPlus,
    title: "Pain Relief Therapy",
    description:
      "Advanced techniques including manual therapy, dry needling, and electrotherapy.",
  },
];

const OurSpecialities = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Our Expertise
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            Our Specialities
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
            Comprehensive physiotherapy solutions designed to relieve pain,
            restore movement, and improve your overall quality of life.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {specialities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
                <item.icon
                  size={30}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default OurSpecialities;