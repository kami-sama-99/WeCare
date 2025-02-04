import { useState } from "react"
import { MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react"

export default function DataTable({ data, onSort, sortConfig, onMoreOptions }) {
  const [openDropdown, setOpenDropdown] = useState(null)

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? <ChevronUp size={16} /> : <ChevronDown size={16} />
    }
    return null
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {["reporter", "category", "description", "location", "upvotes", "severity", "actions"].map((header) => (
              <th
                key={header}
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => header !== "actions" && onSort(header)}
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
                {header !== "actions" && renderSortIcon(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{item.reporter}</td>
              <td className="py-3 px-6 text-left">{item.category}</td>
              <td className="py-3 px-6 text-left">{item.description}</td>
              <td className="py-3 px-6 text-left">{item.location}</td>
              <td className="py-3 px-6 text-left">{item.upvotes}</td>
              <td className="py-3 px-6 text-left">{item.severity}</td>
              <td className="py-3 px-6 text-left">
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {openDropdown === item.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <button
                        onClick={() => {
                          onMoreOptions("viewReport", item)
                          setOpenDropdown(null)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Report
                      </button>
                      <button
                        onClick={() => {
                          onMoreOptions("viewReporter", item)
                          setOpenDropdown(null)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Reporter
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

