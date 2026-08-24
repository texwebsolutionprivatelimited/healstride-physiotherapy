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
import { useState } from "react";

const Footer = () => {
  const { t } = useTranslation();
  const [showTerms, setShowTerms] = useState(false);

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
                href="https://www.instagram.com/healstride.physio/"
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
  <Link
    to="/about"
    onClick={() => window.scrollTo(0, 0)}
    className="hover:text-teal-400 transition"
  >
    {t("navbar.about")}
  </Link>
</li>

    <li>
      <Link
        to="/services"
        className="hover:text-teal-400 transition"
      >
        {t("navbar.services")}
      </Link>
    </li>

    <li>
      <Link to="/contact" className="hover:text-teal-400 transition">
        {t("navbar.contact")}
      </Link>
    </li>

    {/* Admin Panel */}
    <li>
      <Link
        to="/adminlogin"
        className="hover:text-teal-400 transition"
      >
        Admin Panel
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
                <span>+91 82525 80389</span>
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
  <div className="w-full px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-gray-400 text-xs sm:text-sm">
    
    {/* Copyright */}
    <div>
      © {new Date().getFullYear()} HealStride Physiotherapy & Wellness
      Centre. {t("footer.rights")}
    </div>

    {/* Terms & Policy Button */}
    <button
      type="button"
      onClick={() => setShowTerms(true)}
      className="text-gray-400 hover:text-teal-400 transition font-medium"
    >
      Terms & Policy
    </button>

  </div>
</div>
          {/* Terms & Policy Modal */}
      {showTerms && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowTerms(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 sm:px-8 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Terms & Policy
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  HealStride Physiotherapy & Wellness Centre
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition text-xl"
                aria-label="Close terms and policy"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 sm:px-8 py-6 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  1. Appointments
                </h3>

                <p>
                  Appointments are subject to availability and should be
                  scheduled in advance whenever possible. Patients are
                  requested to provide accurate contact and appointment
                  information while booking.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  2. Cancellation & Rescheduling
                </h3>

                <p>
                  If you are unable to attend your scheduled appointment,
                  please contact the clinic as early as possible so that the
                  appointment can be cancelled or rescheduled.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  3. Patient Information
                </h3>

                <p>
                  Patients are responsible for providing accurate and
                  complete information relevant to their appointment and
                  treatment. Any information submitted through this website
                  should be accurate to the best of the patient's knowledge.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  4. Treatment Disclaimer
                </h3>

                <p>
                  Information provided on this website is intended for general
                  informational purposes and should not be considered a
                  substitute for professional medical assessment or treatment.
                  Individual treatment plans are determined by qualified
                  healthcare professionals based on the patient's condition.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  5. Privacy
                </h3>

                <p>
                  Personal information provided through appointment forms,
                  enquiries, or other website interactions will be handled
                  responsibly and used for purposes related to providing
                  clinic services, responding to enquiries, and managing
                  appointments.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  6. Website Usage
                </h3>

                <p>
                  Users agree to use this website only for lawful purposes.
                  Any attempt to misuse, disrupt, damage, or gain unauthorized
                  access to the website or its administrative systems is
                  prohibited.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  7. Changes to These Policies
                </h3>

                <p>
                  HealStride Physiotherapy & Wellness Centre may update these
                  terms and policies when necessary. Updated information will
                  be reflected on this website.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  8. Contact
                </h3>

                <p>
                  For questions regarding these terms, appointments, or clinic
                  services, please contact HealStride Physiotherapy & Wellness
                  Centre using the contact information provided on this
                  website.
                </p>
              </section>

            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 sm:px-8 py-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};

export default Footer;