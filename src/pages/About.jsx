import AboutHero from "../components/about/AboutHero";
import ClinicIntro from "../components/about/ClinicIntro";
import MissionVision from "../components/about/MissionVision";
import OurSpecialities from "../components/about/OurSpecialities";
import WhyPatientsTrustUs from "../components/about/WhyPatientsTrustUs";
import CTA from "../components/about/CTA";
import CoreValues from "../components/about/CoreValues";
import TreatmentProcess from "../components/about/TreatmentProcess";
import FAQSection from "../components/about/FAQSection";

const About = () => {
    return (
        <>
            <AboutHero />
            <ClinicIntro />
            <MissionVision />
            <CoreValues />
            <OurSpecialities />
            <TreatmentProcess />
            <WhyPatientsTrustUs />
            <FAQSection />
            <CTA />
        </>
    );
};

export default About;
