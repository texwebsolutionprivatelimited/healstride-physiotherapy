import { motion } from "framer-motion";
import {
  HeartPulse,
  Activity,
  Stethoscope,
  Cross,
} from "lucide-react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {/* Floating Heart Icon */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-24 left-10 text-teal-400 opacity-30"
      >
        <HeartPulse size={55} />
      </motion.div>


      {/* Floating Activity Icon */}
      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-40 right-16 text-teal-400 opacity-30"
      >
        <Activity size={50} />
      </motion.div>


      {/* Floating Stethoscope */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 left-20 text-teal-300 opacity-30"
      >
        <Stethoscope size={65} />
      </motion.div>


      {/* Medical Cross */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute bottom-20 right-24 text-teal-400 opacity-30"
      >
        <Cross size={45} />
      </motion.div>


      {/* Glow Circle 1 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          top-1/3
          left-1/2
          w-40
          h-40
          rounded-full
          bg-teal-300
          blur-3xl
        "
      />


      {/* Glow Circle 2 */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-10
          right-1/3
          w-52
          h-52
          rounded-full
          bg-cyan-300
          blur-3xl
        "
      />

    </div>
  );
};

export default AnimatedBackground;