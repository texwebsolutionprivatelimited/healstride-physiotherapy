const GoogleMap = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-12">

          <p className="uppercase tracking-[5px] text-teal-600 font-semibold">
            Our Location
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
            Visit HealStride Clinic
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto text-lg leading-8">
            Find HealStride Physiotherapy & Wellness Centre in Bhopal and
            experience expert physiotherapy care in a comfortable,
            modern, and patient-friendly environment.
          </p>

        </div>

        {/* Google Map */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

          <iframe
            title="HealStride Location"
            src="https://maps.google.com/maps?q=Bhopal&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

      </div>
    </section>
  );
};

export default GoogleMap;