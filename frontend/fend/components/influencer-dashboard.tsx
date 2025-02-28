"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SupporterList } from "@/components/supporter-list"
import { WeightAdjuster } from "@/components/weight-adjuster"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sliders } from "lucide-react"

// Mock data for development
const mockInfluencer = {
  influencerAddress: "0x1234...5678",
  name: "CryptoInfluencer",
  profileImage: "/placeholder.svg?height=100&width=100",
}

const mockSupporters = [
  {
    address: "0xabc1...def1",
    influencerAddress: "0x1234...5678",
    actions: {
      base_colors_collected: 5,
      pods_collected: 3,
      zora_posts_collected: 10,
      clankers_bought: 2,
      tips_sent: 1,
    },
    weights: {
      base_colors_collected: 2,
      pods_collected: 3,
      zora_posts_collected: 1,
      clankers_bought: 4,
      tips_sent: 5,
    },
    score: 0,
  },
  {
    address: "0xabc2...def2",
    influencerAddress: "0x1234...5678",
    actions: {
      base_colors_collected: 2,
      pods_collected: 7,
      zora_posts_collected: 4,
      clankers_bought: 1,
      tips_sent: 3,
    },
    weights: {
      base_colors_collected: 2,
      pods_collected: 3,
      zora_posts_collected: 1,
      clankers_bought: 4,
      tips_sent: 5,
    },
    score: 0,
  },
  {
    address: "0xabc3...def3",
    influencerAddress: "0x1234...5678",
    actions: {
      base_colors_collected: 8,
      pods_collected: 1,
      zora_posts_collected: 6,
      clankers_bought: 4,
      tips_sent: 0,
    },
    weights: {
      base_colors_collected: 2,
      pods_collected: 3,
      zora_posts_collected: 1,
      clankers_bought: 4,
      tips_sent: 5,
    },
    score: 0,
  },
]

// Action types and their display names
export const actionTypes = {
  base_colors_collected: "Base Colors Collected",
  pods_collected: "Pods Collected",
  zora_posts_collected: "Zora Posts Collected",
  clankers_bought: "Clankers Bought",
  tips_sent: "Tips Sent",
}

export function InfluencerDashboard() {
  const [influencer, setInfluencer] = useState(mockInfluencer)
  const [supporters, setSupporters] = useState([])
  const [weights, setWeights] = useState({
    base_colors_collected: 2,
    pods_collected: 3,
    zora_posts_collected: 1,
    clankers_bought: 4,
    tips_sent: 5,
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Fetch influencer and supporters data
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // For now, we'll use the mock data
    const calculatedSupporters = mockSupporters.map((supporter) => {
      const score = calculateScore(supporter.actions, weights)
      return { ...supporter, score }
    })

    setSupporters(calculatedSupporters)
  }, [weights])

  // Calculate score based on actions and weights
  const calculateScore = (actions, weights) => {
    let score = 0
    for (const [key, value] of Object.entries(actions)) {
      score += value * weights[key]
    }
    return score
  }

  // Update weights and recalculate scores
  const handleWeightChange = (action, value) => {
    const newWeights = { ...weights, [action]: value }
    setWeights(newWeights)

    // Recalculate scores with new weights
    const updatedSupporters = supporters.map((supporter) => {
      const score = calculateScore(supporter.actions, newWeights)
      return { ...supporter, score }
    })

    setSupporters(updatedSupporters)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
          <AvatarImage src={influencer.profileImage} alt={influencer.name} />
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {influencer.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{influencer.name}</h1>
        <p className="text-muted-foreground">{influencer.influencerAddress}</p>
      </div>

      <div className="flex justify-center mb-8">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Adjust Action Weights
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4" align="center">
            <h2 className="text-lg font-semibold mb-4">Adjust Action Weights</h2>
            <WeightAdjuster weights={weights} onWeightChange={handleWeightChange} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h2 className="text-xl font-semibold mb-4">Top Supporters</h2>
      <SupporterList supporters={supporters} />
    </div>
  )
}

