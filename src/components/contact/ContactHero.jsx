import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";

const ContactHero = () => {
  return (
<section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">      
      {/* Background Image */}
      <img
        src="https://thumbs.dreamstime.com/b/doctor-fills-patient-history-appointment-clinic-private-male-expresses-excitement-telling-disease-to-woman-325989321.jpg"
        alt="Contact Us"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <span className="inline-block bg-blue-600/20 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm">
          Contact Heal Stride
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-6 leading-tight">
          Book Your
          <span className="block text-blue-400">
            Appointment
          </span>
        </h1>

        <p className="text-gray-200 mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Start your recovery journey today with expert physiotherapy
          care and personalized treatment plans.
        </p>

      </motion.div>
    </section>
  );
};

export default ContactHero;