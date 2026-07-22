import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Navbar/Footer/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DoctorProfile from "./pages/DoctorProfile";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import Appointments from "./components/admin/Appointments";
import AdminDoctorProfile from "./components/admin/AdminDoctorProfile";
import AdminSettings from "./components/admin/AdminSettings";
import AdminLogin from "./components/admin/AdminLogin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import GalleryPage from "./pages/GalleryPage";
import ClinicGallery from "./pages/ClinicGallery";
import MachineGallery from "./pages/MachineGallery";
import TreatmentGallery from "./pages/TreatmentGallery";
import Gallery from "./components/admin/AdminGallery";
import Testimonials from "./components/admin/AdminTestimonials";
import FAQ from "./components/admin/AdminFAQ";
import AdminTestimonials from "./components/admin/AdminTestimonials";
import AdminGallery from "./components/admin/AdminGallery";
import AdminFAQ from "./components/admin/AdminFAQ";
import PhysiotherapyServices from "./pages/PhysiotherapyServices";
import ToolsEquipment from "./pages/ToolsEquipment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProtectedRoute from "./user/UserProtectedRoute";
import Profile from "./pages/Profile";
import Doctors from "./pages/Doctors";

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/adminlogin";

  return (
    <>
      <ScrollToTop />

      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/services"
          element={<Services />}
        />
        <Route path="/services/physiotherapy" element={<PhysiotherapyServices />} />
        <Route path="/services/tools-equipment" element={<ToolsEquipment />} />
        <Route path="/services/:slug" element={<Services />} />
        <Route
          path="/contact"
          element={
            <Contact />
          }
        />

        <Route
          path="/booking"
          element={
            <UserProtectedRoute>
              <Booking />
            </UserProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/doctors"
          element={<Doctors />}
        />
        <Route
          path="/doctors/:doctorName"
          element={<DoctorProfile />}
        />

        <Route path="/gallery" element={<GalleryPage />} />
        <Route
          path="/gallery/clinic"
          element={<ClinicGallery />}
        />

        <Route
          path="/gallery/machine"
          element={<MachineGallery />}
        />

        <Route
          path="/gallery/treatment"
          element={<TreatmentGallery />}
        />

        <Route path="/blogs" element={<Blogs />} />

        <Route path="/blogs/:id" element={<BlogDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Login */}
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="appointments"
            element={<Appointments />}
          />
          <Route path="/admin/gallery" element={<AdminGallery />} />

          <Route
            path="/admin/testimonials"
            element={<AdminTestimonials />}
          />

          <Route path="/admin/faq" element={<AdminFAQ />} />

          <Route
            path="/admin/doctor-profile"
            element={<AdminDoctorProfile />}
          />
          <Route
            path="settings"
            element={<AdminSettings />}
          />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;