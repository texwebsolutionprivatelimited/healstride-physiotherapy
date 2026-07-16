import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import {
  CalendarDays,
  Users,
  Clock,
  Activity,
  Loader2,
  AlertCircle,
  TrendingUp,
  Image,
  MessageSquare,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { db } from "../../firebase/firebase";


/* ---------- helpers ---------- */

const toDateSafe = (v) => {
  if (!v) return null;

  if (v instanceof Date) return v;

  if (typeof v?.toDate === "function") {
    return v.toDate();
  }

  const d = new Date(v);

  return isNaN(d.getTime()) ? null : d;
};


const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};


const endOfDay = (d) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};


const toInputValue = (d) => (
  d.toISOString().slice(0, 10)
);



const STAT_STYLES = {
  blue: "bg-blue-50 text-blue-600",
  teal: "bg-teal-50 text-teal-600",
  amber: "bg-amber-50 text-amber-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
};



/* ---------- Components ---------- */


const StatCard = ({
  icon: Icon,
  label,
  value,
  tone = "blue"
}) => (
  <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">

    <div className={`grid h-11 w-11 place-items-center rounded-xl ${STAT_STYLES[tone]}`}>
      <Icon className="h-5 w-5" />
    </div>


    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="text-2xl font-semibold text-slate-900">
        {value}
      </p>

    </div>

  </div>
);



/* ---------- Main ---------- */


const RANGE_PRESETS = [
  {
    key: "7",
    label: "Last 7 days",
    days: 7
  },
  {
    key: "30",
    label: "Last 30 days",
    days: 30
  },
  {
    key: "90",
    label: "Last 90 days",
    days: 90
  },
  {
    key: "custom",
    label: "Custom"
  }
];



