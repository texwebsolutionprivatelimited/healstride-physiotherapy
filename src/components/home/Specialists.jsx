import { useEffect, useState } from "react";
import { FaAward, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Specialists = ({
  limit = 3,
  showViewAllButton = true,
}) => {
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

        setDoctors(limit ? data.slice(0, limit) : data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [limit]);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-700">
            Loading Specialists...
          </h2>
        </div>
      </section>
    );
  }

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
          {doctors.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              No doctors available.
            </div>
          ) : (
            doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-[380px] object-cover object-top group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-5 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="text-teal-600 font-semibold mt-2">
                    {doctor.role}
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

                  <Link
                    to={`/doctors/${doctor.slug}`}
                    className="inline-flex items-center mt-6 text-teal-600 font-semibold hover:text-teal-700"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            ))
          )}
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