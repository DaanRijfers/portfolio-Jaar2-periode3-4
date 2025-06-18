import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const FILES_DIRECTORY = path.join(process.cwd(), "portfolio-files")

// Portfolio item folders mapping
const PORTFOLIO_FOLDERS = [
  "reflectie",
  "feedback",
  "beroepsoriëntatie",
  "pop",
  "communicatie",
  "onderzoek",
  "projectmanagement",
  "edumundo",
]

export async function GET() {
  try {
    // Ensure main directory exists
    try {
      await fs.access(FILES_DIRECTORY)
    } catch {
      await fs.mkdir(FILES_DIRECTORY, { recursive: true })
      return NextResponse.json({})
    }

    const allFiles: Record<string, any[]> = {}

    // Check each portfolio folder
    for (const folder of PORTFOLIO_FOLDERS) {
      const folderPath = path.join(FILES_DIRECTORY, folder)
      allFiles[folder] = []

      try {
        await fs.access(folderPath)
        const files = await fs.readdir(folderPath)

        for (const file of files) {
          if (file.toLowerCase().endsWith(".pdf")) {
            const filePath = path.join(folderPath, file)
            const stats = await fs.stat(filePath)

            allFiles[folder].push({
              name: file,
              size: stats.size,
              url: `/api/files/${folder}/${file}`,
              lastModified: stats.mtime,
              type: "pdf",
            })
          }
        }
      } catch {
        // Folder doesn't exist, keep empty array
      }
    }

    return NextResponse.json(allFiles)
  } catch (error) {
    console.error("Error listing files:", error)
    return NextResponse.json({})
  }
}
