import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section
      className="
    relative
    min-h-[65vh]
    sm:min-h-[70vh]
    lg:min-h-[80vh]
    flex
    items-center
    justify-center
    overflow-hidden
  "
    >

      {/* Background */}
      <img
        src="/appointment-bg.avif"
        alt="Contact Us"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      />


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-teal-900/60
          via-teal-800/30
          to-transparent
        "
      />


      {/* Blur */}
      <div
        className="
          absolute
          top-5
          left-5
          w-32
          h-32
          sm:w-40
          sm:h-40
          bg-blue-500/20
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-5
          right-5
          w-32
          h-32
          sm:w-40
          sm:h-40
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
    backdrop-blur-md
    border
    border-white/20
    text-white
    px-5
    py-2
    rounded-full
    mb-6
    sm:mb-8
    text-xs
    sm:text-sm
    font-medium
  "
        >
          Get In Touch With HealStride
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
          Connect

          <span className="block text-cyan-400 mt-2">
            With Us
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
          Start your recovery journey today with expert physiotherapy care
          and personalized treatment plans. Schedule your consultation with
          our experienced specialists and take the first step toward a
          healthier, pain-free life.
        </motion.p>


      </motion.div>

    </section>
  );
};

export default ContactHero;