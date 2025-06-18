"use client"

import { useState, useEffect } from "react"
import { PortfolioHeader } from "@/components/portfolio-header"
import { ProgressOverview } from "@/components/progress-overview"
import { PortfolioItemCard } from "@/components/portfolio-item-card"
import { AboutMe } from "@/components/about-me"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, FolderTree, Info } from "lucide-react"

interface PortfolioFile {
  name: string
  size: number
  url: string
  lastModified: Date
  type: string
}

interface PortfolioItem {
  id: string
  title: string
  description: string
  requirements: string[]
  files: PortfolioFile[]
  completed: boolean
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "reflectie",
      title: "Reflecteren",
      description: "Reflectieverslag met persoonlijk ontwikkelplan en feedback analyse volgens Covey theorie",
      requirements: [
        "Covey theorie toegepast",
        "Geschreven in ik-vorm",
        "Minimaal 1 A4, maximaal 2 A4",
        "Koppeling naar eerdere reflectieverslagen",
        "Persoonlijk ontwikkelplan met leerdoelen",
        "Feedback geven en ontvangen geanalyseerd",
      ],
      files: [],
      completed: false,
    },
    {
      id: "feedback",
      title: "Feedback geven en krijgen",
      description: "Complete verzameling feedbackformulieren van alle betrokken partijen",
      requirements: [
        "Feedbackformulier alle teamleden semester 2",
        "Feedbackformulier docent (groepsbeoordeling)",
        "Feedbackformulier externe opdrachtgever",
        "Voldoet aan regels goede feedback",
        "Constructieve en specifieke feedback",
      ],
      files: [],
      completed: false,
    },
    {
      id: "beroepsoriëntatie",
      title: "Beroepsoriëntatie",
      description: "Professioneel CV dat klaar is voor verzending naar potentiële stagebedrijven",
      requirements: [
        "Professioneel opgemaakt CV",
        "Klaar voor verzending naar stagebedrijf",
        "Relevante werkervaring en vaardigheden",
        "Contactgegevens en referenties",
      ],
      files: [],
      completed: false,
    },
    {
      id: "pop",
      title: "POP (Persoonlijk Ontwikkelplan)",
      description: "Uitgewerkt persoonlijk ontwikkelplan met concrete leerdoelen voor semester 2",
      requirements: [
        "Leerdoelen geformuleerd voor semester 2 van 2e studiejaar",
        "SMART geformuleerde doelstellingen",
        "Bewijslast van opgestelde doelen",
        "Bewijslast van behaalde doelen",
        "Reflectie op ontwikkeling",
      ],
      files: [],
      completed: false,
    },
    {
      id: "communicatie",
      title: "Communicatie",
      description: "Hogeschooltaal certificaat met vereiste scores voor alle onderdelen",
      requirements: [
        "Spelling werkwoorden (minimaal 80%)",
        "Spelling algemeen",
        "Zinstructuur",
        "Algemeen taalgebruik",
        "Gemiddelde 80% (behalve spelling werkwoorden dat minimaal 80% moet zijn)",
      ],
      files: [],
      completed: false,
    },
    {
      id: "onderzoek",
      title: "Onderzoek",
      description: "Compleet onderzoeksvoorstel en onderzoeksrapport volgens academische standaarden",
      requirements: [
        "Duidelijke probleemstelling",
        "Methode inclusief populatie en steekproef",
        "Meetinstrument en analyse beschreven",
        "Betrouwbaarheid en validiteit onderbouwd",
        "Onderzoeksrapport volgens BB checklist",
      ],
      files: [],
      completed: false,
    },
    {
      id: "projectmanagement",
      title: "Projectmanagement",
      description: "Complete verzameling van Scrum artefacten uit het projectwerk",
      requirements: [
        "Product Backlog met user stories",
        "Sprint Planning documentatie",
        "Sprint Backlog per sprint",
        "Sprint Reviews met stakeholder feedback",
        "Sprint Retrospectives met verbeterpunten",
        "Daily Scrums verslagen",
      ],
      files: [],
      completed: false,
    },
    {
      id: "edumundo",
      title: "Edumundo opdrachten",
      description: "Specifieke opdrachten uit de Edumundo modules voor persoonlijke ontwikkeling",
      requirements: [
        "Ken je kwaliteiten - Opdracht 8: Kernkwadranten van Ofman",
        "Ken je kwaliteiten - Opdracht 14: Persoonlijke SWOT analyse",
        "Netwerken - Opdracht 4: LinkedIn benutten voor professioneel netwerken",
      ],
      files: [],
      completed: false,
    },
  ])

  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const loadFiles = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/files/list")
      const filesData = await response.json()

      setPortfolioItems((prev) =>
        prev.map((item) => ({
          ...item,
          files: filesData[item.id] || [],
          completed: (filesData[item.id] || []).length > 0,
        })),
      )

      setLastRefresh(new Date())
    } catch (error) {
      console.error("Error loading files:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSingleItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/files/check/${itemId}`)
      const result = await response.json()

      setPortfolioItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                files: result.files || [],
                completed: (result.files || []).length > 0,
              }
            : item,
        ),
      )
    } catch (error) {
      console.error(`Error refreshing ${itemId}:`, error)
    }
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const completedItems = portfolioItems.filter((item) => item.completed).length
  const totalItems = portfolioItems.length
  const totalFiles = portfolioItems.reduce((sum, item) => sum + (item.files?.length || 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5" />
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <PortfolioHeader />

          <ProgressOverview completedItems={completedItems} totalItems={totalItems} />

          <AboutMe />

          {/* File Structure Info */}
          <Card className="mb-8 bg-gradient-to-br from-white to-blue-50/50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="w-5 h-5 text-blue-600" />
                Bestandsstructuur Instructies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FolderTree className="w-4 h-4 text-green-600" />
                    Mappenstructuur
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-gray-600">portfolio-files/</div>
                    <div className="ml-4 text-blue-600">├── projectmanagement/</div>
                    <div className="ml-8 text-gray-700">│ ├── product-backlog.pdf</div>
                    <div className="ml-8 text-gray-700">│ ├── sprint-planning.pdf</div>
                    <div className="ml-8 text-gray-700">│ └── retrospectives.pdf</div>
                    <div className="ml-4 text-blue-600">├── onderzoek/</div>
                    <div className="ml-8 text-gray-700">│ ├── onderzoeksvoorstel.pdf</div>
                    <div className="ml-8 text-gray-700">│ └── onderzoeksrapport.pdf</div>
                    <div className="ml-4 text-blue-600">└── feedback/</div>
                    <div className="ml-8 text-gray-700"> ├── team-feedback.pdf</div>
                    <div className="ml-8 text-gray-700"> └── docent-feedback.pdf</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Instructies</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      Maak submappen voor elke portfolio sectie
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      Plaats meerdere PDF bestanden per sectie
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      Gebruik duidelijke bestandsnamen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      Klik vernieuwen na het toevoegen van bestanden
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refresh Controls */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">Laatst bijgewerkt: {lastRefresh.toLocaleString("nl-NL")}</div>
              <div className="text-sm text-blue-600 font-medium">
                {totalFiles} bestand{totalFiles !== 1 ? "en" : ""} geladen
              </div>
            </div>
            <Button onClick={loadFiles} disabled={isLoading} variant="outline" className="gap-2">
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Alles vernieuwen
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {portfolioItems.map((item) => (
              <PortfolioItemCard key={item.id} item={item} onRefresh={refreshSingleItem} isLoading={isLoading} />
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <p className="text-gray-600 font-medium">© 2024-2025 NHL Stenden Hogeschool</p>
              <p className="text-gray-500">HBO Informatica - Professionele vaardigheden 2.2</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
