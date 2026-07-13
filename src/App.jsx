import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import Navbar from "./components/common/Navbar/Navbar";
import Hero from "./components/home/Hero";
import GoogleRating from "./components/home/GoogleRating";
import TreatmentSlider from "./components/home/TreatmentSlider";
import Services from "./components/home/Services";
import WhyChooseUs from "./components/home/WhyChooseUs";
import OurServices from "./components/home/OurServices";
import Conditions from "./components/home/Conditions";
import GalleryPreview from "./components/home/GalleryPreview";
import Specialists from "./components/home/Specialists";
import Testimonials from "./components/home/Testimonials";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/Navbar/Footer/Footer";

function App() {
  return (
    <Routes>
      {/* Main Website */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
            <GoogleRating />
            <TreatmentSlider />
            <Services />
            <WhyChooseUs />
            <OurServices />
            <Conditions />
            <GalleryPreview />
            <Specialists />
            <Testimonials />
            <Contact />
            <Footer />
          </>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />
    </Routes>
  );
}

export default App;