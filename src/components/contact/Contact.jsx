import AppointmentForm from "./AppointmentForm";
import ContactInfo from "./ContactInfo";
import GoogleMap from "./GoogleMap";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-teal-600 font-semibold mb-4">
            CONTACT US
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Book Your Appointment
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Have questions or want to schedule an appointment?
            Fill out the form below and our team will contact you shortly.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <AppointmentForm />

          <ContactInfo />

        </div>

        <div className="mt-16">

          <GoogleMap />

        </div>

      </div>
    </section>
  );
};

export default Contact;