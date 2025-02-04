import { useState } from "react"
import { ChevronDown } from "lucide-react"

function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {value || placeholder}
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2" size={20} />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 overflow-hidden"
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
        placeholder="Category"
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
        placeholder="Upvotes"
      />
      <CustomSelect
        options={[
          { value: "all", label: "All Locations" },
          { value: "New York", label: "New York" },
          { value: "London", label: "London" },
        ]}
        value={filters.location}
        onChange={(value) => handleFilterChange("location", value)}
        placeholder="Location"
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
        placeholder="Severity"
      />
    </div>
  )
}

