import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Wrench } from "lucide-react";

const Services = () => {
  return (
    <div
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        overflow-hidden
      "
      style={{
        backgroundImage: "url('/service-bg.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/85 to-teal-950/70" />

      {/* Decorative Blurs */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          top-20
          left-10
          w-40
          h-40
          bg-teal-400/20
          blur-3xl
          rounded-full
        "
      />

      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-20
          right-10
          w-48
          h-48
          bg-cyan-400/20
          blur-3xl
          rounded-full
        "
      />

      <div className="relative z-10">
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8 sm:mb-10"
            >
              <span
                className="
                  inline-block
                  px-5
                  py-2
                  rounded-full
                  bg-teal-500/20
                  border
                  border-teal-400/30
                  text-teal-300
                  text-sm
                  font-medium
                  mb-5
                  backdrop-blur-md
                "
              >
                Professional Physiotherapy Care
              </span>

              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-bold
                  bg-gradient-to-r
                  from-teal-300
                  via-cyan-300
                  to-teal-500
                  bg-clip-text
                  text-transparent
                "
              >
                Our Services
              </h1>

              <p
                className="
                  mt-5
                  text-gray-200
                  text-base
                  md:text-lg
                  max-w-2xl
                  mx-auto
                  leading-8
                "
              >
                Explore our physiotherapy treatments, rehabilitation
                programs, and advanced therapy equipment designed to
                help you recover faster and live pain-free.
              </p>
            </motion.div>

            {/* Cards */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-8
                max-w-6xl
                mx-auto
              "
            >

              {/* Physiotherapy Services */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <Link
                  to="/services/physiotherapy"
                  className="
                    group
                    block
                    bg-white/10
                    backdrop-blur-xl
                    rounded-3xl
                    overflow-hidden
                    border
                    border-white/20
                    shadow-xl
                    hover:border-teal-400
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >
                  <div className="overflow-hidden">
                    <img
                      src="/physiotherapy-bg.webp"
                      alt="Physiotherapy Services"
                      className="
                        w-full
                        h-48
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-500
                      "
                    />
                  </div>

                  <div className="p-6">
                    <Activity
                      className="
                        w-12
                        h-12
                        text-teal-400
                        mb-5
                      "
                    />

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                        mb-3
                      "
                    >
                      Physiotherapy Services
                    </h3>

                    <p className="text-gray-300 leading-7">
                      Explore rehabilitation programs, pain management
                      treatments, sports injury recovery, post-surgical
                      care, and specialized physiotherapy services.
                    </p>

                    <span
                      className="
                        inline-block
                        mt-5
                        text-teal-400
                        font-semibold
                        group-hover:translate-x-2
                        transition
                      "
                    >
                      View Services →
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Tools & Equipment */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <Link
                  to="/services/tools-equipment"
                  className="
                    group
                    block
                    bg-white/10
                    backdrop-blur-xl
                    rounded-3xl
                    overflow-hidden
                    border
                    border-white/20
                    shadow-xl
                    hover:border-teal-400
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >
                  <div className="overflow-hidden">
                    <img
                      src="/equipment-bg.jpg"
                      alt="Physiotherapy Equipment"
                      className="
                        w-full
                        h-48
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-500
                      "
                    />
                  </div>

                  <div className="p-6">
                    <Wrench
                      className="
                        w-12
                        h-12
                        text-teal-400
                        mb-5
                      "
                    />

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-white
                        mb-3
                      "
                    >
                      Tools & Equipment
                    </h3>

                    <p className="text-gray-300 leading-7">
                      Discover advanced physiotherapy machines,
                      rehabilitation equipment, and modern treatment
                      tools used for faster recovery and effective care.
                    </p>

                    <span
                      className="
                        inline-block
                        mt-5
                        text-teal-400
                        font-semibold
                        group-hover:translate-x-2
                        transition
                      "
                    >
                      View Equipment →
                    </span>
                  </div>
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