import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StaffSection = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const q = query(
          collection(db, "staff"),
          orderBy("createdAt", "asc")
        );

        const snapshot = await getDocs(q);

        const staffData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStaff(staffData);
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) {
    return null;
  }

  if (staff.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-[0.25em] text-teal-600 uppercase mb-3">
            Meet Our Team
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Staff
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Meet the dedicated professionals who help manage our clinic
            and provide quality care to every patient.
          </p>
        </div>

        {/* Staff Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto"
            >
              {/* Image */}
              <div className="h-auto bg-gray-100 overflow-hidden">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>

                {member.designation && (
                  <p className="mt-2 text-teal-600 font-medium">
                    {member.designation}
                  </p>
                )}

                {member.bio && (
                  <p className="mt-4 text-gray-600 text-sm leading-6">
                    {member.bio}
                  </p>
                )}

                {member.qualifications?.length > 0 && (
                  <div className="mt-5 text-left">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Certifications
                    </h4>

                    <ul className="space-y-1">
                      {member.qualifications.map((qualification, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 flex gap-2"
                        >
                          <span className="text-teal-600">•</span>
                          <span>{qualification}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10">
  <button
    onClick={() => navigate("/staff")}
    className="px-8 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
  >
    View More
  </button>
</div>
    </section>
  );
};

export default StaffSection;