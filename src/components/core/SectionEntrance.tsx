"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface SectionEntranceProps {
  children: React.ReactNode
}

export const SectionEntrance = ({ children }: SectionEntranceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
