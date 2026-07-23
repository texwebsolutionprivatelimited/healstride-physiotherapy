import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import { db } from "../../firebase/firebase";

import {
  useEffect,
  useMemo,
  useState,
} from "react";



const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];



const Appointments = () => {


  const [appointments, setAppointments] = useState([]);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewAppointment, setViewAppointment] = useState(null);

  const [confirmEditAppointment, setConfirmEditAppointment] = useState(null);

  const [query, setQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");


  const [isEditOpen, setIsEditOpen] = useState(false);


  const [editingAppointment, setEditingAppointment] =
    useState(null);



  /* ---------------- Firebase Real Time Fetch ---------------- */


  useEffect(() => {


    const unsubscribe = onSnapshot(

      collection(db, "appointments"),

      (snapshot) => {


        const data = snapshot.docs.map(docSnap => ({

          id: docSnap.id,

          ...docSnap.data(),

          status:
            docSnap.data().status || "pending"

        }));


        setAppointments(data);


      },


      (error) => {

        console.log(error);

      }


    );



    return () => unsubscribe();


  }, []);






  /* ---------------- Update Status ---------------- */
  const handleView = (appointment) => {
    setViewAppointment(appointment);
    setIsViewOpen(true);
  };

  const handleStatusChange = async (
    id,
    status
  ) => {


    try {


      await updateDoc(

        doc(db, "appointments", id),

        {
          status
        }

      );



      setAppointments(prev =>

        prev.map(item =>

          item.id === id

            ?

            {
              ...item,
              status
            }

            :

            item

        )

      );



    }

    catch (error) {

      console.log(error);

    }
  };

  /* ---------------- Delete ---------------- */
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this appointment?"
      );

    if (!confirmDelete)
      return;
    try {
      await deleteDoc(
        doc(db, "appointments", id)
      );
      setAppointments(prev =>

        prev.filter(
          item => item.id !== id
        )

      );
    }

    catch (error) {

      console.log(error);

    }


  };







  /* ---------------- Edit ---------------- */


  const handleEdit = (appointment) => {


    setEditingAppointment(
      {
        ...appointment
      }
    );


    setIsEditOpen(true);


  };






  const handleUpdateAppointment =
    async () => {


      try {


        await updateDoc(

          doc(
            db,
            "appointments",
            editingAppointment.id
          ),

          {

            name: editingAppointment.name,

            phone: editingAppointment.phone,

            email: editingAppointment.email,

            condition: editingAppointment.condition,

            date: editingAppointment.date,

            time: editingAppointment.time,

            message:
              editingAppointment.message || ""

          }

        );




        setAppointments(prev =>

          prev.map(item =>

            item.id === editingAppointment.id

              ?

              editingAppointment

              :

              item

          )

        );



        setIsEditOpen(false);

        setEditingAppointment(null);



      }


      catch (error) {

        console.log(error);

      }


    };








  /* ---------------- Search + Status Filter ---------------- */



  const filteredAppointments =
    useMemo(() => {


      const search =
        query.toLowerCase();



      return appointments.filter(item => {


        const matchesSearch =


          item.name
            ?.toLowerCase()
            .includes(search)


          ||

          item.email
            ?.toLowerCase()
            .includes(search)


          ||

          item.condition
            ?.toLowerCase()
            .includes(search);





        const matchesStatus =


          statusFilter === "all"

          ||

          item.status === statusFilter;





        return (
          matchesSearch &&
          matchesStatus
        );



      });


    }, [
      appointments,
      query,
      statusFilter
    ]);

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto p-4 md:p-6">


        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Appointments
        </h1>

        <p className="mt-3 text-slate-600 text-base my-3">
          View, manage and track all patient appointments from one place.
        </p>



        {/* Search + Filter */}

        <div className="bg-white rounded-2xl shadow p-5 mb-6">


          <div className="grid md:grid-cols-2 gap-4 ">


            <input

              type="text"

              placeholder="Search patient, email, condition..."

              value={query}

              onChange={(e) => setQuery(e.target.value)}

              className="
