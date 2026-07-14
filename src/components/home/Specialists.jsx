import { FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import doctor1 from "../../assets/images/doctors/doctor1.jpg";
import doctor2 from "../../assets/images/doctors/doctor2.jpg";
import doctor3 from "../../assets/images/doctors/doctor3.jpg";

const specialists = [
  {
    image: doctor1,
    name: "Dr. Sai Krishna",
    designation: "Senior Physiotherapist",
    experience: "10+ Years Experience",
    specialization: "Sports Rehabilitation",
  },
  {
    image: doctor2,
    name: "Dr. Priya Sharma",
    designation: "Orthopedic Physiotherapist",
    experience: "8+ Years Experience",
    specialization: "Manual Therapy",
  },
  {
    image: doctor3,
    name: "Dr. Rahul Verma",
    designation: "Neuro Physiotherapist",
    experience: "6+ Years Experience",
    specialization: "Post Surgical Rehabilitation",
  },
];

const Specialists = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <p className="text-center uppercase tracking-[5px] text-teal-600 font-semibold">
          OUR SPECIALISTS
        </p>

        <h2 className="text-center text-5xl font-bold text-slate-900 mt-4">
          Meet Our Expert Physiotherapists
        </h2>

        <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto leading-8">
          Our experienced specialists provide personalized physiotherapy
          treatments focused on helping you recover faster and live pain-free.
        </p>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-16">

          {specialists.map((doctor, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300 group"
            >

              <div className="overflow-hidden">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-[380px] object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-slate-900">
                  {doctor.name}
                </h3>

                <p className="text-teal-600 font-semibold mt-2">
                  {doctor.designation}
                </p>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-3 text-gray-600">

                    <FaAward className="text-teal-600" />

                    {doctor.experience}

                  </div>

                  <div className="flex items-center gap-3 text-gray-600">

                    <FaAward className="text-teal-600" />

                    {doctor.specialization}

                  </div>

                </div>

                <Link
                  to={`/doctors/${doctor.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[().]/g, "")}`}
                  className="mt-8 text-teal-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View Profile
                  <FaArrowRight />
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Specialists;