const AdminDashboard = () => {


  const [appointments, setAppointments] = useState([]);

  const [enquiries, setEnquiries] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [gallery, setGallery] = useState([]);


  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  const [preset, setPreset] = useState("30");


  const today = useMemo(
    () => startOfDay(new Date()),
    []
  );



  const [from, setFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 29);
    return toInputValue(d);
  });


  const [to, setTo] = useState(
    () => toInputValue(new Date())
  );



  /* ---------- Firebase Data ---------- */


  useEffect(() => {


    setLoading(true);


    const appointmentQuery = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc")
    );



    const unsubscribeAppointments =
      onSnapshot(
        appointmentQuery,
        (snapshot) => {

          setAppointments(
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          );

          setLoading(false);

        },

        (error) => {

          setError(error.message);

          setLoading(false);

        }

      );



    const unsubscribeEnquiries =
      onSnapshot(
        collection(db, "enquiries"),
        (snapshot) => {

          setEnquiries(
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          );

        }

      );



    const unsubscribeReviews =
      onSnapshot(
        collection(db, "reviews"),
        (snapshot) => {

          setReviews(
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          );

        }

      );



    const unsubscribeGallery =
      onSnapshot(
        collection(db, "gallery"),
        (snapshot) => {

          setGallery(
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          );

        }

      );



    return () => {

      unsubscribeAppointments();

      unsubscribeEnquiries();

      unsubscribeReviews();

      unsubscribeGallery();

    };


  }, []);





  /* ---------- Date Range ---------- */


  const range = useMemo(() => {


    if (preset === "custom") {

      const f = from
        ? startOfDay(new Date(from))
        : null;


      const t = to
        ? endOfDay(new Date(to))
        : null;


      return {
        from: f,
        to: t
      };

    }



    const days =
      RANGE_PRESETS.find(
        x => x.key === preset
      )?.days || 30;



    const f = new Date(today);

    f.setDate(
      f.getDate() - (days - 1)
    );



    return {

      from: startOfDay(f),

      to: endOfDay(new Date())

    };


  }, [
    preset,
    from,
    to,
    today
  ]);





  /* ---------- Filter ---------- */


  const filteredAppointments =
    useMemo(() => {


      if (!range.from || !range.to)
        return appointments;



      return appointments.filter(item => {


        const date =
          toDateSafe(item.date)
          ||
          toDateSafe(item.createdAt);



        return (
          date &&
          date >= range.from &&
          date <= range.to
        );


      });


    }, [
      appointments,
      range
    ]);





  /* ---------- Stats ---------- */


  const stats =
    useMemo(() => {


      const todayStart =
        startOfDay(new Date())
          .getTime();



      const todayEnd =
        endOfDay(new Date())
          .getTime();



      return filteredAppointments.reduce(
        (acc, item) => {


          acc.total++;



          const date =
            toDateSafe(item.date)
            ||
            toDateSafe(item.createdAt);



          if (
            date &&
            date.getTime() >= todayStart &&
            date.getTime() <= todayEnd
          ) {

            acc.today++;

          }



          const status =
            String(
              item.status || "pending"
            )
              .toLowerCase()
              .trim();



          if (status === "confirmed")
            acc.confirmed++;


          else if (status === "completed")
            acc.completed++;


          else if (status === "cancelled")
            acc.cancelled++;


          else
            acc.pending++;



          return acc;


        },
        {

          total: 0,
          today: 0,
          pending: 0,
          confirmed: 0,
          completed: 0,
          cancelled: 0

        }

      );


    }, [
      filteredAppointments
    ]);


  return (
    <div className="min-h-screen bg-slate-50">

      <main className="mx-auto max-w-7xl px-4 md:px-6 py-6">


        {/* Header */}

        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Manage appointments, enquiries and clinic activities.
            </p>

          </div>



          <div className="flex gap-2">

            {RANGE_PRESETS.map((item) => (

              <button
                key={item.key}
                onClick={() => setPreset(item.key)}
                className={`px-4 py-2 rounded-xl text-sm transition ${preset === item.key
                  ?
                  "bg-teal-600 text-white"
                  :
                  "bg-white border text-slate-600"
                  }`}
              >

                {item.label}

              </button>

            ))}

          </div>


        </header>




        {/* Error */}

        {
          error &&
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-red-600">

            <AlertCircle size={18} />

            {error}

          </div>
        }





        {
          loading ?

            <div className="grid place-items-center py-20">

              <Loader2 className="animate-spin text-teal-600" />

            </div>


            :

            <>


              {/* Statistics */}


              <section className="
grid 
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-6
gap-4
">


                <StatCard

                  icon={CalendarDays}

                  label="Appointments"

                  value={stats.total}

                  tone="blue"

                />



                <StatCard

                  icon={Activity}

                  label="Today"

                  value={stats.today}

                  tone="teal"

                />



                <StatCard

                  icon={Clock}

                  label="Pending"

                  value={stats.pending}

                  tone="amber"

                />



                <StatCard

                  icon={Users}

                  label="Confirmed"

                  value={stats.confirmed}

                  tone="green"

                />



                <StatCard

                  icon={MessageSquare}

                  label="Enquiries"

                  value={enquiries.length}

                  tone="purple"

                />



                <StatCard

                  icon={Image}

                  label="Gallery Images"

                  value={gallery.length}

                  tone="blue"

                />


              </section>





              {/* Chart */}


              <section className="
mt-8
bg-white
rounded-3xl
shadow-sm
p-5
">


                <div className="flex items-center gap-2 mb-5">

                  <TrendingUp
                    className="text-teal-600"
                  />

                  <h2 className="font-semibold text-lg">
                    Appointments Analytics
                  </h2>

                </div>




                <div className="h-[350px]">


                  <ResponsiveContainer width="100%" height="100%">


                    <BarChart data={[
                      {
                        name: "Pending",
                        value: stats.pending
                      },
                      {
                        name: "Confirmed",
                        value: stats.confirmed
                      },
                      {
                        name: "Completed",
                        value: stats.completed
                      },
                      {
                        name: "Cancelled",
                        value: stats.cancelled
                      }
                    ]}>



                      <CartesianGrid
                        strokeDasharray="3 3"
                      />


                      <XAxis
                        dataKey="name"
                      />


                      <YAxis
                        allowDecimals={false}
                        domain={[0, "dataMax + 1"]}
                      />


                      <Tooltip />


                      <Bar

                        dataKey="value"

                        fill="#14b8a6"

                        radius={[8, 8, 0, 0]}

                      />



                    </BarChart>


                  </ResponsiveContainer>


                </div>


              </section>






              {/* Recent Appointment */}



              <section className="
mt-8
bg-white
rounded-3xl
shadow-sm
p-5
">


                <h2 className="text-xl font-bold mb-5">

                  Recent Appointments

                </h2>





                <div className="overflow-x-auto">


                  <table className="w-full min-w-[900px]">


                    <thead className="bg-teal-600 text-white">


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


                      </tr>


                    </thead>




                    <tbody>


                      {

                        appointments
                          .slice(0, 5)
                          .map(item => (


                            <tr
                              key={item.id}
                              className="border-b hover:bg-slate-50"
                            >


                              <td className="p-4">
                                {item.name}
                              </td>


                              <td className="p-4">
                                {item.phone}
                              </td>


                              <td className="p-4">
                                {item.email}
                              </td>


                              <td className="p-4">
                                {item.condition}
                              </td>


                              <td className="p-4">
                                {item.date}
                              </td>


                              <td className="p-4">
                                {item.time}
                              </td>




                              <td className="p-4">


                                <span
                                  className={`
px-3
py-1
rounded-full
text-xs
font-medium

${item.status === "confirmed"
                                      ?
                                      "bg-green-100 text-green-700"

                                      :

                                      item.status === "completed"

                                        ?

                                        "bg-blue-100 text-blue-700"


                                        :

                                        item.status === "cancelled"

                                          ?

                                          "bg-red-100 text-red-700"


                                          :

                                          "bg-yellow-100 text-yellow-700"

                                    }

`}
                                >


                                  {
                                    (item.status || "pending")
                                      .charAt(0)
                                      .toUpperCase()
                                    +
                                    (item.status || "pending")
                                      .slice(1)
                                  }


                                </span>


                              </td>



                            </tr>


                          ))


                      }




                      {
                        appointments.length === 0 &&

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center p-6 text-slate-500"
                          >

                            No appointments found

                          </td>

                        </tr>

                      }


                    </tbody>


                  </table>


                </div>



              </section>





              {/* Extra Summary */}


              <section className="
mt-8
grid
grid-cols-1
md:grid-cols-3
gap-4
">


                <div className="bg-white rounded-2xl p-5 shadow-sm">

                  <h3 className="font-semibold">
                    Completed
                  </h3>

                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {stats.completed}
                  </p>

                </div>



                <div className="bg-white rounded-2xl p-5 shadow-sm">

                  <h3 className="font-semibold">
                    Cancelled
                  </h3>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {stats.cancelled}
                  </p>

                </div>



                <div className="bg-white rounded-2xl p-5 shadow-sm">

                  <h3 className="font-semibold">
                    Total Reviews
                  </h3>

                  <p className="text-3xl font-bold text-teal-600 mt-2">
                    {reviews.length}
                  </p>

                </div>



              </section>




            </>

        }



      </main>

    </div>
  );


};


export default AdminDashboard;