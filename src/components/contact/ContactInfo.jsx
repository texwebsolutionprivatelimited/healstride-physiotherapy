import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 h-full">

      <h3 className="text-3xl font-bold mb-8">
        Contact Information
      </h3>

      <div className="space-y-8">

        <div className="flex gap-4">
          <FaPhoneAlt className="text-teal-600 text-2xl mt-1" />
          <div>
            <h4 className="font-semibold">Phone</h4>
            <p className="text-gray-600">+91 XXXXX XXXXX</p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaEnvelope className="text-teal-600 text-2xl mt-1" />
          <div>
            <h4 className="font-semibold">Email</h4>
            <p className="text-gray-600">
              healstride@gmail.com
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaMapMarkerAlt className="text-teal-600 text-2xl mt-1" />
          <div>
            <h4 className="font-semibold">Address</h4>
            <p className="text-gray-600">
              HealStride Physiotherapy &
              Wellness Centre,
              <br />
              Hyderabad, Telangana
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <FaClock className="text-teal-600 text-2xl mt-1" />
          <div>
            <h4 className="font-semibold">
              Working Hours
            </h4>

            <p className="text-gray-600">
              Monday - Saturday
            </p>

            <p className="font-medium">
              9:00 AM - 8:00 PM
            </p>

            <p className="mt-3 text-gray-600">
              Sunday
            </p>

            <p className="font-medium">
              Closed
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ContactInfo;