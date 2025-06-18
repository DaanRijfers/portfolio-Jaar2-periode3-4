"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Calendar, GraduationCap, Code, Heart } from "lucide-react"

export function AboutMe() {
  return (
    <Card className="mb-8 bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-2xl">Over Mij</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white/60 rounded-xl p-4 border border-white/40 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                Studie & Achtergrond
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ik ben een enthousiaste HBO Informatica student aan NHL Stenden Hogeschool. Momenteel zit ik in mijn
                tweede studiejaar en werk ik hard aan het ontwikkelen van mijn professionele vaardigheden binnen de
                IT-sector. Mijn passie ligt bij het creëren van innovatieve technische oplossingen en het werken in
                teamverband aan uitdagende projecten.
              </p>
            </div>

            <div className="bg-white/60 rounded-xl p-4 border border-white/40 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-green-600" />
                Technische Interesses
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Web Development
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Software Engineering
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Database Design
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  Project Management
                </Badge>
              </div>
              <p className="text-gray-600 text-sm">
                Ik ben vooral geïnteresseerd in moderne webontwikkeling, agile werkmethoden en het toepassen van nieuwe
                technologieën in praktische projecten.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/60 rounded-xl p-4 border border-white/40 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-600" />
                Persoonlijke Ontwikkeling
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Door mijn studie leer ik niet alleen technische vaardigheden, maar ontwikkel ik ook mijn communicatieve
                en professionele competenties. Ik geloof sterk in continue verbetering en reflectie op mijn eigen
                leerproces. Dit portfolio toont mijn groei en ontwikkeling gedurende mijn studieperiode.
              </p>
            </div>

            <div className="bg-white/60 rounded-xl p-4 border border-white/40 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Toekomstplannen
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Na mijn afstuderen wil ik graag werkzaam zijn als software developer of IT-consultant. Ik streef ernaar
                om bij te dragen aan innovatieve projecten en mijn kennis en vaardigheden verder uit te breiden in een
                professionele omgeving. Een stage vormt hierin een belangrijke stap.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-800">Studielocatie</span>
          </div>
          <p className="text-blue-700">NHL Stenden Hogeschool - Campus Emmen</p>
          <p className="text-sm text-blue-600 mt-1">HBO Informatica - Professionele vaardigheden 2.2</p>
        </div>
      </CardContent>
    </Card>
  )
}
