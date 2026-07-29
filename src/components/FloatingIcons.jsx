import { motion } from "framer-motion";
import { HeartPulse, Activity, Stethoscope } from "lucide-react";

const FloatingIcons = () => {
  return (
    <>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute top-20 left-10 text-teal-500 opacity-30"
      >
        <HeartPulse size={40} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute right-10 top-32 text-teal-400 opacity-30"
      >
        <Activity size={35} />
      </motion.div>
    </>
  );
};

export default FloatingIcons;