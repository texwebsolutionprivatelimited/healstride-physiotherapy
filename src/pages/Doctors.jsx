import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";


const Doctors = () => {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchDoctors = async () => {

      try {

        const q = query(
          collection(db, "doctors"),
          where("active", "==", true)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDoctors(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchDoctors();

  }, []);



  if (loading) {
    return (
      <div className="
      min-h-screen 
      flex 
      items-center 
      justify-center
      px-4
      ">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-700">
          Loading Doctors...
        </h2>
      </div>
    );
  }



  return (

    <section className="
      py-12
      sm:py-16
      lg:py-20
      bg-gray-50
      min-h-screen
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      ">


        {/* Heading */}

        <div className="text-center">

          <h1 className="
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-bold
            text-slate-900
          ">
            Our Doctors
          </h1>


          <p className="
            mt-3
            sm:mt-4
            text-sm
            sm:text-base
            text-gray-600
            max-w-2xl
            mx-auto
          ">
            Meet our experienced physiotherapy specialists.
          </p>

        </div>



        {/* Cards */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          sm:gap-8
          mt-10
          sm:mt-12
        ">


          {
            doctors.length === 0 ? (

              <p className="
              col-span-full
              text-center
              text-gray-500
              py-10
              ">
                No doctors found.
              </p>

            ) : (

              doctors.map((doctor)=>(


                <div
                  key={doctor.id}
                  className="
                  bg-white
                  rounded-2xl
                  sm:rounded-3xl
                  shadow-md
                  hover:shadow-xl
                  transition-all
                  duration-300
                  overflow-hidden
                  "
                >



                  {/* Image */}

                  <div className="
                  overflow-hidden
                  ">

                    <img
                      src={
                        doctor.image ||
                        "/default-user.png"
                      }
                      alt={doctor.name}
                      className="
                      w-full
                      h-64
                      sm:h-72
                      lg:h-80
                      object-cover
                      hover:scale-105
                      transition
                      duration-500
                      "
                    />

                  </div>




                  {/* Content */}

                  <div className="
                  p-5
                  sm:p-6
                  ">


                    <h2 className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    text-slate-900
                    ">
                      {doctor.name}
                    </h2>



                    <p className="
                    text-teal-600
                    mt-2
                    text-sm
                    sm:text-base
                    font-semibold
                    ">
                      {doctor.role}
                    </p>



                    <p className="
                    text-gray-600
                    mt-3
                    text-sm
                    sm:text-base
                    line-clamp-2
                    ">
                      {doctor.specialization}
                    </p>




                    <Link
                      to={`/doctors/${doctor.slug}`}
                      className="
                      inline-flex
                      items-center
                      mt-5
                      sm:mt-6
                      text-teal-600
                      font-semibold
                      text-sm
                      sm:text-base
                      hover:text-teal-700
                      "
                    >
                      View Profile →
                    </Link>


                  </div>


                </div>


              ))

            )
          }


        </div>


      </div>


    </section>

  );

};


export default Doctors;