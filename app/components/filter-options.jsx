import { useState } from "react"
import { ChevronDown } from "lucide-react"

function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-50 transition-colors flex justify-between items-center"
      >
        <span className="text-gray-700">{value || placeholder}</span>
        <ChevronDown className="text-gray-500" size={20} />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function FilterOptions({ filters, onFilterChange }) {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-wrap gap-4">
      <CustomSelect
        options={[
          { value: "all", label: "All Categories" },
          { value: "Bug", label: "Bug" },
          { value: "Feature Request", label: "Feature Request" },
        ]}
        value={filters.category}
        onChange={(value) => handleFilterChange("category", value)}
        placeholder="Select Category"
      />
      <CustomSelect
        options={[
          { value: "all", label: "All Upvotes" },
          { value: "0-5", label: "0-5" },
          { value: "6-10", label: "6-10" },
          { value: "10+", label: "10+" },
        ]}
        value={filters.upvotes}
        onChange={(value) => handleFilterChange("upvotes", value)}
        placeholder="Select Upvotes"
      />
      <CustomSelect
        options={[
          { value: "all", label: "All Locations" },
          { value: "New York", label: "New York" },
          { value: "London", label: "London" },
        ]}
        value={filters.location}
        onChange={(value) => handleFilterChange("location", value)}
        placeholder="Select Location"
      />
      <CustomSelect
        options={[
          { value: "all", label: "All Severities" },
          { value: "Low", label: "Low" },
          { value: "Medium", label: "Medium" },
          { value: "High", label: "High" },
        ]}
        value={filters.severity}
        onChange={(value) => handleFilterChange("severity", value)}
        placeholder="Select Severity"
      />
    </div>
  )
}
