"use client"

import { useState } from "react"

export default function JoinUsButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={`relative overflow-hidden px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 ${
        isHovered ? "text-white" : "text-green-500"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">JOIN US</span>
      <div
        className={`absolute inset-0 bg-green-500 transition-transform duration-300 ${
          isHovered ? "translate-x-0" : "-translate-x-full"
        }`}
      ></div>
    </button>
  )
}

