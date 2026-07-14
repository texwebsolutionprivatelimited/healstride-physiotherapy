import { Link } from "react-router-dom";
import { NAVIGATION } from "../../../constants/navigation";
import logo from "../../../assets/images/logo.png"; // apna path check kar lo

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="HealStride Logo"
            className="h-16 w-auto"
          />

          <div>
            <h1 className="text-2xl font-bold text-teal-700">
              HealStride
            </h1>
            <p className="text-xs text-gray-500">
              Physiotherapy & Wellness
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-teal-700 transition-colors duration-300"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="bg-teal-700 text-white px-5 py-2 rounded-xl hover:bg-teal-800 transition-all duration-300"
        >
          Book Appointment
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;