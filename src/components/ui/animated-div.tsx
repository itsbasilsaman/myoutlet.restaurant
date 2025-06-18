"use client"

import { motion } from "framer-motion"
import type React from "react"

interface AnimatedDivProps {
  children: React.ReactNode
  key: string // Required for AnimatePresence to work correctly
}

const AnimatedDiv: React.FC<AnimatedDivProps> = ({ children, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full" // Ensure it takes full width to maintain layout
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedDiv
