import {
  FaBone,
  FaWalking,
  FaHeartbeat,
  FaRunning,
} from "react-icons/fa";
import ConditionSlider from "./ConditionSlider";

const conditions = [
  "Knee Pain",
  "Back Pain",
  "Neck Pain",
  "Shoulder Pain",
  "Sciatica",
  "Tennis Elbow",
  "Frozen Shoulder",
  "Osteoarthritis",
  "Stroke Rehab",
  "Sports Injury",
  "Post Surgery Rehab",
  "Plantar Fasciitis",
];

const icons = [
  FaBone,
  FaWalking,
  FaBone,
  FaHeartbeat,
  FaRunning,
  FaBone,
  FaHeartbeat,
  FaBone,
  FaHeartbeat,
  FaRunning,
  FaWalking,
  FaBone,
];

const Conditions = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-teal-600 uppercase tracking-[5px] text-center font-semibold">
          CONDITIONS WE TREAT
        </p>

        <h2 className="text-5xl font-bold text-center mt-4 text-slate-900">
          Recover Faster. Live Better.
        </h2>

        <p className="text-gray-600 text-center mt-5 max-w-3xl mx-auto leading-8">
          From sports injuries to chronic pain, HealStride offers
          personalized physiotherapy solutions for a wide range of
          musculoskeletal and neurological conditions.
        </p>

        <div className="grid lg:grid-cols-2 gap-14 mt-16 items-start">

  {/* LEFT SIDE - CONDITIONS */}

  <div className="grid grid-cols-2 gap-6">

    {conditions.map((item, index) => {

      const Icon = icons[index];

      return (

        <div
          key={index}
          className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:border-teal-500 hover:-translate-y-2 transition duration-300"
        >

          <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 text-xl group-hover:bg-teal-600 group-hover:text-white transition">
            <Icon />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            {item}
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            Expert physiotherapy treatment for {item.toLowerCase()}.
          </p>

        </div>

      );

    })}

  </div>

  {/* RIGHT SIDE - IMAGE SLIDER */}

  <ConditionSlider />

</div>

      </div>
    </section>
  );
};

export default Conditions;