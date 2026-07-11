const GoogleMap = () => {
  return (
    <div className="rounded-3xl overflow-hidden shadow-xl">

      <iframe
        title="HealStride Location"
        src="https://www.google.com/maps/embed?pb="
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>

    </div>
  );
};

export default GoogleMap;