"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Files } from "lucide-react"
import { FileDisplay } from "./file-display"

interface PortfolioFile {
  name: string
  size: number
  url: string
  lastModified: Date
  type: string
}

interface PortfolioItem {
  id: string
  title: string
  description: string
  requirements: string[]
  files: PortfolioFile[]
  completed: boolean
}

interface PortfolioItemCardProps {
  item: PortfolioItem
  onRefresh?: (itemId: string) => void
  isLoading?: boolean
}

export function PortfolioItemCard({ item, onRefresh, isLoading }: PortfolioItemCardProps) {
  const fileCount = item.files?.length || 0

  return (
    <Card
      className={`relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        item.completed
          ? "bg-gradient-to-br from-white to-green-50/50 border-green-200 shadow-lg"
          : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-blue-300"
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div
                className={`p-2 rounded-full transition-all duration-200 ${
                  item.completed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <span className={item.completed ? "text-green-800" : "text-gray-800"}>{item.title}</span>
            </CardTitle>
            <CardDescription className="mt-3 text-base leading-relaxed">{item.description}</CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {item.completed && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">✓ Voltooid</Badge>
            )}
            {fileCount > 0 && (
              <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                <Files className="w-3 h-3 mr-1" />
                {fileCount} bestand{fileCount !== 1 ? "en" : ""}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Requirements */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Vereisten
          </h4>
          <div className="bg-white/60 rounded-lg p-4 border border-gray-100">
            <ul className="space-y-2">
              {item.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        {/* File Display */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            Documenten
          </h4>
          <FileDisplay
            itemId={item.id}
            files={item.files || []}
            onRefresh={onRefresh ? () => onRefresh(item.id) : undefined}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  )
}