w-full
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-teal-500
"

            />



            <select

              value={statusFilter}

              onChange={(e) => setStatusFilter(e.target.value)}

              className="
border
rounded-xl
px-4
py-3
"

            >


              <option value="all">
                All Status
              </option>


              {
                STATUS_OPTIONS.map(status => (

                  <option
                    key={status}
                    value={status}
                  >

                    {
                      status.charAt(0).toUpperCase()
                      +
                      status.slice(1)
                    }

                  </option>

                ))
              }


            </select>


          </div>


        </div>





        {/* Mobile Cards */}

        <div className="grid gap-4 md:hidden">


          {
            filteredAppointments.map((appointment) => (


              <div

                key={appointment.id}

                className="
bg-white
rounded-2xl
shadow
p-5
"

              >


                <h2 className="font-bold text-lg">
                  {appointment.name}
                </h2>


                <p className="text-sm text-slate-600 mt-2">
                  📞 {appointment.phone}
                </p>


                <p className="text-sm text-slate-600">
                  ✉️ {appointment.email}
                </p>


                <p className="text-sm text-slate-600">
                  🩺 {appointment.condition}
                </p>


                <p className="text-sm text-slate-600">
                  📅 {appointment.date}
                </p>


                <p className="text-sm text-slate-600">
                  ⏰ {appointment.time}
                </p>




                <div className="mt-3">


                  <select

                    value={appointment.status}

                    onChange={(e) =>
                      handleStatusChange(
                        appointment.id,
                        e.target.value
                      )
                    }

                    className={`
px-3
py-2
rounded-lg
text-sm

${appointment.status === "confirmed"
                        ?
                        "bg-green-100 text-green-700"

                        :

                        appointment.status === "completed"
                          ?
                          "bg-blue-100 text-blue-700"

                          :

                          appointment.status === "cancelled"
                            ?
                            "bg-red-100 text-red-700"

                            :
                            "bg-yellow-100 text-yellow-700"

                      }

`}

                  >


                    {
                      STATUS_OPTIONS.map(status => (

                        <option
                          key={status}
                          value={status}
                        >

                          {
                            status.charAt(0).toUpperCase()
                            +
                            status.slice(1)
                          }

                        </option>

                      ))
                    }


                  </select>


                </div>
                <div className="flex gap-5 mt-4">

                  <button
                    onClick={() => handleView(appointment)}
                    className="text-green-600"
                  >
                    <Eye size={20} />
                  </button>

                  <button
onClick={() => setConfirmEditAppointment(appointment)}
                    className="text-blue-600"
                  >
                    <Pencil size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>
              </div>
            ))

          }
        </div>
        {/* Desktop Table */}


        <div className="
hidden
md:block
bg-white
rounded-2xl
shadow
overflow-x-auto
">


          <table className="
w-full
min-w-[1000px]
">


            <thead className="
