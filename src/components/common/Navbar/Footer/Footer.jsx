import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Clinic Info */}
          <div>
            <h2 className="text-3xl font-bold text-teal-400 mb-5">
              HealStride
            </h2>

            <p className="text-gray-300 leading-7 text-sm sm:text-base">
              {t("footer.desc")}
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-6">
              {t("footer.quickLinks")}
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>
                <Link to="/" className="hover:text-teal-400 transition">
                  {t("navbar.home")}
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-teal-400 transition">
                  {t("navbar.about")}
                </Link>
              </li>

              <li>
                <Link to="/services" className="hover:text-teal-400 transition">
                  {t("navbar.services")}
                </Link>
              </li>

              <li>
                <Link to="/contact" className="hover:text-teal-400 transition">
                  {t("navbar.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-6">
              {t("footer.treatments")}
            </h3>

            <ul className="space-y-3 text-gray-300">
              <li>{t("footer.kneePain")}</li>
              <li>{t("footer.backPain")}</li>
              <li>{t("footer.neckPain")}</li>
              <li>{t("footer.sportsInjury")}</li>
              <li>{t("footer.strokeRehab")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-6">
              {t("footer.contact")}
            </h3>

            <div className="space-y-5 text-gray-300">
              <div className="flex gap-3 items-start">
                <FaPhoneAlt className="text-teal-400 mt-1 shrink-0" />
                <span>+91 95692 74008</span>
              </div>

              <div className="flex gap-3 items-start">
                <FaEnvelope className="text-teal-400 mt-1 shrink-0" />
                <span className="break-all">healstride@gmail.com</span>
              </div>

              <div className="flex gap-3 items-start">
                <FaMapMarkerAlt className="text-teal-400 mt-1 shrink-0" />
                <span>{t("footer.address")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} HealStride Physiotherapy & Wellness Centre. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;