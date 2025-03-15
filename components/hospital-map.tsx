"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Room types
const roomTypes = [
  "General Ward",
  "ICU",
  "Operating Theater",
  "Emergency Room",
  "Consultation Room",
  "Pharmacy",
  "Laboratory",
  "Radiology",
  "Corridor",
]

// Initial hospital layout
const initialLayout = [
  [
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
  ],
  [
    "General Ward",
    "General Ward",
    "ICU",
    "ICU",
    "Corridor",
    "Operating Theater",
    "Operating Theater",
    "Emergency Room",
    "Emergency Room",
    "Corridor",
  ],
  [
    "General Ward",
    "General Ward",
    "ICU",
    "ICU",
    "Corridor",
    "Operating Theater",
    "Operating Theater",
    "Emergency Room",
    "Emergency Room",
    "Corridor",
  ],
  [
    "Consultation Room",
    "Consultation Room",
    "Pharmacy",
    "Pharmacy",
    "Corridor",
    "Laboratory",
    "Laboratory",
    "Radiology",
    "Radiology",
    "Corridor",
  ],
  [
    "Consultation Room",
    "Consultation Room",
    "Pharmacy",
    "Pharmacy",
    "Corridor",
    "Laboratory",
    "Laboratory",
    "Radiology",
    "Radiology",
    "Corridor",
  ],
  [
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
    "Corridor",
  ],
]

export function HospitalMap({ onRoomSelect, filters }) {
  const [layout, setLayout] = useState(initialLayout)
  const [editMode, setEditMode] = useState(false)
  const [selectedCell, setSelectedCell] = useState(null)

  // Filter the layout based on the provided filters
  const filteredLayout = layout.map((row) =>
    row.map((cell) => {
      if (filters.department && cell !== filters.department && cell !== "Corridor") {
        return null
      }
      // Add more filter conditions here as needed
      return cell
    }),
  )

  useEffect(() => {
    // In a real application, you would fetch the layout data from an API
    // For now, we'll just use the initial layout
  }, [])

  const handleCellClick = (rowIndex, colIndex) => {
    if (editMode) {
      setSelectedCell({ rowIndex, colIndex })
    } else {
      const roomType = layout[rowIndex][colIndex]
      if (roomType !== "Corridor") {
        onRoomSelect({
          id: `${rowIndex}-${colIndex}`,
          number: `${rowIndex + 1}${String.fromCharCode(65 + colIndex)}`,
          type: roomType,
          status: Math.random() > 0.5 ? "Occupied" : "Vacant",
          floor: 1,
          department: roomType,
        })
      }
    }
  }

  const handleRoomTypeChange = (newType) => {
    if (selectedCell) {
      const { rowIndex, colIndex } = selectedCell
      const newLayout = layout.map((row, i) =>
        i === rowIndex ? row.map((cell, j) => (j === colIndex ? newType : cell)) : row,
      )
      setLayout(newLayout)
      setSelectedCell(null)
    }
  }

  const getCellColor = (roomType) => {
    switch (roomType) {
      case "General Ward":
        return "bg-blue-100 dark:bg-blue-800 text-black dark:text-white"
      case "ICU":
        return "bg-red-100 dark:bg-red-800 text-black dark:text-white"
      case "Operating Theater":
        return "bg-green-100 dark:bg-green-800 text-black dark:text-white"
      case "Emergency Room":
        return "bg-yellow-100 dark:bg-yellow-800 text-black dark:text-white"
      case "Consultation Room":
        return "bg-purple-100 dark:bg-purple-800 text-black dark:text-white"
      case "Pharmacy":
        return "bg-pink-100 dark:bg-pink-800 text-black dark:text-white"
      case "Laboratory":
        return "bg-indigo-100 dark:bg-indigo-800 text-black dark:text-white"
      case "Radiology":
        return "bg-orange-100 dark:bg-orange-800 text-black dark:text-white"
      case "Corridor":
        return "bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
      default:
        return "bg-white dark:bg-gray-800 text-black dark:text-white"
    }
  }

  return (
    <div>
      <div className="mb-4">
        <Button onClick={() => setEditMode(!editMode)}>{editMode ? "Exit Edit Mode" : "Enter Edit Mode"}</Button>
      </div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${layout[0].length}, minmax(0, 1fr))` }}>
        {filteredLayout.map((row, rowIndex) =>
          row.map(
            (cell, colIndex) =>
              cell && (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`p-2 border rounded-sm cursor-pointer ${getCellColor(cell)} ${
                    selectedCell?.rowIndex === rowIndex && selectedCell?.colIndex === colIndex
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell !== "Corridor" && (
                    <Badge variant="outline" className="text-xs">
                      {`${rowIndex + 1}${String.fromCharCode(65 + colIndex)}`}
                    </Badge>
                  )}
                  <div className="text-xs mt-1">{cell}</div>
                </div>
              ),
          ),
        )}
      </div>
      {editMode && selectedCell && (
        <div className="mt-4">
          <Select onValueChange={handleRoomTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

