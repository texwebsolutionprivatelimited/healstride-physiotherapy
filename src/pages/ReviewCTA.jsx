import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ReviewCTA = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-teal-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="uppercase tracking-wider text-teal-600 font-semibold text-xs sm:text-sm"
        >
          PATIENT FEEDBACK
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 leading-tight"
        >
          Share Your Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-2.5 sm:mt-3 text-slate-600 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed"
        >
          Your feedback helps us improve our services and inspires others
          seeking effective physiotherapy care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 sm:mt-8 flex justify-center"
        >
          <Link
            to="/review"
            aria-label="Submit your physiotherapy review"
            className="
              group
              inline-flex
              items-center
              gap-2.5
              bg-teal-600
              hover:bg-teal-700
              active:bg-teal-800
              text-white
              px-6
              py-3.5
              rounded-xl
              font-semibold
              transition-all
              duration-200
              shadow-md
              hover:shadow-lg
              text-xs
              xs:text-sm
              sm:text-base
            "
          >
            <span>Submit Your Review</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewCTA;