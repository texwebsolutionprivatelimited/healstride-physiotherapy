const AdminSettings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Clinic Settings
      </h1>

      <p className="text-slate-500 mt-2">
        Manage clinic contact information.
      </p>

      <div className="bg-white rounded-2xl shadow p-6 mt-6">

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Clinic Address"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Working Hours"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Phone"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="WhatsApp"
            className="border rounded-xl p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Instagram Link"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Facebook Link"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="LinkedIn Link"
            className="border rounded-xl p-3"
          />

        </div>

        <button className="mt-5 bg-teal-600 text-white px-6 py-3 rounded-xl">
          Save Settings
        </button>

      </div>
    </div>
  );
};

export default AdminSettings;