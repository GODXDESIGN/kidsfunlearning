"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl, Howler } from "howler";

// Create instances outside component so they aren't recreated on render
let successSound: Howl;

export default function CountingGame() {
    const [count, setCount] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const target = 3;

    useEffect(() => {
        setIsClient(true);
        // Initialize sound only on client side
        successSound = new Howl({
            src: ["/sounds/success.wav"],
            volume: 0.5,
        });

        // Optional: Background calm setup (uncomment when we have the file)
        /*
        const bgMusic = new Howl({
            src: ["/sounds/calm_bg.mp3"],
            loop: true,
            volume: 0.1
        });
        bgMusic.play();
        return () => bgMusic.unload();
        */

        return () => {
            // Cleanup howler on unmount
            Howler.unload();
        }
    }, []);

    const handleClick = () => {
        if (count < target) {
            setCount(count + 1);
        }

        if (count + 1 === target) {
            if (successSound) {
                successSound.play();
            }
        }
    };

    // Prevent hydration errors by not rendering UI until client is ready
    if (!isClient) return <div className="min-h-screen bg-blue-100 flex items-center justify-center"><p>Loading...</p></div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6 overflow-hidden">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-bold font-poppins text-slate-800 mb-10 text-center"
            >
                Tap the Apples!
            </motion.h1>

            <div className="flex flex-col items-center gap-12">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, rotate: Math.random() > 0.5 ? 10 : -10 }}
                    onClick={handleClick}
                    className="text-8xl md:text-9xl cursor-pointer select-none drop-shadow-xl"
                    style={{ filter: count >= target ? 'grayscale(100%) opacity(50%)' : 'none', pointerEvents: count >= target ? 'none' : 'auto' }}
                >
                    🍎
                </motion.div>

                <motion.div
                    key={count}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl md:text-6xl font-fredoka font-bold text-slate-700 bg-white/50 px-8 py-4 rounded-3xl shadow-sm"
                >
                    {count} / {target}
                </motion.div>
            </div>

            <AnimatePresence>
                {count === target && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.6 }}
                        className="absolute inset-0 flex items-center justify-center bg-green-100/90 backdrop-blur-sm z-50 flex-col"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-9xl mb-8 drop-shadow-2xl"
                        >
                            🌟
                        </motion.div>
                        <h2 className="text-6xl md:text-8xl font-bold font-poppins text-green-600 drop-shadow-md text-center">
                            Great Job!
                        </h2>
                        <button
                            onClick={() => setCount(0)}
                            className="mt-12 bg-white text-green-600 font-bold text-2xl px-8 py-4 rounded-full shadow-lg hover:bg-green-50 transition-colors"
                        >
                            Play Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
