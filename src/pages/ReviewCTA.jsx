import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ReviewCTA = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-[4px] text-teal-600 font-semibold text-sm"
        >
          PATIENT FEEDBACK
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-4"
        >
          Share Your Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-5 text-slate-600 leading-7 max-w-2xl mx-auto text-sm sm:text-base"
        >
          Your feedback helps us improve our services and inspires others
          seeking effective physiotherapy care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          whileHover={{ scale: 1.03 }}
          className="mt-8"
        >
          <Link
            to="/review"
            aria-label="Submit your physiotherapy review"
            className="
              inline-flex
              items-center
              gap-2
              bg-teal-600
              hover:bg-teal-700
              text-white
              px-6
              sm:px-8
              py-3
              rounded-xl
              font-semibold
              transition-all
              duration-300
              shadow-lg
              hover:shadow-xl
            "
          >
            Submit Your Review
            <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ReviewCTA;