"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Target, TrendingUp } from "lucide-react"

interface ProgressOverviewProps {
  completedItems: number
  totalItems: number
}

export function ProgressOverview({ completedItems, totalItems }: ProgressOverviewProps) {
  const progressPercentage = (completedItems / totalItems) * 100

  return (
    <Card className="mb-8 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Voortgang Portfolio</CardTitle>
              <CardDescription className="text-base">
                {completedItems} van {totalItems} onderdelen voltooid
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={progressPercentage === 100 ? "default" : "secondary"}
            className={`text-lg px-4 py-2 ${
              progressPercentage === 100
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700"
            }`}
          >
            {Math.round(progressPercentage)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Progress value={progressPercentage} className="w-full h-3 bg-gray-200" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 animate-pulse" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/60 rounded-xl border border-white/40 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{completedItems}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Voltooid</p>
          </div>

          <div className="text-center p-4 bg-white/60 rounded-xl border border-white/40 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{totalItems - completedItems}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Resterend</p>
          </div>

          <div className="text-center p-4 bg-white/60 rounded-xl border border-white/40 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{totalItems}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Totaal</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
