import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import gallery1 from "../../assets/images/gallery/gallery1.jpg";
import gallery2 from "../../assets/images/gallery/gallery2.jpg";
import gallery3 from "../../assets/images/gallery/gallery3.jpg";
import gallery4 from "../../assets/images/gallery/gallery4.jpg";
import gallery5 from "../../assets/images/gallery/gallery5.jpg";

const GalleryPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <p className="text-center text-teal-600 uppercase tracking-[5px] font-semibold text-sm sm:text-base">
          Our Gallery
        </p>

        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mt-4">
          Inside HealStride
        </h2>

        <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto leading-7 md:leading-8 text-sm sm:text-base">
          Explore our modern physiotherapy clinic, advanced equipment,
          comfortable treatment rooms and welcoming environment designed
          for your recovery.
        </p>

        {/* Gallery */}

        <div className="grid lg:grid-cols-3 gap-6 mt-12 md:mt-16">

          {/* Left Large */}

          <div className="overflow-hidden rounded-3xl shadow-lg group h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              src={gallery1}
              alt="Clinic"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          {/* Middle */}

          <div className="flex flex-col gap-6">

            <div className="overflow-hidden rounded-3xl shadow-lg group h-[220px] sm:h-[240px]">
              <img
                src={gallery2}
                alt="Treatment"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

            <div className="overflow-hidden rounded-3xl shadow-lg group h-[220px] sm:h-[240px]">
              <img
                src={gallery3}
                alt="Equipment"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

          </div>

          {/* Right */}

          <div className="flex flex-col gap-6">

            <div className="overflow-hidden rounded-3xl shadow-lg group h-[220px] sm:h-[240px]">
              <img
                src={gallery4}
                alt="Reception"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

            <div className="overflow-hidden rounded-3xl shadow-lg group h-[220px] sm:h-[240px]">
              <img
                src={gallery5}
                alt="Exercise"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

          </div>

        </div>

        {/* View Gallery Button */}

        <div className="flex justify-center mt-12 md:mt-16">

          <Link
            to="/gallery"
            className="
            bg-teal-600
            hover:bg-teal-700
            transition
            text-white
            px-8
            py-4
            rounded-xl
            flex
            items-center
            gap-3
            shadow-lg
            font-medium
            "
          >
            View Complete Gallery
            <FaArrowRight />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default GalleryPreview;