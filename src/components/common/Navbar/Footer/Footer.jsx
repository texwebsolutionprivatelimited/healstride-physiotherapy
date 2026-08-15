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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Clinic Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-3 sm:mb-5">
              HealStride
            </h2>

            <p className="text-gray-300 leading-relaxed sm:leading-7 text-xs sm:text-base">
              {t("footer.desc")}
            </p>

            <div className="flex gap-3 sm:gap-4 mt-5 sm:mt-8">
              <a
                href="#"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition duration-300 hover:scale-110 text-xs sm:text-base"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition duration-300 hover:scale-110 text-xs sm:text-base"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition duration-300 hover:scale-110 text-xs sm:text-base"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-6 text-teal-400 sm:text-white">
              {t("footer.quickLinks")}
            </h3>

            <ul className="space-y-2.5 sm:space-y-3 text-gray-300 text-xs sm:text-base">
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
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-6 text-teal-400 sm:text-white">
              {t("footer.treatments")}
            </h3>

            <ul className="space-y-2.5 sm:space-y-3 text-gray-300 text-xs sm:text-base">
              <li>{t("footer.kneePain")}</li>
              <li>{t("footer.backPain")}</li>
              <li>{t("footer.neckPain")}</li>
              <li>{t("footer.sportsInjury")}</li>
              <li>{t("footer.strokeRehab")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-6 text-teal-400 sm:text-white">
              {t("footer.contact")}
            </h3>

            <div className="space-y-3 sm:space-y-5 text-gray-300 text-xs sm:text-base">
              <div className="flex gap-2.5 sm:gap-3 items-start">
                <FaPhoneAlt className="text-teal-400 mt-1 shrink-0 text-xs sm:text-base" />
                <span>+91 95692 74008</span>
              </div>

              <div className="flex gap-2.5 sm:gap-3 items-start">
                <FaEnvelope className="text-teal-400 mt-1 shrink-0 text-xs sm:text-base" />
                <span className="break-all">healstride@gmail.com</span>
              </div>

              <div className="flex gap-2.5 sm:gap-3 items-start">
                <FaMapMarkerAlt className="text-teal-400 mt-1 shrink-0 text-xs sm:text-base" />
                <span>{t("footer.address")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-center text-gray-400 text-xs sm:text-sm">
          © {new Date().getFullYear()} HealStride Physiotherapy & Wellness Centre. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;