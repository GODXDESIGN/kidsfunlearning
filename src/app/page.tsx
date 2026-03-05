"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-poppins text-slate-800 mb-6 drop-shadow-sm">
          FocusFun Kids
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-10 font-nunito max-w-md mx-auto">
          Interactive, calm, and engaging learning adventures!
        </p>

        <Link href="/age-3-4/counting-game">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-poppins px-10 py-5 rounded-3xl text-2xl shadow-lg transition-colors border-b-4 border-blue-700 active:border-b-0 active:translate-y-1"
          >
            Start Learning
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
