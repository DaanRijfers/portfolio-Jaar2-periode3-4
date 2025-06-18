import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const FILES_DIRECTORY = path.join(process.cwd(), "portfolio-files")

export async function GET(request: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const itemId = params.itemId
    const folderPath = path.join(FILES_DIRECTORY, itemId)
    const files: any[] = []

    try {
      await fs.access(folderPath)
      const fileList = await fs.readdir(folderPath)

      for (const file of fileList) {
        if (file.toLowerCase().endsWith(".pdf")) {
          const filePath = path.join(folderPath, file)
          const stats = await fs.stat(filePath)

          files.push({
            name: file,
            size: stats.size,
            url: `/api/files/${itemId}/${file}`,
            lastModified: stats.mtime,
            type: "pdf",
          })
        }
      }
    } catch {
      // Folder doesn't exist
    }

    return NextResponse.json({ files })
  } catch (error) {
    console.error("Error checking files:", error)
    return NextResponse.json({ files: [] })
  }
}
