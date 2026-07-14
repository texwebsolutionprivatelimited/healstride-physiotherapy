import ServiceHero from "../components/service/ServiceHero";
import ServicesCTA from "../components/service/ServicesCTA";
import ServicesGrid from "../components/service/ServicesGrid";


const Services = () => {
  return (
    <div className="bg-slate-50">

      <ServiceHero />

      <ServicesGrid />

      <ServicesCTA />

    </div>
  );
};

export default Services;