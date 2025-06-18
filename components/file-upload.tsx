"use client"

import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"

interface FileDisplayProps {
  file?: {
    name: string
    size: number
    url: string
  }
}

export function FileDisplay({ file }: FileDisplayProps) {
  const handleViewFile = (url: string) => {
    window.open(url, "_blank")
  }

  const handleDownloadFile = (url: string, filename: string) => {
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (file) {
    return (
      <div className="relative group">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">{file.name}</p>
              <p className="text-sm text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-green-200 hover:bg-green-50"
              onClick={() => handleViewFile(file.url)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-green-200 hover:bg-green-50"
              onClick={() => handleDownloadFile(file.url, file.name)}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50/50">
      <div className="space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-gray-100 rounded-full">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Nog geen bestand geüpload</p>
        <p className="text-xs text-gray-400">Bestand wordt toegevoegd via de backend</p>
      </div>
    </div>
  )
}
