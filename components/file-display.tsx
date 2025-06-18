"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Download, Eye, Clock, RefreshCw, FolderOpen } from "lucide-react"
import { useState } from "react"

interface PortfolioFile {
  name: string
  size: number
  url: string
  lastModified: Date
  type: string
}

interface FileDisplayProps {
  itemId: string
  files: PortfolioFile[]
  onRefresh?: () => void
  isLoading?: boolean
}

export function FileDisplay({ itemId, files, onRefresh, isLoading }: FileDisplayProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  const handleViewFile = async (url: string, fileName: string) => {
    setLoadingStates((prev) => ({ ...prev, [fileName]: true }))
    try {
      window.open(url, "_blank")
    } finally {
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [fileName]: false }))
      }, 1000)
    }
  }

  const handleDownloadFile = async (url: string, filename: string) => {
    setLoadingStates((prev) => ({ ...prev, [filename]: true }))
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [filename]: false }))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }

  if (isLoading) {
    return (
      <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 text-center bg-blue-50/50 animate-pulse">
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          </div>
          <p className="text-sm text-blue-600 font-medium">Bestanden laden...</p>
        </div>
      </div>
    )
  }

  if (files && files.length > 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              {files.length} bestand{files.length !== 1 ? "en" : ""} gevonden
            </span>
          </div>
          {onRefresh && (
            <Button size="sm" variant="outline" onClick={onRefresh} className="border-green-200 hover:bg-green-50">
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {files.map((file, index) => (
            <Card key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-green-800 truncate">{file.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-green-600">{formatFileSize(file.size)}</p>
                        <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(file.lastModified)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 hover:bg-green-50"
                      onClick={() => handleViewFile(file.url, file.name)}
                      disabled={loadingStates[file.name]}
                    >
                      {loadingStates[file.name] ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-200 hover:bg-green-50"
                      onClick={() => handleDownloadFile(file.url, file.name)}
                      disabled={loadingStates[file.name]}
                    >
                      {loadingStates[file.name] ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50/50">
      <div className="space-y-3">
        <div className="flex justify-center">
          <div className="p-3 bg-gray-100 rounded-full">
            <FolderOpen className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Nog geen bestanden beschikbaar</p>
          <p className="text-xs text-gray-400 mt-1">
            Maak een map <code className="bg-gray-200 px-1 rounded text-xs">{itemId}/</code> en plaats daar je PDF
            bestanden
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Bijvoorbeeld:{" "}
            <code className="bg-gray-200 px-1 rounded text-xs">portfolio-files/{itemId}/document1.pdf</code>
          </p>
        </div>
        {onRefresh && (
          <Button size="sm" variant="outline" onClick={onRefresh} className="mt-3">
            <RefreshCw className="w-4 h-4 mr-2" />
            Vernieuwen
          </Button>
        )}
      </div>
    </div>
  )
}
