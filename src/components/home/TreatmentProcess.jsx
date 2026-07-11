import { FaClipboardCheck, FaSearch, FaHandsHelping, FaHeartbeat } from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Assessment",
    description:
      "Our physiotherapist carefully listens to your symptoms and evaluates your movement.",
    icon: FaClipboardCheck,
  },
  {
    number: "02",
    title: "Diagnosis",
    description:
      "A detailed physical assessment helps us identify the root cause of your pain.",
    icon: FaSearch,
  },
  {
    number: "03",
    title: "Personalized Therapy",
    description:
      "We create a customized rehabilitation plan based on your condition and goals.",
    icon: FaHandsHelping,
  },
  {
    number: "04",
    title: "Recovery",
    description:
      "Regain strength, mobility, confidence, and return to your daily activities pain-free.",
    icon: FaHeartbeat,
  },
];

const TreatmentProcess = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[4px] text-center text-teal-600 font-semibold">
          OUR PROCESS
        </p>

        <h2 className="text-5xl font-bold text-center mt-4 text-slate-900">
          Your Recovery Journey
        </h2>

        <p className="text-center text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
          Every patient follows a structured rehabilitation process focused on
          long-term recovery, improved mobility, and lasting pain relief.
        </p>

        <div className="grid md:grid-cols-4 gap-10 mt-20">

          {steps.map((step) => {

            const Icon = step.icon;

            return (

              <div
                key={step.number}
                className="relative group bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-3 transition duration-300"
              >

                <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-2xl mx-auto">

                  <Icon />

                </div>

                <h3 className="mt-6 text-center text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="text-center mt-4 text-gray-600 leading-7">
                  {step.description}
                </p>

                <div className="mt-8 text-center text-5xl font-bold text-teal-100 group-hover:text-teal-200 transition">
                  {step.number}
                </div>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
};

export default TreatmentProcess;