import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Wrench } from "lucide-react";

const Services = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://geimshospital.com/wp-content/uploads/2025/03/Physiotherapy-img.jpg')",
      }}
    >
      {/* Overlay */}
     <div className="absolute inset-0 bg-white/75"></div>

      {/* Content */}
      <div className="relative z-10">
        <section className="py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900">
                Our Services
              </h1>

              <p className="mt-5 text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
                Explore our physiotherapy treatments and advanced rehabilitation tools.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Physiotherapy Services */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to="/services/physiotherapy"
                  className="group block bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:border-teal-500 transition-all duration-300 hover:-translate-y-2"
                >
                  <Activity className="w-12 h-12 text-teal-600 mb-5" />

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Physiotherapy Services
                  </h3>

                  <p className="text-gray-600 leading-7">
                    Explore rehabilitation programs, pain management treatments,
                    sports injury recovery, and specialized physiotherapy services.
                  </p>

                  <span className="inline-block mt-5 text-teal-600 font-semibold">
                    View Services →
                  </span>
                </Link>
              </motion.div>

              {/* Tools & Equipment */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to="/services/tools-equipment"
                  className="group block bg-white/95 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:border-teal-500 transition-all duration-300 hover:-translate-y-2"
                >
                  <Wrench className="w-12 h-12 text-teal-600 mb-5" />

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Tools & Equipment
                  </h3>

                  <p className="text-gray-600 leading-7">
                    Discover advanced physiotherapy equipment and treatment tools
                    used for faster recovery and effective rehabilitation.
                  </p>

                  <span className="inline-block mt-5 text-teal-600 font-semibold">
                    View Equipment →
                  </span>
                </Link>
              </motion.div>

            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;