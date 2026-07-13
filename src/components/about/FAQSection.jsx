import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What conditions do you treat at Heal Stride?",
    answer:
      "We treat a wide range of conditions including back pain, knee pain, neck pain, shoulder pain, sciatica, sports injuries, stroke rehabilitation, frozen shoulder, osteoarthritis, and more.",
  },
  {
    question: "How long does a typical physiotherapy session last?",
    answer:
      "A standard session lasts between 30 to 60 minutes depending on the treatment plan and condition being addressed.",
  },
  {
    question: "Do I need a doctor's referral to book an appointment?",
    answer:
      "No, you can directly book an appointment with us. However, if you have a referral or previous medical reports, please bring them along.",
  },
  {
    question: "What should I wear for my physiotherapy session?",
    answer:
      "Wear comfortable, loose-fitting clothing that allows easy movement. Athletic wear is ideal for most therapy sessions.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "The number of sessions varies based on your condition, severity, and response to treatment. We will provide an estimate after your initial assessment.",
  },
  {
    question: "Do you offer home visits?",
    answer:
      "Yes, we offer home physiotherapy services in Bhopal for patients who have difficulty visiting the clinic.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-600">
            Have questions? We have answers.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-800 pr-4">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 leading-7">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default FAQSection;