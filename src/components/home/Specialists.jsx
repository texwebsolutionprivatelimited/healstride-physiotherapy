import { useEffect, useState } from "react";
import { FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";


const Specialists = () => {

  const [doctors,setDoctors] = useState([]);


  useEffect(()=>{

    const fetchDoctors = async()=>{

      try{

        const q = query(
          collection(db,"doctors"),
          where("active","==",true)
        );

        const snap = await getDocs(q);


        const data = snap.docs.map(doc=>({
          id:doc.id,
          ...doc.data()
        }));


        // Home page only 3 doctors
        setDoctors(data.slice(0,3));


      }catch(error){
        console.log(error);
      }

    };


    fetchDoctors();

  },[]);



  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">


        <p className="text-center uppercase tracking-[5px] text-teal-600 font-semibold">
          OUR SPECIALISTS
        </p>


        <h2 className="text-center text-5xl font-bold text-slate-900 mt-4">
          Meet Our Expert Physiotherapists
        </h2>


        <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto">
          Our experienced specialists provide personalized physiotherapy treatments.
        </p>



        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mt-16">


          {
            doctors.map((doctor)=>(


              <div
                key={doctor.id}
                className="
                bg-white 
                rounded-3xl 
                shadow-lg 
                overflow-hidden 
                border 
                hover:-translate-y-2
                transition
                "
              >


                <img
                  src={doctor.image || "/default-user.png"}
                  alt={doctor.name}
                  className="
                  w-full
                  h-[380px]
                  object-cover
                  "
                />



                <div className="p-8">


                  <h3 className="text-2xl font-bold">
                    {doctor.name}
                  </h3>


                  <p className="text-teal-600 font-semibold mt-2">
                    {doctor.role}
                  </p>



                  <div className="mt-5 space-y-3 text-gray-600">


                    <p className="flex gap-3 items-center">
                      <FaAward className="text-teal-600"/>
                      {doctor.experience}
                    </p>


                    <p className="flex gap-3 items-center">
                      <FaAward className="text-teal-600"/>
                      {doctor.specialization}
                    </p>


                  </div>



                  <Link
                    to={`/doctors/${doctor.slug}`}
                    className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    text-teal-600
                    font-semibold
                    "
                  >

                    View Profile
                    <FaArrowRight/>

                  </Link>



                </div>


              </div>


            ))
          }


        </div>


        <div className="text-center mt-12">

          <Link
            to="/doctors"
            className="
            bg-teal-600
            text-white
            px-8
            py-3
            rounded-xl
            "
          >
            View All Doctors
          </Link>

        </div>


      </div>


    </section>
  )
}


export default Specialists;