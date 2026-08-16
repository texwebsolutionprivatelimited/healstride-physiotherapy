import { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { UserRound } from "lucide-react";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffQuery = query(
          collection(db, "staff"),
          orderBy("order", "asc")
        );

        const snapshot = await getDocs(staffQuery);

        const staffData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((member) => member.active !== false);

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
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading staff...</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-teal-600 uppercase tracking-[0.25em] text-sm font-semibold mb-3">
            Meet Our Team
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            Our Staff
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Meet the dedicated professionals who manage our clinic and
            provide quality care to every patient.
          </p>
        </div>

        {/* Staff Grid */}
        {staff.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">
              No staff members available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
              >
                {/* Image */}
                <div className="w-full bg-gray-100 overflow-hidden">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-auto object-contain block"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-72 flex items-center justify-center">
                      <UserRound
                        size={70}
                        className="text-gray-400"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">

                  <h2 className="text-2xl font-bold text-gray-900">
                    {member.name}
                  </h2>

                  {member.role && (
                    <p className="text-teal-600 font-semibold mt-2">
                      {member.role}
                    </p>
                  )}

                  {member.bio && (
                    <p className="text-gray-600 mt-4 leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {member.certifications && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Qualifications / Certifications
                      </h3>

                      <ul className="space-y-2">
                        {member.certifications
                          .split("\n")
                          .filter((item) => item.trim())
                          .map((item, index) => (
                            <li
                              key={index}
                              className="text-gray-600 flex gap-2"
                            >
                              <span className="text-teal-600">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Staff;