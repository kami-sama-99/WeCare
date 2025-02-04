import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="inline mr-2" size={20} /> Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next <ChevronRight className="inline ml-2" size={20} />
      </button>
    </div>
  )
}

