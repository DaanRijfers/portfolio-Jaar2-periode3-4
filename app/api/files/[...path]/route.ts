import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const FILES_DIRECTORY = path.join(process.cwd(), "portfolio-files")

export async function GET(request: NextRequest, context: { params: { path: string[] } }) {
  try {
    const filePath = context.params.path.join("/")
    const fullPath = path.join(FILES_DIRECTORY, filePath)

    // Security check - ensure file is within the allowed directory
    if (!fullPath.startsWith(FILES_DIRECTORY)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Check if file exists
    try {
      await fs.access(fullPath)
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Read and return the file
    const fileBuffer = await fs.readFile(fullPath)
    const stats = await fs.stat(fullPath)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": stats.size.toString(),
        "Content-Disposition": `inline; filename="${path.basename(fullPath)}"`,
        "Cache-Control": "public, max-age=31536000",
      },
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
