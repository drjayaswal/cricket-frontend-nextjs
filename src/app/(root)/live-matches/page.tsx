"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { CalendarIcon, PlusIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FeaturedBanner } from "./featured-banner"
// Removed StockTicker import

export default function LiveMatches() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isIndianMatchToday, setIsIndianMatchTiday] = useState(true)
  const matches = [
    {
      id: 1,
      title: "ODI | ICC Men's Cricket World Cup 2025",
      date: "15th October 2025",
      teams: [
        {
          name: "India",
          img: "/teams/india.png",
          price: "₹380.50",
          change: "+4.1%",
          changeColor: "text-emerald-400",
        },
        {
          name: "Australia",
          img: "/teams/australia.png",
          price: "₹350.75",
          change: "-2.3%",
          changeColor: "text-red-400",
        },
      ],
    },
    {
      id: 2,
      title: "ODI | ICC Men's Cricket World Cup 2025",
      date: "16th October 2025",
      teams: [
        {
          name: "Pakistan",
          img: "/teams/pakistan.png",
          price: "₹310.25",
          change: "+1.8%",
          changeColor: "text-emerald-400",
        },
        {
          name: "South Africa",
          img: "/teams/proteas.png",
          price: "₹298.40",
          change: "-1.5%",
          changeColor: "text-red-400",
        },
      ],
    },
    {
      id: 3,
      title: "ODI | ICC Men's Cricket World Cup 2025",
      date: "17th October 2025",
      teams: [
        {
          name: "England",
          img: "/teams/england.png",
          price: "₹420.75",
          change: "+3.2%",
          changeColor: "text-emerald-400",
        },
        {
          name: "New Zealand",
          img: "/teams/kiwi.png",
          price: "₹390.60",
          change: "-0.8%",
          changeColor: "text-red-400",
        },
      ],
    },
  ];

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Featured Indian Matches */}
      {isIndianMatchToday && (
        <>
          <FeaturedBanner />
        </>
      )}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <motion.div
          {...{ className: "mb-8 mx-5 flex items-center justify-between" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold">Live Matches</h1>
          <div className="flex items-center gap-4 text-xl text-white">
            <CalendarIcon className="h-4 w-4" />
            <span>{new Date().toDateString()}</span>
          </div>
        </motion.div>


        <motion.div
          {...{ className: "grid gap-6 md:grid-cols-2 lg:grid-cols-1" }}
          variants={container}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          {matches.map((match) => (
            <motion.div key={match.id} variants={item}>
              <Card className="border-0 bg-gray-900 text-gray-100 overflow-hidden transition-all duration-300 group">
                {/* Header */}
                <CardHeader className="">
                  <CardTitle className="flex items-center justify-between text-base font-medium">
                    <span className="text-2xl font-semibold">{match.title}</span>
                    <span className="flex items-center gap-1 text-lg">
                      <CalendarIcon className="h-4 w-4 text-gray-400" /> {match.date}
                    </span>
                  </CardTitle>
                </CardHeader>

                <hr className="border-1 border-[#1671CC]" />

                {/* Match Content */}
                <CardContent className="py-6">
                  <div className="relative flex items-center justify-between">
                    {/* Team 1 */}
                    <div className="flex flex-col items-center gap-3 w-1/3">
                      <motion.div
                        {...{ className: "flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 shadow-md" }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Image
                          src={match.teams[0].img}
                          alt={match.teams[0].name}
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      </motion.div>
                      <span className="text-lg font-semibold">{match.teams[0].name}</span>
                      <span className={`text-sm ${match.teams[0].changeColor}`}>
                        {match.teams[0].price} ({match.teams[0].change})
                      </span>
                    </div>

                    {/* VS Section */}
                    <div className="text-center text-gray-100">
                      <div className="relative flex flex-col items-center">
                        <span className="text-4xl font-extrabold text-gray-300">VS</span>
                        <div className="text-sm text-gray-400 mt-1">
                          <span>Time: 7:00 PM</span>
                          <br />
                          <span>Location: Dubai Stadium</span>
                        </div>
                      </div>
                    </div>

                    {/* Team 2 */}
                    <div className="flex flex-col items-center gap-3 w-1/3">
                      <motion.div
                        {...{ className: "flex h-20 w-20 items-center justify-center rounded-full bg-white p-2 shadow-md" }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Image
                          src={match.teams[1].img}
                          alt={match.teams[1].name}
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      </motion.div>
                      <span className="text-lg font-semibold">{match.teams[1].name}</span>
                      <span className={`text-sm ${match.teams[1].changeColor}`}>
                        {match.teams[1].price} ({match.teams[1].change})
                      </span>
                    </div>
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="border-t border-gray-700 flex justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <Button className="bg-[#1671CC]/60 hover:bg-[#1671CC] p-6 text-xl transition-all duration-300 w-full" asChild>
                  <Link href={"/betting-interface"}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add to Portfolio
                  </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
