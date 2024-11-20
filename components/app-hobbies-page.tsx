"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
// import { Gamepad2, Plane, Trophy, Star, Clock, MapPin, CheckCircle2, Circle, Dices } from 'lucide-react'
import { Gamepad2, Plane, Trophy, Star, Clock, MapPin } from 'lucide-react'
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

// 更新国家图片映射
const countryImages = {
  Japan: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&h=900",  // 涩谷十字路口夜景
  Cambodia: "https://images.unsplash.com/photo-1540525080980-b97c4aa2e284?q=80&w=1600&h=900",  // 吴哥窟正面宏伟景观
  Philippines: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1600&h=900", // 长滩岛
  Thailand: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1600&h=900", // 大皇宫
  Malaysia: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1600&h=900"  // 吉隆坡街景与双子塔
}

export function AppHobbiesPage() {
  const [activeHobby, setActiveHobby] = useState<'gaming' | 'travel'>('travel')
  // const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipContent] = useState("")
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
      className="space-y-16"
    >
      <div className="flex flex-col space-y-4 py-8">
        <div className="relative h-[200px] rounded-xl overflow-hidden">
          {/* 背景图片 */}
          <div className="absolute inset-0">
            <Image
              src="/images/hobbies-banner.jpg"
              alt="Hobbies Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>

          {/* 内容区域 */}
          <div className="relative h-full flex items-center">
            <div className="container flex items-center gap-6 px-4">
              {/* 左侧图标组 */}
              <div className="hidden md:flex flex-col items-center justify-center p-4 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Gamepad2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* 右侧文字内容 */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold tracking-tight"
                  >
                    Hobbies & Interests
                  </motion.h1>
                  <div className="hidden sm:block h-8 w-[1px] bg-border"></div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden sm:flex items-center gap-2"
                  >
                    <Badge variant="secondary" className="px-3 py-1">
                      <Gamepad2 className="w-3 h-3 mr-1" />
                      Gaming
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                      <Plane className="w-3 h-3 mr-1" />
                      Travel
                    </Badge>
                  </motion.div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-muted-foreground"
                >
                  My Passions Beyond Code
                </motion.p>
              </div>
            </div>
          </div>
        </div>
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
                        src={countryImages[spot.country as keyof typeof countryImages]}
                        alt={`${spot.country} landscape`}
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
