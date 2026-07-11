import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Clinic Info */}

          <div>

            <h2 className="text-3xl font-bold text-teal-400 mb-5">
              HealStride
            </h2>

            <p className="text-gray-300 leading-8">
              Helping you recover faster with personalized
              physiotherapy, rehabilitation, and wellness
              treatments delivered by experienced specialists.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>
                <a href="#" className="hover:text-teal-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-teal-400 transition">
                  About
                </a>
              </li>

              <li>
                <a href="#services" className="hover:text-teal-400 transition">
                  Services
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-teal-400 transition">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Treatments
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>Knee Pain</li>
              <li>Back Pain</li>
              <li>Neck Pain</li>
              <li>Sports Injury</li>
              <li>Stroke Rehabilitation</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-6 text-gray-300">

              <div className="flex gap-4">
                <FaPhoneAlt className="text-teal-400 mt-1" />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex gap-4">
                <FaEnvelope className="text-teal-400 mt-1" />
                <span>healstride@gmail.com</span>
              </div>

              <div className="flex gap-4">
                <FaMapMarkerAlt className="text-teal-400 mt-1" />
                <span>
                  HealStride Physiotherapy &
                  Wellness Centre,
                  Hyderabad, Telangana
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400">

          © {new Date().getFullYear()} HealStride Physiotherapy &
          Wellness Centre. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;