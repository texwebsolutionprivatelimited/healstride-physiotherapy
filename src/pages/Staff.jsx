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
      <section className="py-20 flex items-center justify-center">
        <p className="text-slate-500 font-medium text-sm sm:text-base">Loading staff...</p>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-100 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          <p className="text-teal-600 uppercase tracking-wider text-xs sm:text-sm font-semibold mb-2">
            Meet Our Team
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Our Staff
          </h1>

          <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-base leading-relaxed">
            Meet the dedicated professionals who manage our clinic and
            provide quality care to every patient.
          </p>
        </div>

        {/* Staff Grid */}
        {staff.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-sm">
              No staff members available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 overflow-hidden flex flex-col h-full transition-all duration-300"
              >
                {/* Image */}
                <div className="w-full h-64 sm:h-72 bg-slate-100 overflow-hidden flex-shrink-0">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <UserRound size={60} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {member.name}
                  </h2>

                  {member.role && (
                    <p className="text-teal-600 font-semibold text-xs sm:text-sm mt-1">
                      {member.role}
                    </p>
                  )}

                  {member.bio && (
                    <p className="text-slate-600 mt-3 text-xs sm:text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  )}

                  {member.certifications && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-2">
                        Qualifications / Certifications
                      </h3>

                      <ul className="space-y-1 text-xs sm:text-sm text-slate-600">
                        {member.certifications
                          .split("\n")
                          .filter((item) => item.trim())
                          .map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-1.5"
                            >
                              <span className="text-teal-600 font-bold">•</span>
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