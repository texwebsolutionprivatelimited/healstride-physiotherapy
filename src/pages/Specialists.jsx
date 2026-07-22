import { FaAward } from "react-icons/fa";

import { specialists } from "../components/home/Specialists";

const SpecialistsPage = () => {
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

        <div className="space-y-24 mt-20">

          {specialists.map((doctor, index) => (

            <div
              key={index}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >

              {/* Doctor Image */}

              <div>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full max-w-md mx-auto rounded-3xl shadow-xl"
                />
              </div>

              {/* Doctor Details */}

              <div>

                <h2 className="text-4xl font-bold text-slate-900">
                  {doctor.name}
                </h2>

                <p className="text-xl text-teal-600 font-semibold mt-3">
                  {doctor.designation}
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-3">
                    <FaAward className="text-teal-600" />
                    <span>{doctor.experience}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaAward className="text-teal-600" />
                    <span>{doctor.specialization}</span>
                  </div>

                </div>

                <h3 className="text-2xl font-semibold mt-10">
                  About
                </h3>

                <p className="text-gray-600 leading-8 mt-4">
                  Dr. {doctor.name.replace("Dr. ", "")} is an experienced
                  physiotherapist dedicated to helping patients recover from
                  pain, injuries, and movement disorders through personalized
                  treatment plans and evidence-based physiotherapy techniques.
                </p>

                <h3 className="text-2xl font-semibold mt-10">
                  Expertise
                </h3>

                <ul className="mt-4 space-y-3 text-gray-700 list-disc pl-5">
                  <li>{doctor.specialization}</li>
                  <li>Post Surgery Rehabilitation</li>
                  <li>Pain Management</li>
                  <li>Mobility & Strength Training</li>
                </ul>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default SpecialistsPage;