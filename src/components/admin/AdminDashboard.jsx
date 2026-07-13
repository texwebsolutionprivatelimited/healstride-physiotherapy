import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "appointments"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Appointment Dashboard
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full">

          <thead className="bg-teal-600 text-white">

            <tr>
              <th className="p-4">Patient</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Condition</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
            </tr>

          </thead>

          <tbody>

            {appointments.map((appointment) => (

              <tr
                key={appointment.id}
                className="border-b text-center hover:bg-gray-50"
              >
                <td className="p-4">{appointment.name}</td>
                <td className="p-4">{appointment.phone}</td>
                <td className="p-4">{appointment.email}</td>
                <td className="p-4">{appointment.condition}</td>
                <td className="p-4">{appointment.date}</td>
                <td className="p-4">{appointment.time}</td>
              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;