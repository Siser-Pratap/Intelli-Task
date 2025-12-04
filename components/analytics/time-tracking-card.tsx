"use client"

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAnalytics } from "@/hooks/use-analytics"
import { Clock, TrendingUp, TrendingDown } from "lucide-react"

export function TimeTrackingCard() {
  const { timeTracking, isLoading } = useAnalytics()

  if (isLoading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Time Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const efficiencyColor = timeTracking.efficiency >= 100 ? "text-green-400" : "text-red-400"
  const efficiencyIcon = timeTracking.efficiency >= 100 ? TrendingUp : TrendingDown

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Time Tracking
        </CardTitle>
        <CardDescription className="text-slate-400">Estimated vs actual time analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-300">Total Estimated</span>
            <span className="text-sm font-medium text-white">{timeTracking.totalEstimated}h</span>
          </div>
          <Progress value={100} className="h-2 bg-slate-700" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-300">Total Actual</span>
            <span className="text-sm font-medium text-white">{timeTracking.totalActual}h</span>
          </div>
          <Progress
            value={(timeTracking.totalActual / timeTracking.totalEstimated) * 100}
            className="h-2 bg-slate-700"
          />
        </div>

        <div className="pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-300">Efficiency</span>
            <div className="flex items-center gap-1">
              {React.createElement(efficiencyIcon, { className: `w-4 h-4 ${efficiencyColor}` })}
              <span className={`text-sm font-medium ${efficiencyColor}`}>{timeTracking.efficiency}%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Under Budget</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400">{timeTracking.underruns} tasks</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Over Budget</span>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-3 h-3 text-red-400" />
                <span className="text-xs text-red-400">{timeTracking.overruns} tasks</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {Math.round(
                ((timeTracking.totalEstimated - timeTracking.totalActual) / timeTracking.totalEstimated) * 100,
              )}
              %
            </div>
            <div className="text-xs text-slate-400">Time Saved</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
