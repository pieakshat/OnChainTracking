"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { actionTypes } from "./influencer-dashboard"

export function WeightAdjuster({ weights, onWeightChange }) {
  return (
    <div className="grid gap-6">
      {Object.entries(weights).map(([action, value]) => (
        <div key={action} className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor={action} className="text-sm font-medium">
              {actionTypes[action]}
            </Label>
            <span className="text-sm font-semibold bg-primary/20 text-primary-foreground px-2 py-1 rounded-md">
              {value}
            </span>
          </div>
          <Slider
            id={action}
            min={0}
            max={10}
            step={1}
            value={[value]}
            onValueChange={(vals) => onWeightChange(action, vals[0])}
            className="w-full"
          />
        </div>
      ))}
    </div>
  )
}

