import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GiSewingNeedle } from "react-icons/gi"; // swap to GiSewingMachine, FaBoxes, etc.
import Loader from "../Loader/Loader";

const AppLogo = ({ size = 48, compact = false }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay (1 sec)
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div>
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center ">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4  border-cyan-500 border-solid"></div>
            </div>
          </div>
        </section>
      </div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="inline-flex items-center gap-3 select-none"
    >
      <div
        className="flex items-center justify-center rounded-lg p-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,234,255,0.14), rgba(255,110,199,0.06))",
          boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
        }}
      >
        <GiSewingNeedle
          size={size}
          className="text-[transparent]"
          style={{
            WebkitTextStroke: "1px rgba(0,234,255,0.95)", // subtle neon outline
            color: "#00eaff",
            filter: "drop-shadow(0 6px 12px rgba(0,234,255,0.12))",
          }}
        />
      </div>

      {!compact && (
        <div className="leading-tight">
          <div className="text-xl font-bold" style={{ color: "#e6eef8" }}>
            GarmentTrack
          </div>
          <div className="text-xs text-gray-400 -mt-0.5">
            Order & Production
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AppLogo;
