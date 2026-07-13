import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  "Advanced Physiotherapy Equipment",
  "Personalized Treatment Plans",
  "Experienced Physiotherapists",
  "Patient-Centered Care",
];

const ClinicIntro = () => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://blog.acceptedtogether.com/wp-content/uploads/2023/05/doctors-nurses-and-team-portrait-in-hospital-clinic-or-medical-office-diversity-health-and-heal.jpg"
              alt="Heal Stride Clinic"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="text-blue-600 font-semibold uppercase tracking-wider">
              Clinic Introduction
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              Welcome to Heal Stride
            </h2>

            <p className="mt-6 text-gray-600 leading-7 sm:leading-8 text-base sm:text-lg">
              Heal Stride Physiotherapy & Wellness Centre is dedicated
              to helping patients overcome pain, recover mobility,
              and improve quality of life through evidence-based
              physiotherapy treatments. We combine modern technology,
              expert care, and personalized treatment plans to ensure
              faster recovery and long-term wellness.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">

              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 shadow-sm"
                >
                  <CheckCircle
                    size={22}
                    className="text-green-500 flex-shrink-0"
                  />

                  <span className="text-slate-700 font-medium text-sm sm:text-base">
                    {feature}
                  </span>
                </motion.div>
              ))}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ClinicIntro;