"use client"

import { motion } from "framer-motion"

export function BatterAnimation() {
  return (
    <div className="relative h-full w-full">
      {/* Cricket pitch */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-80 bg-gradient-to-t from-green-800 to-green-700 opacity-40"></div>

      {/* Batter figure */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
        initial={{ x: -20, rotateY: 0 }}
        animate={{
          x: [-20, 20, -20],
          rotateY: [0, 180, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {/* Batter body */}
        <div className="relative">
          {/* Head */}
          <motion.div
            className="w-10 h-10 bg-blue-200 rounded-full relative"
            initial={{ rotate: 0 }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* Helmet */}
            <div className="absolute inset-0 border-4 border-blue-600 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-3 bg-gray-800"></div>
          </motion.div>

          {/* Body */}
          <div className="w-16 h-24 bg-blue-500 rounded-lg mt-2 flex flex-col items-center justify-center">
            <div className="w-12 h-16 bg-white rounded-lg"></div>
          </div>

          {/* Legs */}
          <div className="flex justify-between mt-1">
            <motion.div
              className="w-4 h-16 bg-white rounded-lg"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <motion.div
              className="w-4 h-16 bg-white rounded-lg"
              animate={{ rotate: [10, -10, 10] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
          </div>

          {/* Bat */}
          <motion.div
            className="absolute top-16 right-0 origin-top-right"
            animate={{
              rotate: [-45, 45, -45],
              x: [-5, 5, -5],
            }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* Bat handle */}
            <div className="w-3 h-12 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-sm"></div>

            {/* Bat blade */}
            <div className="w-12 h-32 bg-gradient-to-b from-amber-200 to-amber-400 rounded-b-lg relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-20 border border-amber-600 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Ball animation */}
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-red-600 border-2 border-white"
        initial={{ x: -200, y: 100 }}
        animate={{
          x: [null, 0, 200],
          y: [null, 150, 100],
          scale: [1, 0.8, 1],
          rotate: [0, 360, 720],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-0.5 bg-white transform rotate-45"></div>
          <div className="w-4 h-0.5 bg-white transform -rotate-45"></div>
        </div>
      </motion.div>
    </div>
  )
}

