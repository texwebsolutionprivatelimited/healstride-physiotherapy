import { FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import doctor1 from "../../assets/images/doctors/doctor1.jpg";
import doctor2 from "../../assets/images/doctors/doctor2.jpg";
import doctor3 from "../../assets/images/doctors/doctor3.jpg";

// Export doctors so other pages can reuse them
export const specialists = [
  {
    image: doctor1,
    name: "Dr. Sai Krishna",
    designation: "Senior Physiotherapist",
    experience: "10+ Years Experience",
    specialization: "Sports Rehabilitation",
    slug: "dr-sai-krishna",
  },
  {
    image: doctor2,
    name: "Dr. Priya Sharma",
    designation: "Orthopedic Physiotherapist",
    experience: "8+ Years Experience",
    specialization: "Manual Therapy",
    slug: "dr-priya-sharma",
  },
  {
    image: doctor3,
    name: "Dr. Rahul Verma",
    designation: "Neuro Physiotherapist",
    experience: "6+ Years Experience",
    specialization: "Post Surgical Rehabilitation",
    slug: "dr-rahul-verma",
  },
];

const Specialists = ({
  doctorsToShow = specialists.slice(0, 3),
  showViewAllButton = true,
}) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

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

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-16">
          {doctorsToShow.map((doctor, index) => (
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
                    <span>{doctor.experience}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <FaAward className="text-teal-600" />
                    <span>{doctor.specialization}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewAllButton && (
          <div className="flex justify-center mt-12">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
            >
              View All Specialists
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Specialists;