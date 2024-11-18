"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Gamepad2, Plane, Trophy, Star, Clock, MapPin, CheckCircle2, Circle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps"

// 使用更可靠的地图数据源
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// 修改坐标类型定义
type Coordinates = [number, number]

interface Place {
  name: string
  coordinates: Coordinates
  status: 'visited' | 'planned'
}

const visitedPlaces: Place[] = [
  // 已访问的地方
  // 日本
  { name: "Tokyo", coordinates: [139.6917, 35.6895] as Coordinates, status: "visited" },
  { name: "Osaka", coordinates: [135.5023, 34.6937] as Coordinates, status: "visited" },
  { name: "Kyoto", coordinates: [135.7681, 35.0116] as Coordinates, status: "visited" },

  // 菲律宾
  { name: "Manila", coordinates: [120.9842, 14.5995] as Coordinates, status: "visited" },
  { name: "Cebu", coordinates: [123.8854, 10.3157] as Coordinates, status: "visited" },

  // 柬埔寨
  { name: "Phnom Penh", coordinates: [104.9282, 11.5564] as Coordinates, status: "visited" },
  { name: "Siem Reap", coordinates: [103.8555, 13.3633] as Coordinates, status: "visited" },

  // 泰国
  { name: "Bangkok", coordinates: [100.5018, 13.7563] as Coordinates, status: "visited" },
  { name: "Phuket", coordinates: [98.3923, 7.8804] as Coordinates, status: "visited" },

  // 马来西亚
  { name: "Kuala Lumpur", coordinates: [101.6869, 3.1390] as Coordinates, status: "visited" },
  { name: "Penang", coordinates: [100.3293, 5.4141] as Coordinates, status: "visited" },

  // 计划去的地方
  // 美国
  { name: "New York", coordinates: [-74.0060, 40.7128] as Coordinates, status: "planned" },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522] as Coordinates, status: "planned" },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749] as Coordinates, status: "planned" },

  // 冰岛
  { name: "Reykjavik", coordinates: [-21.9426, 64.1466] as Coordinates, status: "planned" },
  { name: "Blue Lagoon", coordinates: [-22.4502, 63.8803] as Coordinates, status: "planned" },

  // 埃及
  { name: "Cairo", coordinates: [31.2357, 30.0444] as Coordinates, status: "planned" },
  { name: "Luxor", coordinates: [32.6396, 25.6872] as Coordinates, status: "planned" },
  { name: "Giza", coordinates: [31.1342, 29.9792] as Coordinates, status: "planned" }
]

export function AppHobbiesPage() {
  const [activeHobby, setActiveHobby] = useState<'gaming' | 'travel'>('travel')
  const [tooltipContent, setTooltipContent] = useState("")

  const games = [
    {
      name: 'League of Legends',
      hours: '1000+',
      rank: 'Diamond',
      achievements: ['5v5 Ranked', 'ARAM Master']
    },
    {
      name: 'World of Warcraft',
      hours: '2000+',
      rank: 'Level 70',
      achievements: ['Raid Leader', 'PvP Veteran']
    },
    {
      name: 'Diablo',
      hours: '500+',
      rank: 'Paragon 800',
      achievements: ['Hardcore Mode', 'Season Journey']
    },
    {
      name: 'Steam Games',
      hours: '1500+',
      rank: 'Various',
      achievements: ['Achievement Hunter', '100+ Games']
    }
  ]

  const travelSpots = [
    {
      country: 'Japan',
      cities: ['Tokyo', 'Osaka', 'Kyoto'],
      year: '2023',
      highlights: ['Cherry Blossom Season', 'Mount Fuji']
    },
    {
      country: 'Cambodia',
      cities: ['Siem Reap', 'Phnom Penh'],
      year: '2022',
      highlights: ['Angkor Wat', 'Local Markets']
    },
    {
      country: 'Philippines',
      cities: ['Manila', 'Cebu'],
      year: '2022',
      highlights: ['Island Hopping', 'Scuba Diving']
    },
    {
      country: 'Thailand',
      cities: ['Bangkok', 'Phuket'],
      year: '2021',
      highlights: ['Street Food', 'Temples']
    },
    {
      country: 'Malaysia',
      cities: ['Kuala Lumpur', 'Penang'],
      year: '2021',
      highlights: ['Twin Towers', 'Food Paradise']
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hobbies & Interests
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground italic"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Passions Beyond Code
        </motion.p>
      </div>

      {/* Hobby Selection */}
      <div className="flex gap-4 mb-8">
        <Button
          variant={activeHobby === 'gaming' ? 'default' : 'outline'}
          onClick={() => setActiveHobby('gaming')}
          className="flex items-center gap-2 px-6 py-4"
        >
          <Gamepad2 className="h-5 w-5" />
          Gaming Life
        </Button>
        <Button
          variant={activeHobby === 'travel' ? 'default' : 'outline'}
          onClick={() => setActiveHobby('travel')}
          className="flex items-center gap-2 px-6 py-4"
        >
          <Plane className="h-5 w-5" />
          Travel Journey
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {/* Gaming Content */}
        {activeHobby === 'gaming' && (
          <motion.div
            key="gaming"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Gaming Achievements</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game) => (
                  <Card key={game.name} className="p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                      <Image
                        src={`https://picsum.photos/seed/${game.name.toLowerCase()}/400/225`}
                        alt={game.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-white font-bold">{game.name}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{game.hours} Hours Played</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{game.rank}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {game.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Travel Content */}
        {activeHobby === 'travel' && (
          <motion.div
            key="travel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Travel Map</h2>
              </div>
              <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
                <ComposableMap
                  width={800}
                  height={400}
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 100,
                  }}
                >
                  <ZoomableGroup center={[30, 25]} zoom={1.5}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#2C3E50"
                            stroke="#ffffff"
                            strokeWidth={0.5}
                            style={{
                              default: {
                                outline: 'none',
                              },
                              hover: {
                                fill: "#34495E",
                                outline: 'none',
                              },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    {visitedPlaces.map(({ name, coordinates, status }) => (
                      <Marker key={name} coordinates={coordinates}>
                        <circle
                          r={4}
                          fill={status === "visited" ? "#10B981" : "#EF4444"}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                        <title>{name}</title>
                      </Marker>
                    ))}
                  </ZoomableGroup>
                </ComposableMap>
                {tooltipContent && (
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-lg">
                    <p className="text-sm font-medium">{tooltipContent}</p>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-lg">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Visited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Planned</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Plane className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Travel Adventures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelSpots.map((spot) => (
                  <Card key={spot.country} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-video">
                      <Image
                        src={`https://picsum.photos/seed/${spot.country.toLowerCase()}/400/225`}
                        alt={spot.country}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="absolute bottom-4 left-4">
                          <div className="flex items-center gap-2 text-white">
                            <MapPin className="h-4 w-4" />
                            <h3 className="font-bold">{spot.country}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{spot.year}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Cities Visited:</h4>
                        <div className="flex flex-wrap gap-2">
                          {spot.cities.map((city) => (
                            <Badge key={city} variant="outline" className="text-xs">
                              {city}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {spot.highlights.map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
