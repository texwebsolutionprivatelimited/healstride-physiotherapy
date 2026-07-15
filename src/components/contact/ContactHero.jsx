import { motion } from "framer-motion";

const ContactHero = () => {
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
    >
      {/* Background Image */}
      <img
        src="https://thumbs.dreamstime.com/b/doctor-fills-patient-history-appointment-clinic-private-male-expresses-excitement-telling-disease-to-woman-325989321.jpg"
        alt="Contact Us"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Decorative Blur */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
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
          Contact HealStride
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
          lg:text-6xl
          font-bold
          text-white
          leading-tight
          "
        >
          Book Your

          <span className="block text-blue-400">
            Appointment
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
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
          Start your recovery journey today with expert
          physiotherapy care and personalized treatment
          plans designed for faster recovery and long-term
          wellness.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ContactHero;