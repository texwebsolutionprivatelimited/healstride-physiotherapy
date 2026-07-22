import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Image, Activity, Stethoscope } from "lucide-react";

const categories = [
  {
    title: "Clinic Photos",
    description:
      "Explore our modern clinic environment, reception area and patient-friendly spaces.",
    path: "/gallery/clinic",
    icon: <Image size={28} />,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
  },
  {
    title: "Machine Photos",
    description:
      "Advanced physiotherapy equipment used for effective pain management and recovery.",
    path: "/gallery/machine",
    icon: <Activity size={28} />,
    image:
      "https://images.unsplash.com/photo-1580281657527-47f249e8f4df",
  },
  {
    title: "Treatment Photos",
    description:
      "Professional therapy sessions focused on rehabilitation and patient care.",
    path: "/gallery/treatment",
    icon: <Stethoscope size={28} />,
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514",
  },
];


const GalleryPage = () => {

  return (

    <section
      className="
        pt-28
        pb-20
        min-h-screen
        bg-cover
        bg-center
        bg-fixed
        relative
      "
      style={{
        backgroundImage: "url('/gallery-bg.avif')",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>



      <div className="relative z-10 max-w-7xl mx-auto px-4">


        {/* Heading */}

        <motion.div
          initial={{
            opacity:0,
            y:30
          }}
          animate={{
            opacity:1,
            y:0
          }}
          transition={{
            duration:0.6
          }}
          className="text-center mb-16"
        >

          <p className="
            uppercase
            tracking-[5px]
            text-teal-600
            font-semibold
          ">
            Our Gallery
          </p>


          <h1 className="
            text-4xl
            md:text-5xl
            font-bold
            mt-4
            text-slate-800
          ">
            HealStride Gallery
          </h1>


          <p className="
            text-gray-600
            mt-5
            max-w-2xl
            mx-auto
          ">
            Take a look at our clinic, advanced equipment,
            and professional physiotherapy treatments.
          </p>


        </motion.div>




        {/* Cards */}

        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
        ">


          {categories.map((item,index)=>(


            <Link
              key={item.title}
              to={item.path}
            >


              <motion.div

                initial={{
                  opacity:0,
                  y:40
                }}

                whileInView={{
                  opacity:1,
                  y:0
                }}

                viewport={{
                  once:true
                }}

                transition={{
                  delay:index*0.15
                }}

                whileHover={{
                  y:-12
                }}

                className="
                  group
                  bg-white/90
                  backdrop-blur
                  rounded-3xl
                  overflow-hidden
                  shadow-xl
                "

              >


                {/* Image */}

                <div className="
                  overflow-hidden
                  relative
                ">

                  <img

                    src={item.image}

                    alt={item.title}

                    className="
                      w-full
                      h-72
                      object-cover
                      group-hover:scale-110
                      transition
                      duration-500
                    "

                  />


                  <div className="
                    absolute
                    inset-0
                    bg-black/20
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "></div>


                </div>




                {/* Content */}

                <div className="p-6">


                  <div className="
                    flex
                    items-center
                    gap-3
                    text-teal-600
                    mb-3
                  ">

                    {item.icon}

                    <h3 className="
                      text-2xl
                      font-bold
                      text-slate-800
                    ">
                      {item.title}
                    </h3>


                  </div>



                  <p className="
                    text-gray-600
                    leading-7
                  ">
                    {item.description}
                  </p>


                  <button className="
                    mt-5
                    text-teal-600
                    font-semibold
                  ">
                    View Gallery →
                  </button>


                </div>


              </motion.div>


            </Link>


          ))}


        </div>


      </div>


    </section>

  );
};


export default GalleryPage;