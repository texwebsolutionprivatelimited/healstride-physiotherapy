import { motion } from "framer-motion";
import {
  Award,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

const trustCards = [
  {
    icon: Award,
    title: "Certified Physiotherapist",
    desc: "Qualified and certified professionals providing expert physiotherapy care.",
  },
  {
    icon: Users,
    title: "5000+ Happy Patients",
    desc: "Trusted by thousands of patients for effective treatment and recovery.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    desc: "Customized treatment plans tailored to every patient's needs.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Ethical Practice",
    desc: "Patient-focused care with transparency, safety, and professionalism.",
  },
];

const WhyPatientsTrustUs = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Patient Satisfaction
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            Why Patients Trust Us
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We focus on quality treatment, patient comfort, and
            long-term recovery through evidence-based physiotherapy.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {trustCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-5">
                <card.icon
                  size={30}
                  className="text-blue-600"
                />
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                {card.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {card.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default WhyPatientsTrustUs;