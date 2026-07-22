import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  GraduationCap,
  BriefcaseMedical,
  BadgeCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";


const DoctorProfile = () => {

  const { doctorName } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchDoctor = async () => {

      try {

        const q = query(
          collection(db, "doctors"),
          where("slug", "==", doctorName)
        );


        const snapshot = await getDocs(q);


        if (!snapshot.empty) {

          const data = snapshot.docs[0];

          setDoctor({
            id: data.id,
            ...data.data()
          });

        }


      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


    fetchDoctor();


  }, [doctorName]);




  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <Loader2 className="animate-spin text-teal-600" size={40} />

      </div>
    );

  }



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
          to="/doctors"
          className="inline-flex items-center gap-2 text-teal-600 mb-10"
        >

          <ArrowLeft size={18} />

          Back

        </Link>



        <div className="
          grid 
          lg:grid-cols-2 
          gap-12 
          items-center
        ">


          {/* Image */}

          <img

            src={
              doctor.image ||
              "/default-user.png"
            }

            alt={doctor.name}

            className="
              w-full
              h-[450px]
              object-cover
              rounded-3xl
              shadow-xl
            "

          />



          {/* Details */}

          <div>


            <h1 className="
              text-4xl
              font-bold
              text-slate-800
            ">

              {doctor.name}

            </h1>



            <p className="
              text-teal-600
              text-xl
              mt-2
            ">

              {doctor.role}

            </p>



            <p className="
              mt-6
              text-gray-600
              leading-8
            ">

              {doctor.description}

            </p>




            <div className="space-y-5 mt-8">


              <Info
                icon={<GraduationCap />}
                title="Education"
                value={doctor.education}
              />


              <Info
                icon={<BriefcaseMedical />}
                title="Experience"
                value={doctor.experience}
              />


              <Info
                icon={<BadgeCheck />}
                title="Registration"
                value={doctor.registration}
              />


            </div>




            <div className="mt-8">

              <h3 className="font-bold text-lg mb-3">
                Specialization
              </h3>


              <div className="flex flex-wrap gap-3">

                {doctor.specialization
                  ?.split(",")
                  .map((item, index) => (

                    <span
                      key={index}
                      className="
            bg-teal-50
            text-teal-700
            border
            border-teal-200
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
          "
                    >
                      {item.trim()}
                    </span>

                  ))}

              </div>

            </div>




            <Link

              to="/booking"

              className="
              inline-block
              mt-8
              bg-teal-600
              hover:bg-teal-700
              text-white
              px-8
              py-3
              rounded-xl
              "

            >

              Book Appointment

            </Link>


          </div>


        </div>


      </div>


    </section>

  );

};




const Info = ({
  icon,
  title,
  value
}) => (

  <div className="flex gap-3">

    <div className="text-teal-600">

      {icon}

    </div>


    <div>

      <h3 className="font-semibold">

        {title}

      </h3>


      <p>

        {value || "-"}

      </p>


    </div>


  </div>

);



export default DoctorProfile;