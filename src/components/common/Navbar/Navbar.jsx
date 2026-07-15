import { useState } from "react";
import { Link } from "react-router-dom";
import { NAVIGATION } from "../../../constants/navigation";
import logo from "../../../assets/images/logo.png";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";


const Navbar = () => {

  const [open, setOpen] = useState(false);


  return (

    <nav className="w-full bg-white shadow-md sticky top-0 z-50">


      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-3
        flex
        items-center
        justify-between
        "
      >



        {/* Logo */}

        <motion.div

          initial={{
            opacity:0,
            x:-30
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:0.6
          }}

        >

          <Link 
            to="/"
            className="flex items-center gap-2 sm:gap-3"
          >

            <img
              src={logo}
              alt="HealStride Logo"
              className="
              h-12
              sm:h-14
              md:h-16
              w-auto
              "
            />


            <div>

              <h1
                className="
                text-xl
                sm:text-2xl
                font-bold
                text-teal-700
                "
              >
                HealStride
              </h1>


              <p
                className="
                hidden
                sm:block
                text-xs
                text-gray-500
                "
              >
                Physiotherapy & Wellness
              </p>


            </div>


          </Link>


        </motion.div>





        {/* Desktop Navigation */}


        <ul
          className="
          hidden
          md:flex
          items-center
          gap-6
          lg:gap-8
          "
        >

          {
            NAVIGATION.map((item)=>(

              <motion.li

                key={item.id}

                whileHover={{
                  y:-2
                }}

              >

                <Link

                  to={item.path}

                  className="
                  text-gray-700
                  hover:text-teal-700
                  transition-colors
                  duration-300
                  font-medium
                  "

                >

                  {item.title}

                </Link>


              </motion.li>


            ))
          }


        </ul>






        {/* Desktop CTA */}


        <motion.div

          whileHover={{
            scale:1.05
          }}

          className="hidden md:block"

        >

          <Link

            to="/contact"

            className="
            bg-teal-700
            text-white
            px-5
            py-2
            rounded-xl
            hover:bg-teal-800
            transition
            "

          >

            Book Appointment

          </Link>


        </motion.div>





        {/* Mobile Menu Button */}


        <button

          onClick={()=>setOpen(!open)}

          className="
          md:hidden
          text-teal-700
          text-2xl
          "

        >

          {
            open ? <FaTimes/> : <FaBars/>
          }


        </button>



      </div>






      {/* Mobile Menu */}


      {
        open && (

          <motion.div

            initial={{
              opacity:0,
              height:0
            }}

            animate={{
              opacity:1,
              height:"auto"
            }}

            transition={{
              duration:0.3
            }}

            className="
            md:hidden
            bg-white
            border-t
            px-6
            py-5
            "

          >


            <ul className="flex flex-col gap-5">


              {
                NAVIGATION.map((item)=>(


                  <li key={item.id}>


                    <Link

                      to={item.path}

                      onClick={()=>setOpen(false)}

                      className="
                      text-gray-700
                      hover:text-teal-700
                      font-medium
                      "

                    >

                      {item.title}

                    </Link>


                  </li>


                ))
              }


            </ul>




            <Link

              to="/contact"

              onClick={()=>setOpen(false)}

              className="
              block
              text-center
              mt-5
              bg-teal-700
              text-white
              px-5
              py-3
              rounded-xl
              "

            >

              Book Appointment

            </Link>



          </motion.div>

        )
      }



    </nav>

  );
};


export default Navbar;