"use client"

import { GraduationCap, School } from "lucide-react"

export function PortfolioHeader() {
  return (
    <div className="relative text-center mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-3xl" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Digitaal Portfolio
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <School className="w-5 h-5 text-gray-600" />
          <p className="text-xl font-semibold text-gray-700">NHL Stenden Hogeschool HBO Informatica</p>
        </div>
        <div className="space-y-2">
          <p className="text-lg text-gray-600 font-medium">Professionele vaardigheden 2.2</p>
          <p className="text-base text-gray-500">Thema Product X</p>
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
            <p className="text-sm font-medium text-gray-600">Studiejaar 2024-2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
