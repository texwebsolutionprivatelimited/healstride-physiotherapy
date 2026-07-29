import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Navbar/Footer/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";

import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Specialists from "./components/home/Specialists";

import GalleryPage from "./pages/GalleryPage";
import ClinicGallery from "./pages/ClinicGallery";
import MachineGallery from "./pages/MachineGallery";
import TreatmentGallery from "./pages/TreatmentGallery";

import PhysiotherapyServices from "./pages/PhysiotherapyServices";
import ToolsEquipment from "./pages/ToolsEquipment";
import ReviewForm from "./pages/ReviewForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import UserProtectedRoute from "./user/UserProtectedRoute";
import ProtectedRoute from "./components/admin/ProtectedRoute";


import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import Appointments from "./components/admin/Appointments";
import AdminDoctorProfile from "./components/admin/AdminDoctorProfile";
import AdminSettings from "./components/admin/AdminSettings";
import AdminLogin from "./components/admin/AdminLogin";
import AdminTestimonials from "./components/admin/AdminTestimonials";
import AdminGallery from "./components/admin/AdminGallery";
import AdminFAQ from "./components/admin/AdminFAQ";
import AdminBlogs from "./components/admin/AdminBlogs";

import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/adminlogin";

  return (
    <>
      <ScrollToTop />
      <ScrollToHash />

      {!isAdminPage && <Navbar />}
        {!isAdminPage && <AnimatedBackground />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />
        <Route
          path="/services/physiotherapy"
          element={<PhysiotherapyServices />}
        />
        <Route
          path="/services/tools-equipment"
          element={<ToolsEquipment />}
        />
        <Route path="/services/:slug" element={<Services />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/booking"
          element={
            <UserProtectedRoute>
              <Booking />
            </UserProtectedRoute>
          }
        />

        <Route path="/review" element={<ReviewForm />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route
          path="/doctors/:doctorName"
          element={<DoctorProfile />}
        />

        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/clinic" element={<ClinicGallery />} />
        <Route path="/gallery/machine" element={<MachineGallery />} />
        <Route
          path="/gallery/treatment"
          element={<TreatmentGallery />}
        />

        {/* Blogs */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* Admin Login */}
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Admin */}
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
          <Route
            path="gallery"
            element={<AdminGallery />}
          />
          <Route
            path="testimonials"
            element={<AdminTestimonials />}
          />
          <Route
            path="/admin/faq"
            element={<AdminFAQ />}
          />
          <Route
            path="faq"
            element={<AdminFAQ />}
          />
          <Route
            path="/admin/blogs"
            element={<AdminBlogs />}
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