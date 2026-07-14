import { motion } from "framer-motion";

const ServiceHero = () => {
  return (
    <section
      className="
      relative
      min-h-[450px]
      sm:min-h-[500px]
      md:min-h-[550px]
      overflow-hidden
      flex
      items-start
      "
      style={{
        backgroundImage: `url(https://mybramptonphysio.ca/wp-content/uploads/2025/12/Sports-Physiotherapy%E2%80%8B.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-teal-950/70"></div>


      {/* Content */}

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        text-center
        w-full
        pt-20
        sm:pt-24
        md:pt-28
        "
      >


        {/* Badge */}

        <motion.span
          initial={{
            opacity:0,
            scale:0.8
          }}
          animate={{
            opacity:1,
            scale:1
          }}
          transition={{
            duration:0.6
          }}
          className="
          inline-block
          bg-blue-600/20
          backdrop-blur-md
          border
          border-white/20
          text-white
          px-5
          py-2
          rounded-full
          text-sm
          "
        >
          Services HealStride
        </motion.span>



        {/* Heading */}

        <motion.h1
          initial={{
            opacity:0,
            y:-50
          }}
          animate={{
            opacity:1,
            y:0
          }}
          transition={{
            duration:0.8
          }}
          className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          font-bold
          text-white
          mt-6
          leading-tight
          "
        >
          Our Physiotherapy Services
        </motion.h1>




        {/* Description */}

        <motion.p
          initial={{
            opacity:0,
            y:30
          }}
          animate={{
            opacity:1,
            y:0
          }}
          transition={{
            duration:0.8,
            delay:0.2
          }}
          className="
          text-teal-50
          mt-6
          text-base
          sm:text-lg
          md:text-xl
          max-w-3xl
          mx-auto
          leading-8
          "
        >
          Comprehensive physiotherapy treatments designed
          to reduce pain, restore movement and improve
          your quality of life.
        </motion.p>



      </div>


    </section>
  );
};

export default ServiceHero;