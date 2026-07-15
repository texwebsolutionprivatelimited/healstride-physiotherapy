import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section
      className="
      relative
      min-h-screen
      md:min-h-[75vh]
      flex
      items-center
      justify-center
      overflow-hidden
      py-16
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/about.jpg"
          alt="About Heal Stride"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Decorative Blur Effects */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
        relative
        z-10
        text-center
        px-4
        sm:px-6
        lg:px-8
        max-w-5xl
        mx-auto
        py-16
        "
      >
        {/* Badge */}
        <motion.span
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
          inline-block
          bg-blue-600/20
          border
          border-white/20
          backdrop-blur-md
          text-white
          px-4
          sm:px-5
          py-2
          rounded-full
          text-xs
          sm:text-sm
          font-medium
          "
        >
          About HealStride Physiotherapy
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
          mt-6
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-7xl
          font-bold
          text-white
          leading-tight
          "
        >
          About

          <span className="block text-blue-400">
            Heal Stride
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="
          mt-5
          text-sm
          sm:text-base
          md:text-lg
          lg:text-xl
          text-gray-200
          max-w-3xl
          mx-auto
          leading-7
          md:leading-8
          "
        >
          Dedicated to helping patients recover faster, move better,
          and live pain-free lives through personalized physiotherapy,
          advanced rehabilitation techniques, and compassionate care.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
          className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          sm:gap-6
          max-w-4xl
          mx-auto
          "
        >
          {/* Card 1 */}
          <div
            className="
            bg-white/10
            backdrop-blur-md
            border
            border-white/20
            rounded-2xl
            px-6
            py-5
            text-center
            "
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              10+
            </h3>

            <p className="text-gray-300 text-sm mt-2">
              Years Experience
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
            bg-white/10
            backdrop-blur-md
            border
            border-white/20
            rounded-2xl
            px-6
            py-5
            text-center
            "
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400">
              5000+
            </h3>

            <p className="text-gray-300 text-sm mt-2">
              Happy Patients
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="
            bg-white/10
            backdrop-blur-md
            border
            border-white/20
            rounded-2xl
            px-6
            py-5
            text-center
            "
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-green-400">
              Expert
            </h3>

            <p className="text-gray-300 text-sm mt-2">
              Physiotherapy Care
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutHero;