import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Our Purpose
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
            Mission & Vision
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Driven by excellence, compassion, and innovation in
            physiotherapy and rehabilitation care.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Target
                size={32}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              Our Mission
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              To provide personalized physiotherapy care
              through modern treatment techniques,
              evidence-based rehabilitation, and
              compassionate patient support that helps
              individuals recover faster and live healthier lives.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-green-100"
          >
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
              <Eye
                size={32}
                className="text-green-600"
              />
            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              Our Vision
            </h3>

            <p className="mt-5 text-gray-600 leading-8">
              To become the most trusted physiotherapy and
              wellness center, empowering people to achieve
              pain-free movement, improved mobility, and
              a better quality of life through world-class care.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default MissionVision;