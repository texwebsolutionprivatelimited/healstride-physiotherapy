import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import treatment1 from "../../assets/images/treatment1.jpg";
import treatment2 from "../../assets/images/treatment2.jpg";
import treatment3 from "../../assets/images/treatment3.jpg";
import treatment4 from "../../assets/images/treatment4.jpg";
import treatment5 from "../../assets/images/treatment5.jpg";
import treatment6 from "../../assets/images/treatment6.jpg";
import treatment7 from "../../assets/images/treatment7.jpg";


const services = [

    {
        title: "Physiotherapy",
        image: treatment1,
        description:
            "Personalized rehabilitation programs to restore movement and reduce pain.",
        benefits: [
            "Pain Relief",
            "Improved Mobility",
            "Better Strength"
        ],
        duration: "45 Minutes"
    },


    {
        title: "Dry Needling",
        image: treatment2,
        description:
            "Relieves muscle tension and trigger points for faster recovery.",
        benefits: [
            "Muscle Relaxation",
            "Pain Reduction",
            "Faster Recovery"
        ],
        duration: "30 Minutes"
    },


    {
        title: "Cupping Therapy",
        image: treatment3,
        description:
            "Improves blood circulation and reduces muscle pain.",
        benefits: [
            "Better Circulation",
            "Pain Relief",
            "Muscle Recovery"
        ],
        duration: "40 Minutes"
    },


    {
        title: "IASTM Therapy",
        image: treatment7,
        description:
            "Advanced soft tissue treatment for improved mobility and healing.",
        benefits: [
            "Scar Tissue Release",
            "Better Movement",
            "Healing Support"
        ],
        duration: "45 Minutes"
    },


    {
        title: "Exercise Therapy",
        image: treatment5,
        description:
            "Customized strengthening and mobility exercises for every patient.",
        benefits: [
            "Strength Building",
            "Flexibility",
            "Balance Improvement"
        ],
        duration: "45 Minutes"
    },


    {
        title: "Sports Rehabilitation",
        image: treatment4,
        description:
            "Helping athletes recover from injuries and return stronger.",
        benefits: [
            "Injury Recovery",
            "Performance Improvement",
            "Strength Training"
        ],
        duration: "60 Minutes"
    },


    {
        title: "Knee Pain",
        image: treatment1,
        description:
            "Expert physiotherapy treatment for knee pain.",
        benefits: [
            "Pain Management",
            "Joint Mobility",
            "Strength Recovery"
        ],
        duration: "45 Minutes"
    },


    {
        title: "Back Pain",
        image: treatment6,
        description:
            "Treatment for chronic and acute back pain.",
        benefits: [
            "Posture Correction",
            "Pain Relief",
            "Flexibility"
        ],
        duration: "45 Minutes"
    },


    {
        title: "Neck Pain",
        image: treatment2,
        description:
            "Treatment for cervical pain and stiffness.",
        benefits: [
            "Reduce Stiffness",
            "Improve Movement",
            "Relax Muscles"
        ],
        duration: "40 Minutes"
    },


    {
        title: "Shoulder Pain",
        image: treatment7,
        description:
            "Physiotherapy for shoulder mobility problems.",
        benefits: [
            "Pain Reduction",
            "Movement Recovery",
            "Strength"
        ],
        duration: "45 Minutes"
    },

];


const ServicesGrid = () => {

    return (

        <section className="py-10 sm:py-12 md:py-16 bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                {/* Heading */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8
                    }}
                    viewport={{
                        once: true
                    }}
                    className="text-center mb-10 sm:mb-12"
                >

                    <h2
                        className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                text-slate-900
                "
                    >
                        Advanced Physiotherapy Services
                    </h2>


                    <p
                        className="
                text-gray-600
                mt-4
                text-sm
                sm:text-base
                md:text-lg
                max-w-3xl
                mx-auto
                leading-7
                "
                    >
                        HealStride offers evidence-based physiotherapy
                        treatments designed to reduce pain, restore
                        movement, and improve your quality of life.
                    </p>


                </motion.div>




                {/* Cards */}

                <div
                    className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
            sm:gap-6
            lg:gap-8
            "
                >


                    {
                        services.map((service, index) => (


                            <motion.div

                                key={index}

                                initial={{
                                    opacity: 0,
                                    y: 50
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}

                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}

                                viewport={{
                                    once: true
                                }}


                                whileHover={{
                                    y: -10,
                                    scale: 1.02
                                }}


                                className="
                    bg-white
                    rounded-xl
                    sm:rounded-2xl
                    shadow-md
                    overflow-hidden
                    hover:shadow-xl
                    transition
                    "
                            >



                                {/* Image */}

                                <div
                                    className="
                        overflow-hidden
                        h-48
                        sm:h-52
                        md:h-56
                        "
                                >

                                    <motion.img

                                        src={service.image}

                                        alt={service.title}


                                        whileHover={{
                                            scale: 1.1
                                        }}


                                        transition={{
                                            duration: 0.5
                                        }}


                                        className="
                            w-full
                            h-full
                            object-cover
                            "

                                    />


                                </div>





                                {/* Content */}

                                <div
                                    className="
                        p-4
                        sm:p-6
                        "
                                >


                                    <h3
                                        className="
                            text-lg
                            sm:text-xl
                            font-bold
                            text-slate-900
                            "
                                    >
                                        {service.title}
                                    </h3>




                                    <p
                                        className="
                            text-gray-600
                            mt-3
                            text-sm
                            sm:text-base
                            leading-7
                            "
                                    >
                                        {service.description}
                                    </p>





                                    <div className="mt-4">


                                        <h4 className="font-semibold">
                                            Benefits
                                        </h4>



                                        <ul
                                            className="
                                text-sm
                                text-gray-600
                                mt-2
                                space-y-1
                                "
                                        >

                                            {
                                                service.benefits.map((b, i) => (

                                                    <li key={i}>
                                                        ✓ {b}
                                                    </li>

                                                ))
                                            }


                                        </ul>


                                    </div>




                                    <p className="mt-4 text-sm">

                                        <b>Duration:</b> {service.duration}

                                    </p>




                                    <Link

                                        to="/contact"

                                        className="
                            inline-block
                            mt-5
                            text-teal-600
                            font-semibold
                            text-sm
                            sm:text-base
                            hover:text-teal-800
                            transition
                            "
                                    >

                                        Book Appointment →

                                    </Link>



                                </div>



                            </motion.div>


                        ))
                    }


                </div>


            </div>


        </section>

    );

};


export default ServicesGrid;