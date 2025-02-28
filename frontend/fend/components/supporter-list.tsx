"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { actionTypes } from "./influencer-dashboard"

export function SupporterList({ supporters }) {
  // Sort supporters by score in descending order
  const sortedSupporters = [...supporters].sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-4">
      {sortedSupporters.map((supporter) => (
        <Card key={supporter.address} className="overflow-hidden border-muted bg-card/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{supporter.address}</h3>
                  <Badge variant="outline" className="ml-2 bg-primary/20 text-primary-foreground">
                    Score: {supporter.score}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-2">
                  {Object.entries(supporter.actions).map(([action, count]) => (
                    <div key={action} className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{actionTypes[action]}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <ActionBarChart actions={supporter.actions} weights={supporter.weights} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ActionBarChart({ actions, weights }) {
  // Find the max value for scaling
  const maxValue = Math.max(
    ...Object.values(actions).map((val) => val * weights[Object.keys(actions).find((key) => actions[key] === val)]),
  )

  return (
    <div className="flex items-end h-16 gap-1">
      {Object.entries(actions).map(([action, count]) => {
        const weightedValue = count * weights[action]
        const height = maxValue > 0 ? (weightedValue / maxValue) * 100 : 0

        return (
          <div
            key={action}
            className="w-6 bg-primary/80 rounded-t"
            style={{
              height: `${height}%`,
              minHeight: count > 0 ? "4px" : "0",
            }}
            title={`${actionTypes[action]}: ${count} (Weight: ${weights[action]})`}
          />
        )
      })}
    </div>
  )
}

