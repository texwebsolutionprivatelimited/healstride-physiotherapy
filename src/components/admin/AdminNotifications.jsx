import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Bell,
  Calendar,
  MessageCircleQuestion,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";

const AdminNotifications = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [appointments, setAppointments] = useState([]);
const [faqSubmissions, setFaqSubmissions] = useState([]);
const [testimonials, setTestimonials] = useState([]);

  // ---------------- Appointments ----------------

  useEffect(() => {
    const q = query(
  collection(db, "faqSubmissions"),
  where("notificationRead", "==", false)
);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
    });

    return () => unsubscribe();
  }, []);

  // ---------------- FAQs ----------------

  useEffect(() => {
  const q = query(
    collection(db, "faqSubmissions"),
    where("notificationRead", "==", false)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {

    console.log("FAQ Submission Count:", snapshot.docs.length);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(data);

    setFaqSubmissions(data);
  });

  return () => unsubscribe();
}, []);

// ---------------- Testimonials ----------------

useEffect(() => {
  const q = query(
    collection(db, "testimonials"),
    where("notificationRead", "==", false)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setTestimonials(data);
  });

  return () => unsubscribe();
}, []);

  // ---------------- Appointment Notifications ----------------

  const appointmentNotifications = appointments.map((item) => ({
    id: item.id,
    type: "appointment",
    title: "New Appointment",
    message: `${item.name} booked an appointment.`,
    time: "Just now",
    redirect: "/admin/appointments",
  }));

  // ---------------- FAQ Notifications ----------------

  const faqNotifications = faqSubmissions.map((item) => ({
  id: item.id,
  type: "faq",
  title: "New FAQ Submitted",
  message: `${item.name} asked: ${item.question}`,
  time: "Just now",
  redirect: "/admin/faq",
}));

  // ---------------- Temporary Testimonial ----------------

  const testimonialNotifications = testimonials.map((item) => ({
  id: item.id,
  type: "testimonial",
  title: "New Testimonial",
  message: `${item.name} submitted a review.`,
  time: "Just now",
  redirect: "/admin/testimonials",
}));

  // ---------------- Combine Notifications ----------------

  const notifications = [
    ...appointmentNotifications,
    ...faqNotifications,
    ...testimonialNotifications,
  ];

  // ---------------- Icons ----------------

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return (
          <Calendar
            size={18}
            className="text-teal-600"
          />
        );

      case "faq":
        return (
          <MessageCircleQuestion
            size={18}
            className="text-orange-500"
          />
        );

      case "testimonial":
        return (
          <Star
            size={18}
            className="text-purple-600"
          />
        );

      default:
        return <Bell size={18} />;
    }
  };

  // ---------------- View Notification ----------------

  const handleView = async (item) => {
  try {

    if (item.type === "appointment") {
      await updateDoc(
        doc(db, "appointments", item.id),
        {
          notificationRead: true,
        }
      );
    }

    if (item.type === "testimonial") {
  await updateDoc(
    doc(db, "testimonials", item.id),
    {
      notificationRead: true,
    }
  );
}

    if (item.type === "faq") {
      await updateDoc(
        doc(db, "faqSubmissions", item.id),
        {
          notificationRead: true,
        }
      );
    }

    setOpen(false);

    navigate(item.redirect);

  } catch (error) {
    console.error("Notification Error:", error);
  }
};

  return (
    <div className="relative">
      {/* Bell */}

      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition"
      >
        <Bell size={24} />

        {notifications.length > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              bg-red-500
              text-white
              text-[10px]
              font-bold
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* Popup */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-[370px]
            bg-white
            rounded-2xl
            shadow-2xl
            border
            z-50
            overflow-hidden
          "
        >
          <div className="flex items-center gap-3 p-5 border-b">

  <button
    onClick={() => setOpen(false)}
    className="
      p-2
      rounded-full
      hover:bg-slate-100
      transition
    "
  >
    <ArrowLeft size={20} />
  </button>

  <h2 className="text-lg font-bold">
    Notifications
  </h2>

</div>

          <div className="max-h-[420px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b hover:bg-slate-50 transition"
                >
                  <div className="flex items-start gap-3">
                    {getIcon(item.type)}

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-600 mt-1">
                        {item.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        {item.time}
                      </p>

                      <button
                        onClick={() => handleView(item)}
                        className="
                          mt-3
                          bg-teal-600
                          hover:bg-teal-700
                          text-white
                          text-sm
                          px-4
                          py-2
                          rounded-lg
                        "
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;