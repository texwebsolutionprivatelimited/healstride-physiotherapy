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
        backgroundImage: "url('service-bg.jpg')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-teal-50/90" />

      {/* Decorative Background */}
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
          bg-teal-300/20
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
          bg-cyan-300/20
          blur-3xl
          rounded-full
        "
      />


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

              <h1 className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-bold
                text-slate-900
              ">
                Our Services
              </h1>


              <p className="
                mt-5
                text-gray-700
                text-base
                md:text-lg
                max-w-2xl
                mx-auto
                leading-8
              ">
                Explore our physiotherapy treatments and advanced rehabilitation tools.
              </p>

            </motion.div>



            {/* Cards */}
            <div className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-6
  max-w-6xl
  mx-auto
">


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
                    bg-white/90
                    backdrop-blur-xl
                    rounded-3xl
                    overflow-hidden
                    border
                    border-white
                    shadow-xl
                    hover:shadow-2xl
                    hover:border-teal-400
                    transition-all
                    duration-300
                  "
                >

                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src="physiotherapy.jpg"
                      alt="Physiotherapy Services"
                      className="
      w-full
      h-32
      sm:h-36
      md:h-40
      object-cover
      group-hover:scale-105
      transition
      duration-500
    "
                    />
                  </div>


                  <div className="p-5 md:p-6">

                    <Activity className="
                      w-10
                      h-10
                      text-teal-600
                      mb-5
                    "/>


                    <h3 className="
                      text-xl
                      font-bold
                      text-slate-900
                      mb-3
                    ">
                      Physiotherapy Services
                    </h3>


                    <p className="text-gray-600 leading-7">
                      Explore rehabilitation programs, pain management treatments,
                      sports injury recovery, and specialized physiotherapy services.
                    </p>


                    <span className="
                      inline-block
                      mt-5
                      text-teal-600
                      font-semibold
                      group-hover:translate-x-2
                      transition
                    ">
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
                    bg-white/90
                    backdrop-blur-xl
                    rounded-3xl
                    overflow-hidden
                    border
                    border-white
                    shadow-xl
                    hover:shadow-2xl
                    hover:border-teal-400
                    transition-all
                    duration-300
                  "
                >

                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src="/equipment.jpg"
                      alt="Physiotherapy Equipment"
                      className="
      w-full
      h-32
      sm:h-36
      md:h-40
      object-cover
      group-hover:scale-105
      transition
      duration-500
    "
                    />
                  </div>


                  <div className="p-5 md:p-6">

                    <Wrench className="
                      w-10
                      h-10
                      text-teal-600
                      mb-5
                    "/>


                    <h3 className="
                      text-xl
                      font-bold
                      text-slate-900
                      mb-3
                    ">
                      Tools & Equipment
                    </h3>


                    <p className="text-gray-600 leading-7">
                      Discover advanced physiotherapy equipment and treatment tools
                      used for faster recovery and effective rehabilitation.
                    </p>


                    <span className="
                      inline-block
                      mt-5
                      text-teal-600
                      font-semibold
                      group-hover:translate-x-2
                      transition
                    ">
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