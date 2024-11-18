"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Gamepad, MapPin, Star } from 'lucide-react'
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Speaking", href: "/speaking" },
  { name: "Hobbies", href: "/hobbies" },
]

type Coordinates = [number, number];

const travelExperiences = [
  {
    country: "Japan",
    highlight: "Cherry blossom viewing in Kyoto",
    coordinates: [139.6503, 35.6762] as Coordinates,
    year: 2023
  },
  {
    country: "Cambodia",
    highlight: "Exploring Angkor Wat temples",
    coordinates: [104.9167, 11.5625] as Coordinates,
    year: 2022
  },
  {
    country: "Philippines",
    highlight: "Island hopping in Palawan",
    coordinates: [120.9842, 14.5995] as Coordinates,
    year: 2022
  },
  {
    country: "Thailand",
    highlight: "Street food tour in Bangkok",
    coordinates: [100.5018, 13.7563] as Coordinates,
    year: 2021
  },
  {
    country: "Malaysia",
    highlight: "Hiking in Cameron Highlands",
    coordinates: [101.9758, 4.2105] as Coordinates,
    year: 2021
  }
] as const;

const travelPlans = [
  {
    country: "New Zealand",
    dream: "Bungee jumping in Queenstown",
    coordinates: [174.7633, -41.2865] as Coordinates
  },
  {
    country: "Egypt",
    dream: "Visiting the Pyramids of Giza",
    coordinates: [31.2357, 30.0444] as Coordinates
  },
  {
    country: "Iceland",
    dream: "Chasing the Northern Lights",
    coordinates: [-21.9426, 64.1466] as Coordinates
  },
  {
    country: "USA (Alaska)",
    dream: "Witnessing the midnight sun",
    coordinates: [-149.4937, 64.2008] as Coordinates
  }
] as const;

const gamingAchievements = [
  { game: "League of Legends", achievement: "Diamond rank player" },
  { game: "World of Warcraft", achievement: "Veteran player since vanilla" },
  { game: "Diablo series", achievement: "Completed all games on hardest difficulty" },
  { game: "Steam library", achievement: "100+ single-player games completed" },
]

const colorScale = scaleLinear()
  .domain([2021, 2023])
  .range(["#ffd700", "#ff4d4d"])

export { AppHobbiesPage as default }

export function AppHobbiesPage() {
  const [activeHobby, setActiveHobby] = useState<'travel' | 'gaming'>('travel')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container px-4 py-8">
        <motion.h1
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Passions Beyond Code
        </motion.h1>
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={activeHobby === 'travel' ? "default" : "outline"}
            onClick={() => setActiveHobby('travel')}
            className="flex items-center"
          >
            <Plane className="mr-2 h-4 w-4" />
            Travel Adventures
          </Button>
          <Button
            variant={activeHobby === 'gaming' ? "default" : "outline"}
            onClick={() => setActiveHobby('gaming')}
            className="flex items-center"
          >
            <Gamepad className="mr-2 h-4 w-4" />
            Gaming Quests
          </Button>
        </div>
        <AnimatePresence mode="wait">
          {activeHobby === 'travel' && (
            <motion.div
              key="travel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">My Travel Map</h2>
                <TravelMap />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 h-6 w-6 text-primary" />
                    Places I've Explored
                  </h2>
                  <ul className="space-y-4">
                    {travelExperiences.map((exp, index) => (
                      <motion.li
                        key={exp.country}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge variant="outline" className="mr-2 mt-1">
                          {exp.country}
                        </Badge>
                        <span>{exp.highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <Star className="mr-2 h-6 w-6 text-primary" />
                    Dream Destinations
                  </h2>
                  <ul className="space-y-4">
                    {travelPlans.map((plan, index) => (
                      <motion.li
                        key={plan.country}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge variant="outline" className="mr-2 mt-1">
                          {plan.country}
                        </Badge>
                        <span>{plan.dream}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Travel Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {['Japan', 'Cambodia', 'Philippines', 'Thailand', 'Malaysia'].map((country) => (
                    <div key={country} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={`https://picsum.photos/seed/${country.toLowerCase()}/400/400`}
                        alt={`Travel photo from ${country}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeHobby === 'gaming' && (
            <motion.div
              key="gaming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Gamepad className="mr-2 h-6 w-6 text-primary" />
                  Gaming Achievements
                </h2>
                <ul className="space-y-6">
                  {gamingAchievements.map((achievement, index) => (
                    <motion.li
                      key={achievement.game}
                      className="flex flex-col"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-semibold text-lg">{achievement.game}</span>
                      <span className="text-muted-foreground">{achievement.achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Favorite Games</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['League of Legends', 'World of Warcraft', 'Diablo', 'Steam Favorites'].map((game) => (
                      <div key={game} className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={`https://picsum.photos/seed/${game.toLowerCase()}/400/225`}
                          alt={`${game} cover`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Gaming Setup</h3>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="https://picsum.photos/seed/gaming-setup/800/400"
                      alt="My gaming setup"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function TravelMap() {
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  return (
    <div className="relative w-full h-[500px] bg-slate-900 rounded-xl overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        className="w-full h-full"
      >
        <ZoomableGroup center={[0, 20]} zoom={1}>
          <Geographies geography="/world-countries.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2C3E50"
                  stroke="#EAEAEC"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      fill: "#3D4E60",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* 已访问的地点 */}
          {travelExperiences.map(({ country, coordinates, year, highlight }) => (
            <Marker
              key={country}
              coordinates={coordinates}
              onMouseEnter={(e) => {
                setTooltipContent(`${country} (${year}): ${highlight}`)
                setTooltipPosition({ x: e.clientX, y: e.clientY })
              }}
              onMouseLeave={() => setTooltipContent("")}
            >
              <circle
                r={6}
                fill={colorScale(year)}
                stroke="#FFFFFF"
                strokeWidth={2}
                className="animate-pulse"
              />
            </Marker>
          ))}

          {/* 计划访问的地点 */}
          {travelPlans.map(({ country, coordinates, dream }) => (
            <Marker
              key={country}
              coordinates={coordinates}
              onMouseEnter={(e) => {
                setTooltipContent(`${country} (Planned): ${dream}`)
                setTooltipPosition({ x: e.clientX, y: e.clientY })
              }}
              onMouseLeave={() => setTooltipContent("")}
            >
              <circle
                r={5}
                fill="transparent"
                stroke="#64B5F6"
                strokeWidth={2}
                strokeDasharray="2,2"
                className="animate-ping"
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {tooltipContent && (
        <div
          className="absolute bg-black/75 text-white p-2 rounded-md text-sm pointer-events-none z-50 max-w-xs"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltipContent}
        </div>
      )}

      <div className="absolute bottom-4 right-4 bg-black/50 p-3 rounded-lg">
        <div className="flex items-center gap-4 text-white text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-blue-400 animate-ping" />
            <span>Planned</span>
          </div>
        </div>
      </div>
    </div>
  )
}
