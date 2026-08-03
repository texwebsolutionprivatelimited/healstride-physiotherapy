import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section
      className="
        relative
        min-h-[70vh]
        sm:min-h-[75vh]
        lg:min-h-[85vh]
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/about.jpg"
          alt="About Heal Stride"
          className="
            w-full
            h-full
            object-cover
            object-center
            scale-105
          "
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Gradient Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-teal-900/70
          via-teal-800/30
          to-transparent
        "
      />

      {/* Blur Effects */}
      <div
        className="
          absolute
          top-10
          left-10
          w-40
          h-40
          bg-blue-500/20
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-10
          right-10
          w-40
          h-40
          bg-cyan-500/20
          blur-3xl
          rounded-full
        "
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          relative
          z-10
          w-full
          max-w-6xl
          mx-auto
          text-center
          px-4
          sm:px-6
          lg:px-8
          py-8
          sm:py-10
        "
      >
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="
            inline-flex
            items-center
            bg-blue-600/20
            border
            border-white/20
            backdrop-blur-md
            text-white
            px-5
            py-2
            rounded-full
            text-xs
            sm:text-sm
            font-medium
            mb-6
          "
        >
          About HealStride Physiotherapy
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            font-bold
            text-white
            leading-tight
          "
        >
          About

          <span className="block text-cyan-400 mt-2">
            Heal Stride
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="
            mt-6
            text-base
            sm:text-lg
            lg:text-xl
            text-gray-200
            max-w-3xl
            mx-auto
            leading-7
            sm:leading-8
          "
        >
          Dedicated to helping patients recover faster, move better,
          and live pain-free lives through personalized physiotherapy,
          advanced rehabilitation techniques, and compassionate care.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
          {[
            {
              value: "10+",
              title: "Years Experience",
              color: "text-white",
            },
            {
              value: "5000+",
              title: "Happy Patients",
              color: "text-cyan-400",
            },
            {
              value: "Expert",
              title: "Physiotherapy Care",
              color: "text-green-400",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                rounded-2xl
                px-5
                py-5
                shadow-lg
              "
            >
              <h3
                className={`
                  text-2xl
                  sm:text-3xl
                  font-bold
                  ${item.color}
                `}
              >
                {item.value}
              </h3>

              <p
                className="
                  text-gray-300
                  text-sm
                  mt-2
                "
              >
                {item.title}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutHero;