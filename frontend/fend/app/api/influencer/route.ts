import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Mock data for development
  const mockInfluencer = {
    influencerAddress: "0x1234...5678",
    name: "CryptoInfluencer",
    profileImage: "/placeholder.svg?height=100&width=100",
  }

  return NextResponse.json(mockInfluencer)
}

