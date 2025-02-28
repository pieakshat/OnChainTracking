import { NextResponse } from "next/server"

// This would connect to your MongoDB in a real application
// For now, we'll use mock data

export async function GET(request: Request) {
  // Mock data for development
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
    // More supporters...
  ]

  return NextResponse.json(mockSupporters)
}

export async function POST(request: Request) {
  const data = await request.json()

  // In a real app, you would update the database
  // For now, we'll just return the data

  return NextResponse.json({ success: true, data })
}