bg-teal-600
text-white
">


              <tr>


                <th className="p-4 text-left">
                  Patient
                </th>


                <th className="p-4 text-left">
                  Phone
                </th>


                <th className="p-4 text-left">
                  Email
                </th>


                <th className="p-4 text-left">
                  Condition
                </th>


                <th className="p-4 text-left">
                  Date
                </th>


                <th className="p-4 text-left">
                  Time
                </th>


                <th className="p-4 text-left">
                  Status
                </th>


                <th className="p-4 text-left">
                  Action
                </th>


              </tr>


            </thead>





            <tbody>


              {

                filteredAppointments.map((appointment) => (


                  <tr

                    key={appointment.id}

                    className="
border-b
hover:bg-slate-50
"

                  >


                    <td className="p-4">
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


                      <select

                        value={appointment.status}

                        onChange={(e) =>
                          handleStatusChange(
                            appointment.id,
                            e.target.value
                          )
                        }

                        className={`

px-3
py-2
rounded-lg
text-sm

${appointment.status === "confirmed"
                            ?
                            "bg-green-100 text-green-700"

                            :

                            appointment.status === "completed"
                              ?
                              "bg-blue-100 text-blue-700"

                              :

                              appointment.status === "cancelled"
                                ?
                                "bg-red-100 text-red-700"

                                :
                                "bg-yellow-100 text-yellow-700"

                          }

`}

                      >


                        {
                          STATUS_OPTIONS.map(status => (

                            <option
                              key={status}
                              value={status}
                            >

                              {
                                status.charAt(0).toUpperCase()
                                +
                                status.slice(1)
                              }

                            </option>

                          ))
                        }


                      </select>


                    </td>





                    <td className="p-4">


                      <div className="flex gap-4">

                        <button
                          onClick={() => handleView(appointment)}
                          className="text-green-600"
                        >
                          <Eye size={18} />
                        </button>

                        <button
onClick={() => setConfirmEditAppointment(appointment)}
                          className="text-blue-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>


                    </td>


                  </tr>


                ))

              }



              {
                filteredAppointments.length === 0 &&

                <tr>

                  <td
                    colSpan="8"
                    className="
text-center
p-6
text-slate-500
"
                  >

                    No appointments found

                  </td>

                </tr>

              }


            </tbody>


          </table>


        </div>







        {/* Edit Modal */}


        {
          isEditOpen &&
          editingAppointment &&

          <div className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
p-4
">


            <div className="
bg-white
rounded-2xl
p-6
w-full
max-w-lg
">


              <h2 className="
text-2xl
font-bold
mb-5
">

                Edit Appointment

              </h2>




              <div className="space-y-3">


                <input

                  className="w-full border rounded-lg p-3"

                  value={editingAppointment.name}

                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      name: e.target.value
                    })
                  }

                />



                <input

                  className="w-full border rounded-lg p-3"

                  value={editingAppointment.phone}

                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      phone: e.target.value
                    })
                  }

                />



                <input

                  className="w-full border rounded-lg p-3"

                  value={editingAppointment.email}

                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      email: e.target.value
                    })
                  }

                />

                <input
                  className="w-full border rounded-lg p-3"
                  value={editingAppointment.condition || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      condition: e.target.value,
                    })
                  }
                  placeholder="Condition"
                />

                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                  value={editingAppointment.date || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      date: e.target.value,
                    })
                  }
                />

                <input
                  type="time"
                  className="w-full border rounded-lg p-3"
                  value={editingAppointment.time || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      time: e.target.value,
                    })
                  }
                />

                <select
                  className="w-full border rounded-lg p-3"
                  value={editingAppointment.status || "Pending"}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <textarea
                  rows={4}
                  className="w-full border rounded-lg p-3"
                  value={editingAppointment.message || ""}
                  onChange={(e) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      message: e.target.value,
                    })
                  }
                  placeholder="Message"
                />




                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={handleUpdateAppointment}
                    className="bg-teal-600 text-white px-5 py-3 rounded-lg hover:bg-teal-700"
                  >
                    Save Changes
                  </button>

                  <button
                    onClick={() => {
                      setIsEditOpen(false);
                      setEditingAppointment(null);
                    }}
                    className="bg-gray-200 px-5 py-3 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>



              </div>


            </div>


          </div>

        }


        {isViewOpen && viewAppointment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg">

              <h2 className="text-2xl font-bold mb-5">
                Appointment Details
              </h2>

              <div className="space-y-3 text-slate-700">

                <p><strong>Name:</strong> {viewAppointment.name}</p>

                <p><strong>Phone:</strong> {viewAppointment.phone}</p>

                <p><strong>Email:</strong> {viewAppointment.email}</p>

                <p><strong>Condition:</strong> {viewAppointment.condition}</p>

                <p><strong>Date:</strong> {viewAppointment.date}</p>

                <p><strong>Time:</strong> {viewAppointment.time}</p>

                <p><strong>Status:</strong> {viewAppointment.status}</p>

                <p><strong>Message:</strong> {viewAppointment.message}</p>

              </div>

              <button
                onClick={() => {
                  setIsViewOpen(false);
                  setViewAppointment(null);
                }}
                className="mt-5 bg-teal-600 text-white px-5 py-3 rounded-lg"
              >
                Close
              </button>

            </div>
          </div>
        )}



      </div>

    </div>
  );


};


export default Appointments;