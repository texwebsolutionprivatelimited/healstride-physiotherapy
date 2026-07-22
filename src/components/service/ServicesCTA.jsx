import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServicesCTA = () => {
  return (
    <section className="py-20 bg-teal-600 text-white">

      <div className="max-w-7xl mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Start Your Recovery Journey?
          </h2>


          <p className="mt-5 max-w-3xl mx-auto text-lg text-teal-50 leading-8">
            Our expert physiotherapists are here to help you
            reduce pain, improve mobility, and get back to a
            healthier lifestyle.
          </p>


          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >

            <Link
              to="/booking"
              className="
              inline-block
              mt-8
              bg-white
              text-teal-600
              px-10
              py-4
              rounded-xl
              font-semibold
              shadow-lg
              hover:bg-gray-100
              transition
              "
            >
              Book Appointment
            </Link>

          </motion.div>


        </motion.div>

      </div>

    </section>
  );
};

export default ServicesCTA;