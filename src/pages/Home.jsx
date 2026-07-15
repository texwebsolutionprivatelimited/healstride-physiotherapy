import Footer from "../components/common/Navbar/Footer/Footer";
import Conditions from "../components/home/Conditions";
import GalleryPreview from "../components/home/GalleryPreview";
import GoogleRating from "../components/home/GoogleRating";
import Hero from "../components/home/Hero";
import OurServices from "../components/home/OurServices";
import Specialists from "../components/home/Specialists";
import Testimonials from "../components/home/Testimonials";
import WhyChooseUs from "../components/home/WhyChooseUs";
import AppointmentForm from "../components/contact/AppointmentForm";
import TreatmentSlider from "../components/home/TreatmentSlider";

const Home = () => {
  return (
    <>
      <Hero /> 
      <GoogleRating /> 
      <TreatmentSlider /> 
      <WhyChooseUs /> 
      <OurServices /> 
      <Conditions /> 
      <GalleryPreview /> 
      <Specialists /> 
       <AppointmentForm />
      <Testimonials /> 
       
    </>
  );
};

export default Home;