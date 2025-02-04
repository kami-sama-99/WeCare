"use client"

import { useState, useEffect } from "react"
import FilterOptions from "./filter-options"
import DataTable from "./data-table"
import Pagination from "./pagination"
import { Search } from "lucide-react"
import mockData from "../mockData"

export default function FilterableTable() {
  const [data, setData] = useState(mockData)
  const [filteredData, setFilteredData] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    category: "",
    upvotes: "",
    location: "",
    severity: "",
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 10

  useEffect(() => {
    let result = data

    // Apply filters
    Object.keys(filters).forEach((key) => {
      if (filters[key] && filters[key] !== "all") {
        result = result.filter((item) => {
          if (key === "upvotes") {
            const [min, max] = filters[key].split("-").map(Number)
            return item[key] >= min && (max ? item[key] <= max : true)
          }
          return item[key].toString().toLowerCase().includes(filters[key].toLowerCase())
        })
      }
    })

    // Apply search
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredData(result)
  }, [data, filters, sortConfig, searchTerm])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "ascending" ? "descending" : "ascending",
    }))
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleMoreOptions = (action, item) => {
    console.log(`${action} for item:`, item)
    // Implement view report or view reporter logic here
  }

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="container mx-auto p-4 space-y-4 max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <FilterOptions filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <DataTable data={paginatedData} onSort={handleSort} sortConfig={sortConfig} onMoreOptions={handleMoreOptions} />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

