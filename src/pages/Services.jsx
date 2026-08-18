import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Wrench } from "lucide-react";

const Services = () => {
  return (
    <div
      className="
        relative
        min-h-[500px]
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
      <div className="absolute top-10 left-10 w-40 h-40 bg-teal-400/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-cyan-400/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        <section className="py-10 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto"
            >
              <span
                className="
                  inline-block
                  px-4
                  py-1.5
                  rounded-full
                  bg-teal-500/20
                  border
                  border-teal-400/30
                  text-teal-300
                  text-xs
                  sm:text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                  mb-3
                  backdrop-blur-md
                "
              >
                Professional Physiotherapy Care
              </span>

              <h1
                className="
                  text-3xl
                  sm:text-5xl
                  lg:text-6xl
                  font-bold
                  bg-gradient-to-r
                  from-teal-300
                  via-cyan-300
                  to-teal-400
                  bg-clip-text
                  text-transparent
                  leading-tight
                "
              >
                Our Services
              </h1>

              <p
                className="
                  mt-3
                  sm:mt-4
                  text-slate-200
                  text-xs
                  sm:text-base
                  lg:text-lg
                  max-w-2xl
                  mx-auto
                  leading-relaxed
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
                gap-6
                lg:gap-8
                max-w-5xl
                mx-auto
                items-stretch
              "
            >

              {/* Physiotherapy Services */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link
                  to="/services/physiotherapy"
                  className="
                    group
                    flex
                    flex-col
                    h-full
                    bg-white/10
                    backdrop-blur-xl
                    rounded-2xl
                    overflow-hidden
                    border
                    border-white/20
                    shadow-xl
                    hover:border-teal-400
                    transition-all
                    duration-300
                  "
                >
                  <div className="overflow-hidden h-48 sm:h-52 w-full flex-shrink-0">
                    <img
                      src="/physiotherapy-bg.webp"
                      alt="Physiotherapy Services"
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

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <Activity
                      className="
                        w-10
                        h-10
                        text-teal-300
                        mb-3
                      "
                    />

                    <h3
                      className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-white
                        mb-2
                      "
                    >
                      Physiotherapy Services
                    </h3>

                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                      Explore rehabilitation programs, pain management
                      treatments, sports injury recovery, post-surgical
                      care, and specialized physiotherapy services.
                    </p>

                    <div className="mt-auto pt-4">
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          text-teal-300
                          font-semibold
                          text-xs
                          sm:text-sm
                          group-hover:text-teal-200
                          transition-colors
                        "
                      >
                        <span>View Services</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Tools & Equipment */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link
                  to="/services/tools-equipment"
                  className="
                    group
                    flex
                    flex-col
                    h-full
                    bg-white/10
                    backdrop-blur-xl
                    rounded-2xl
                    overflow-hidden
                    border
                    border-white/20
                    shadow-xl
                    hover:border-teal-400
                    transition-all
                    duration-300
                  "
                >
                  <div className="overflow-hidden h-48 sm:h-52 w-full flex-shrink-0">
                    <img
                      src="/equipment-bg.jpg"
                      alt="Physiotherapy Equipment"
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

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <Wrench
                      className="
                        w-10
                        h-10
                        text-teal-300
                        mb-3
                      "
                    />

                    <h3
                      className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-white
                        mb-2
                      "
                    >
                      Tools & Equipment
                    </h3>

                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                      Discover advanced physiotherapy machines,
                      rehabilitation equipment, and modern treatment
                      tools used for faster recovery and effective care.
                    </p>

                    <div className="mt-auto pt-4">
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          text-teal-300
                          font-semibold
                          text-xs
                          sm:text-sm
                          group-hover:text-teal-200
                          transition-colors
                        "
                      >
                        <span>View Equipment</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </span>
                    </div>
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