import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings,
  Clock,
  Activity,
  CheckCircle,
  Trash2,
  Pencil,
  Menu,
  X,
} from "lucide-react";
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>

    <div className="bg-teal-100 p-3 rounded-lg text-teal-600">
      {icon}
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [query, setQuery] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "appointments")
      );

      const data = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        status: docSnap.data().status || "pending",
        ...docSnap.data(),
      }));

      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await updateDoc(doc(db, "appointments", id), {
        status: "confirmed",
      });

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "confirmed" }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to confirm appointment");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "appointments", id));

      setAppointments((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete appointment");
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setIsEditOpen(true);
  };

  const handleUpdateAppointment = async () => {
    try {
      await updateDoc(
        doc(db, "appointments", editingAppointment.id),
        {
          name: editingAppointment.name,
          phone: editingAppointment.phone,
          email: editingAppointment.email,
          condition: editingAppointment.condition,
          date: editingAppointment.date,
          time: editingAppointment.time,
          message: editingAppointment.message || "",
        }
      );

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === editingAppointment.id
            ? editingAppointment
            : item
        )
      );

      setIsEditOpen(false);
      setEditingAppointment(null);

      alert("Appointment updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update appointment");
    }
  };

  const filteredAppointments = useMemo(() => {
    const q = query.toLowerCase();

    return appointments.filter(
      (item) =>
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.condition?.toLowerCase().includes(q)
    );
  }, [appointments, query]);

  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    return {
      total: appointments.length,

      // Aaj create hui appointments
      today: appointments.filter((a) => {
        if (!a.createdAt?.toDate) return false;

        return (
          a.createdAt.toDate().toISOString().split("T")[0] === today
        );
      }).length,

      pending: appointments.filter(
        (a) => (a.status || "pending") === "pending"
      ).length,

      confirmed: appointments.filter(
        (a) => a.status === "confirmed"
      ).length,
    };
  }, [appointments]);



  return (
    <div className="min-h-screen bg-gray-100 flex">

      

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
       
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Appointment Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and review all patient appointments.
            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

            <StatCard
              icon={<Users size={22} />}
              label="Total"
              value={stats.total}
            />

            <StatCard
              icon={<CalendarDays size={22} />}
              label="Today"
              value={stats.today}
            />

            <StatCard
              icon={<Clock size={22} />}
              label="Pending"
              value={stats.pending}
            />

            <StatCard
              icon={<Activity size={22} />}
              label="Confirmed"
              value={stats.confirmed}
            />

          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-md p-5 mb-6">
            <input
              type="text"
              placeholder="Search by patient, email, condition..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm md:text-base"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-[900px] w-full">

              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="p-4">Patient</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Condition</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredAppointments.map((appointment) => (

                  <tr
                    key={appointment.id}
                    className="border-b text-center hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {appointment.name}
                    </td>

                    <td className="p-4">
                      {appointment.phone}
                    </td>

                    <td className="p-4">
                      {appointment.email}
                    </td>

                    <td className="p-4">
                      {appointment.condition}
                    </td>

                    <td className="p-4">
                      {appointment.date}
                    </td>

                    <td className="p-4">
                      {appointment.time}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm capitalize ${appointment.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {appointment.status || "pending"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center items-center gap-3">

                        <button
                          onClick={() =>
                            handleEdit(appointment)
                          }
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleConfirm(appointment.id)
                          }
                          disabled={
                            appointment.status === "confirmed"
                          }
                          className={`${appointment.status === "confirmed"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-green-600 hover:text-green-800"
                            }`}
                          title="Confirm"
                        >
                          <CheckCircle size={20} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(appointment.id)
                          }
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>

                      </div>
                    </td>
                  </tr>

                ))}

                {filteredAppointments.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="p-6 text-center text-gray-500"
                    >
                      No appointments found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        </div>
      </main>

      {
        isEditOpen && editingAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-4">
                Edit Appointment
              </h2>

              <div className="space-y-3">

                <input
                  type="text"
                  value={editingAppointment.name}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      name: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="Name"
                />

                <input
                  type="text"
                  value={editingAppointment.phone}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="Phone"
                />

                <input
                  type="email"
                  value={editingAppointment.email}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      email: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="Email"
                />

                <input
                  type="text"
                  value={editingAppointment.condition}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      condition: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="Condition"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={editingAppointment.date}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        date: e.target.value,
                      })
                    }
                    className="border p-3 rounded-lg"
                  />

                  <input
                    type="time"
                    value={editingAppointment.time}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        time: e.target.value,
                      })
                    }
                    className="border p-3 rounded-lg"
                  />
                </div>

                <textarea
                  rows="4"
                  value={editingAppointment.message || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      message: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="Message"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditOpen(false);
                    setEditingAppointment(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateAppointment}
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >


  );
};

export default AdminDashboard;