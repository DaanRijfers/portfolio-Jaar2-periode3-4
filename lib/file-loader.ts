"use client"

export interface PortfolioFile {
  name: string
  size: number
  url: string
  lastModified: Date
  type: string
}

// Load all files for a specific portfolio item from its subfolder
export async function loadPortfolioFiles(): Promise<Record<string, PortfolioFile[]>> {
  try {
    const response = await fetch("/api/files/list")
    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error loading portfolio files:", error)
    return {}
  }
}

// Check if files exist for a specific portfolio item
export async function checkItemFiles(itemId: string): Promise<PortfolioFile[]> {
  try {
    const response = await fetch(`/api/files/check/${itemId}`)
    const result = await response.json()
    return result.files || []
  } catch (error) {
    console.error(`Error checking files for ${itemId}:`, error)
    return []
  }
}
