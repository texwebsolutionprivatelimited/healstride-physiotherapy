import { motion } from "framer-motion";

const GoogleMap = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Section Header */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          whileInView={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.8
          }}

          viewport={{
            once: true
          }}

          className="
          text-center
          mb-8
          sm:mb-10
          md:mb-12
          "

        >


          <motion.p

            initial={{
              opacity:0
            }}

            whileInView={{
              opacity:1
            }}

            transition={{
              delay:0.2
            }}

            className="
            uppercase
            tracking-[4px]
            sm:tracking-[5px]
            text-teal-600
            font-semibold
            text-sm
            sm:text-base
            "

          >

            Our Location

          </motion.p>




          <h2

            className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            font-bold
            text-slate-900
            mt-4
            "

          >

            Visit HealStride Clinic

          </h2>




          <p

            className="
            text-gray-600
            mt-4
            sm:mt-5
            max-w-3xl
            mx-auto
            text-sm
            sm:text-base
            md:text-lg
            leading-7
            md:leading-8
            "

          >

            Find HealStride Physiotherapy & Wellness Centre in Bhopal and
            experience expert physiotherapy care in a comfortable,
            modern, and patient-friendly environment.

          </p>


        </motion.div>





        {/* Google Map */}


        <motion.div

          initial={{
            opacity:0,
            scale:0.95
          }}

          whileInView={{
            opacity:1,
            scale:1
          }}

          transition={{
            duration:0.8
          }}

          viewport={{
            once:true
          }}

          className="
          rounded-2xl
          sm:rounded-3xl
          overflow-hidden
          shadow-xl
          md:shadow-2xl
          border
          border-gray-100
          "

        >


          <iframe

            title="HealStride Location"

            src="https://maps.google.com/maps?q=Bhopal&t=&z=13&ie=UTF8&iwloc=&output=embed"

            className="
            w-full
            h-[250px]
            sm:h-[350px]
            md:h-[450px]
            lg:h-[500px]
            "

            loading="lazy"

            allowFullScreen

            referrerPolicy="no-referrer-when-downgrade"

          />


        </motion.div>



      </div>


    </section>
  );
};


export default GoogleMap;