import { useParams, Link } from "react-router-dom";
import {
  GraduationCap,
  BriefcaseMedical,
  BadgeCheck,
  ArrowLeft,
} from "lucide-react";

import doctor1 from "../assets/images/doctors/doctor1.jpg";
import doctor2 from "../assets/images/doctors/doctor2.jpg";
import doctor3 from "../assets/images/doctors/doctor3.jpg";

const doctorsData = {
  "dr-sai-krishna": {
    name: "Dr. Sai Krishna",
    role: "Senior Physiotherapist",
    image: doctor1,
    education: "Bachelor of Physiotherapy (BPT)",
    experience: "10+ Years Experience",
    registration: "MPPTC/XXXX/2024",
    specialization: "Sports Rehabilitation",
    description:
      "Experienced physiotherapist specializing in sports injury rehabilitation, pain management, and mobility restoration.",
  },

  "dr-priya-sharma": {
    name: "Dr. Priya Sharma",
    role: "Orthopedic Physiotherapist",
    image: doctor2,
    education: "Master of Physiotherapy (MPT)",
    experience: "8+ Years Experience",
    registration: "MPPTC/XXXX/2023",
    specialization: "Manual Therapy",
    description:
      "Expert in orthopedic rehabilitation, posture correction, and musculoskeletal disorder treatment.",
  },

  "dr-rahul-verma": {
    name: "Dr. Rahul Verma",
    role: "Neuro Physiotherapist",
    image: doctor3,
    education: "Bachelor of Physiotherapy (BPT)",
    experience: "6+ Years Experience",
    registration: "MPPTC/XXXX/2022",
    specialization: "Post Surgical Rehabilitation",
    description:
      "Focused on neurological rehabilitation, post-surgical recovery, and functional mobility improvement.",
  },
};

const DoctorProfile = () => {
  const { doctorName } = useParams();

  const doctor = doctorsData[doctorName];

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Doctor Not Found
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 mb-10"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
          />

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              {doctor.name}
            </h1>

            <p className="text-blue-600 text-xl mt-2">
              {doctor.role}
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              {doctor.description}
            </p>

            <div className="space-y-5 mt-8">

              <div className="flex gap-3">
                <GraduationCap className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">Education</h3>
                  <p>{doctor.education}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <BriefcaseMedical className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">Experience</h3>
                  <p>{doctor.experience}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <BadgeCheck className="text-blue-600" />
                <div>
                  <h3 className="font-semibold">Registration</h3>
                  <p>{doctor.registration}</p>
                </div>
              </div>

            </div>

            <div className="mt-8">
              <h3 className="font-bold text-lg mb-2">
                Specialization
              </h3>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                {doctor.specialization}
              </span>
            </div>

            <Link
              to="/contact"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              Book Appointment
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;