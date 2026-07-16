import { motion } from "framer-motion";

const ServiceHero = () => {
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
      "
      style={{
        backgroundImage:
          "url(https://mybramptonphysio.ca/wp-content/uploads/2025/12/Sports-Physiotherapy%E2%80%8B.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/75"></div>

      {/* Decorative Blur Effects */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="
            inline-block
            bg-white/10
            backdrop-blur-md
            border
            border-white/20
            text-white
            px-4
            sm:px-5
            py-2
            rounded-full
            text-xs
            sm:text-sm
          "
        >
          HealStride Healthcare
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
            mt-6
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            text-white
            leading-tight
          "
        >
          Physiotherapy Services
          <span className="block text-cyan-400">
            & Rehabilitation Equipment
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          Explore our physiotherapy treatments, rehabilitation
          programs, and advanced tools & equipment designed to
          support recovery, pain relief, and improved mobility.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ServiceHero;