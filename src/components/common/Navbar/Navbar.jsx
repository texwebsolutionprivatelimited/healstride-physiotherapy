import { NAVIGATION } from "../../../constants/navigation";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-teal-700">
          HealStride
        </h1>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer text-gray-700 hover:text-teal-700 transition-colors duration-300"
            >
              {item.title}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="bg-teal-700 text-white px-5 py-2 rounded-xl hover:bg-teal-800 transition-all duration-300">
          Book Appointment
        </button>

      </div>
    </nav>
  );
};

export default Navbar;