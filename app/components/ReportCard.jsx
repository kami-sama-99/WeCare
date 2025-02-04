"use client"

import { MapPin, ArrowUp } from "lucide-react"
import { useState } from "react"

export default function ReportCard() {
  const [isLocationExpanded, setIsLocationExpanded] = useState(false)
  const [isArrowActive, setIsArrowActive] = useState(false)

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Header Section */}
      <div className="bg-red-600 text-white p-6 space-y-3">
        <h2 className="text-2xl font-bold">Title of Report</h2>
        <p className="text-sm leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          versions of Lorem Ipsum.
        </p>
        <p className="text-sm font-medium text-black">Upvoted by 10 users</p>
      </div>

      {/* Image Section */}
      <div className="relative">
        <img
          src="trash.jpg"
          alt="trash image"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Footer Section */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsLocationExpanded(!isLocationExpanded)} className="relative">
            <MapPin className="h-6 w-6" />
            <span
              className={`
                absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap
                transition-all duration-300 ease-in-out
                ${isLocationExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
              `}
            >
              New York, USA
            </span>
          </button>
        </div>

        <button onClick={() => setIsArrowActive(!isArrowActive)} className="group">
          <ArrowUp
            className={`
              h-6 w-6 transition-all duration-300 ease-in-out
              group-hover:-translate-y-1
              ${isArrowActive ? "text-red-600" : ""}
              group-hover:text-red-600
            `}
          />
        </button>
      </div>
    </div>
  )
}

