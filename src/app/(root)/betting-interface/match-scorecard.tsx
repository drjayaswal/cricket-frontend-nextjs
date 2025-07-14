"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
    Target,
    TrendingUp,
    Users,
    Zap,
    MapPin,
    Thermometer,
    Trophy,
    Calendar,
    Activity,
    Clock,
    Sun,
    Droplets,
    BarChart3,
    Timer,
    Star,
    Award,
    HardHat,
    Radio,
    Files,
} from "lucide-react"
import type { CricketMatchData, Player, BettingPlayer, MatchScorecardProps } from "./types"
import { getRoleColor, formatMatchNotes, buyPlayer, sellPlayer } from "./services"
import { toast } from "sonner"
import sample from "./sample.json"


export default function MatchScorecard({ matchData }: MatchScorecardProps) {
    const [activeTab, setActiveTab] = useState<string>("live")
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [bettingPlayer, setBettingPlayer] = useState<BettingPlayer | null>(null)
    const [isBettingModalOpen, setIsBettingModalOpen] = useState(false)
    const [quantity, setQuantity] = useState(1);
    // const data: CricketMatchData = matchData
    // Patch sample to fix type error: match_notes should be string, not string[][]
    // Patch sample to fix type error: match_notes should be string, not string[][]
    // Also patch match_number to be string[][] as required by CricketMatchData
    const patchedSample = {
        ...sample,
        match_notes: Array.isArray(sample.match_notes)
            ? (sample.match_notes.flat().join(" | ") || "")
            : (sample.match_notes ?? ""),
        match_number: Array.isArray(sample.match_number)
            ? sample.match_number
            : (typeof sample.match_number === "string"
                ? [[sample.match_number]]
                : [[""]])
    }
    const data: CricketMatchData = patchedSample as CricketMatchData
    const match_id = data.match_id

    useEffect(() => {
        console.log(data)
    }, [])

    const currentInnings = data.innings[data.innings.length - 1]
    const battingTeam = currentInnings?.batting_team_id === data.teama.team_id ? data.teama : data.teamb
    const bowlingTeam = currentInnings?.batting_team_id === data.teama.team_id ? data.teamb : data.teama
    const matchNotesNormalized: string[][] = Array.isArray(data.match_notes?.[0]) ? data.match_notes as unknown as string[][] : [[data.match_notes as string]];

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-600 via-transparent to-transparent">
            <div className="container mx-auto px-3 py-4 space-y-4">
                {data.status_note && (
                    <div className="fixed top-23 left-1/2 transform -translate-x-1/2 z-50 flex justify-center w-full px-4">
                        <div className="pr-5 pl-3 py-3 rounded-full bg-[#7c8fa4] text-white text-base md:text-xl font-bold shadow-lg flex items-center gap-2">
                            <span className="text-red-500 text-shadow-sm bg-white px-4 rounded-4xl animate-pulse">Live</span>
                            <span className="whitespace-nowrap">{data.status_note}</span>
                        </div>
                    </div>
                )}

                <div className="text-center mb-4 mt-14">
                    <div className="flex items-center justify-center mb-10 gap-4">
                        <h1 className="text-6xl font-bold">
                            {data.competition.title}
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-white">
                        <div className="flex items-center gap-4 group">
                            <img
                                src={data.teama.logo_url}
                                alt={data.teama.name}
                                className="w-12 h-12 md:w-17 md:h-17 rounded-full shadow-lg backdrop-blur-md hover:scale-105 transition-transform duration-500"
                            />
                            <div className="text-left">
                                <span className="text-xl md:text-2xl font-extrabold block">{String(data.teama.name).toLocaleUpperCase()}</span>
                                <span className="text-base md:text-lg text-sky-400 font-bold block">{data.teama.scores_full || "Yet to bat"}</span>
                            </div>
                        </div>

                        <span className="text-3xl font-extrabold text-sky-400 animate-pulse">VS</span>

                        <div className="flex items-center gap-4 group">
                            <div className="text-right">
                                <span className="text-xl md:text-2xl font-extrabold block">{String(data.teamb.name).toLocaleUpperCase()}</span>
                                <span className="text-base md:text-lg text-gray-500 font-bold block">{data.teamb.scores_full || "Yet to bat"}</span>
                            </div>
                            <img
                                src={data.teamb.logo_url || "/placeholder.svg?height=48&width=48"}
                                alt={data.teamb.name}
                                className="w-12 h-12 md:w-17 md:h-17 rounded-full shadow-lg backdrop-blur-md hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-10">
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 overflow-visible mb-5">
                        <TabsTrigger
                            value="live"
                            className="mx-2 flex items-center cursor-pointer rounded-2xl justify-center gap-1 text-xl font-bold py-3 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-sky-600 hover:bg-white/40"
                        >
                            <Radio className="w-4 h-4 md:w-5 md:h-5" />
                            Live
                        </TabsTrigger>

                        <TabsTrigger
                            value="batting"
                            className="mx-2 flex items-center cursor-pointer rounded-2xl justify-center gap-1 text-xl font-bold py-3 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-sky-600 hover:bg-white/40"
                        >
                            <HardHat className="w-4 h-4 md:w-5 md:h-5" />
                            Batting
                        </TabsTrigger>

                        <TabsTrigger
                            value="bowling"
                            className="mx-2 flex items-center cursor-pointer rounded-2xl justify-center gap-1 text-xl font-bold py-3 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-sky-600 hover:bg-white/40"
                        >
                            <Target className="w-4 h-4 md:w-5 md:h-5" />
                            Bowling
                        </TabsTrigger>

                        <TabsTrigger
                            value="partnership"
                            className="mx-2 flex items-center cursor-pointer rounded-2xl justify-center gap-1 text-xl font-bold py-3 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-sky-600 hover:bg-white/40"
                        >
                            <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                            Partnership
                        </TabsTrigger>

                        <TabsTrigger
                            value="players"
                            className="mx-2 flex items-center cursor-pointer rounded-2xl justify-center gap-1 text-xl font-bold py-3 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-sky-600 hover:bg-white/40"
                        >
                            <Users className="w-4 h-4 md:w-5 md:h-5" />
                            Players
                        </TabsTrigger>

                        <TabsTrigger
                            value="match-notes"
                            className="mx-2 flex items-center cursor-pointer rounded-2xl justify-center gap-1 text-xl font-bold py-3 transition-colors duration-300 data-[state=active]:bg-white data-[state=active]:text-sky-600 hover:bg-white/40"
                        >
                            <Files className="w-4 h-4 md:w-5 md:h-5" />
                            Commentary
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="live" className="space-y-6 mt-6">
                        <Card className="bg-gradient-to-r via-sky-700 from-transparent to-transparent rounded-none shadow-none overflow-hidden">
                            <CardContent className="p-6 text-center space-y-4">
                                <h2 className="text-5xl font-bold text-white uppercase tracking-wide">{currentInnings.name.split(" ")[0]}</h2>
                                <div className="text-6xl md:text-7xl font-extrabold text-white">
                                    {currentInnings?.scores}
                                    {/* {currentInnings?.equations.runs}/{currentInnings?.equations.wickets} */}
                                </div>
                                <div className="text-lg md:text-xl text-gray-300">({currentInnings?.equations.overs} overs)</div>
                            </CardContent>
                        </Card>

                        {currentInnings.equations.overs != '' ?
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="bg-gradient-to-l from-sky-700/70 via-sky-700/20 to-transparent rounded-xl shadow-none transition">
                                    <CardHeader className="pb-2 -mb-5">
                                        <CardTitle className="text-3xl flex items-center gap-3 text-white">
                                            <img
                                                src={data.teama.logo_url || "/placeholder.svg?height=48&width=48"}
                                                alt={data.teama.name}
                                                className="w-12 h-12 md:w-17 md:h-17 rounded-full shadow-lg backdrop-blur-md hover:scale-105 transition-transform duration-500"
                                            />

                                            <span className="text-gray-400">{battingTeam.name}'s</span> Batsmen
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {currentInnings?.batsmen
                                            ?.filter((batsman) => batsman.batting === "true")
                                            .map((batsman) => (
                                                <div
                                                    key={batsman.batsman_id}
                                                    className="p-4"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="text-2xl font-bold text-white">{batsman.name}</h3>
                                                        <Badge variant={batsman.position === "striker" ? "default" : "secondary"} className="text-md font-bold">
                                                            {batsman.position === "striker" ? "Striker" : "Non-Striker"}
                                                        </Badge>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-base text-gray-300">
                                                        <div>
                                                            Runs: <span className="text-white font-bold">{batsman.runs}</span>
                                                        </div>
                                                        <div>
                                                            Balls: <span className="text-white font-bold">{batsman.balls_faced}</span>
                                                        </div>
                                                        <div>
                                                            4s: <span className="text-white font-bold">{batsman.fours}</span>
                                                        </div>
                                                        <div>
                                                            6s: <span className="text-white font-bold">{batsman.sixes}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 pt-2 border-t border-white/10 text-sm text-gray-400">
                                                        SR: <span className="text-white font-bold">{batsman.strike_rate}</span>
                                                    </div>
                                                </div>
                                            ))}
                                    </CardContent>
                                </Card>

                                {/* === Current Bowler + Match Stats === */}
                                <Card className="bg-gradient-to-r from-sky-700/70 via-sky-700/70 to-transparent rounded-xl shadow-none transition">
                                    <CardHeader className="pb-2 -mb-5">
                                        <CardTitle className="text-3xl flex items-center gap-3 text-white">
                                            <img
                                                src={data.teamb.logo_url || "/placeholder.svg?height=48&width=48"}
                                                alt={data.teamb.name}
                                                className="w-12 h-12 md:w-17 md:h-17 rounded-full shadow-lg backdrop-blur-md hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="text-gray-400">{bowlingTeam.name}'s</span> Bowlers
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {currentInnings?.bowlers
                                            ?.filter((bowler) => bowler.bowling === "true")
                                            .map((bowler) => (
                                                <div
                                                    key={bowler.bowler_id}
                                                    className="p-4"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="text-lg font-bold text-white">{bowler.name}</h3>
                                                        <Badge variant="destructive" className="text-md font-bold">Bowling</Badge>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-base text-gray-300">
                                                        <div>
                                                            Overs: <span className="text-white font-bold">{bowler.overs}</span>
                                                        </div>
                                                        <div>
                                                            Runs: <span className="text-white font-bold">{bowler.runs_conceded}</span>
                                                        </div>
                                                        <div>
                                                            Wickets: <span className="text-white font-bold">{bowler.wickets}</span>
                                                        </div>
                                                        <div>
                                                            Maidens: <span className="text-white font-bold">{bowler.maidens}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 pt-2 border-t border-white/10 text-sm text-gray-400">
                                                        Econ: <span className="text-white font-bold">{bowler.econ}</span>
                                                    </div>
                                                </div>
                                            ))}

                                        {/* === Extra Stats Inside Bowler Card === */}
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="p-4">
                                                <p className="text-4xl font-bold text-white">{currentInnings?.equations.runrate}</p>
                                                <p className="text-gray-400 font-bold text-xl mt-1">Run Rate</p>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-4xl font-bold text-white">{currentInnings?.extra_runs.total}</p>
                                                <p className="text-gray-400 font-bold text-xl mt-1">Extras</p>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-4xl font-bold text-white">{currentInnings?.equations.bowlers_used}</p>
                                                <p className="text-gray-400 font-bold text-xl mt-1">Bowlers Used</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            :
                            <div className="mb-3">
                                <div className="text-center">
                                    <p className="text-gray-400 text-4xl">{data.live}</p>
                                </div>
                            </div>
                        }
                    </TabsContent>
                    <TabsContent value="batting">
                        <div className="space-y-4">
                            {data.innings.map((inning, idx) => (
                                <Card key={inning.iid} className="border-slate-700 bg-slate-800/50">
                                    <CardHeader className="pb-2 border-b-white/20 border-b">
                                        <CardTitle className="text-5xl font-bold text-white -mb-4">
                                            {inning.name} — {inning.scores_full}
                                        </CardTitle>
                                    </CardHeader>
                                    {inning.bowlers.length != 0 ?
                                        <CardContent>
                                            <div className="space-y-2">
                                                {inning.batsmen?.map((batsman) => {
                                                    const isBatting = batsman.batting === "true";
                                                    const isOut = batsman.how_out !== "Not out";

                                                    return (
                                                        <div
                                                            key={batsman.batsman_id}
                                                            className={`flex items-center justify-between p-3 rounded-md transition ${!isOut && idx == (Number(data.latest_inning_number) - 1)
                                                                ? "bg-gray-700/20 hover:bg-gray-700/60 cursor-pointer"
                                                                : isOut
                                                                    ? "opacity-50 cursor-not-allowed"
                                                                    : ""
                                                                }`}
                                                            onClick={() => {
                                                                if (!isOut && idx == (Number(data.latest_inning_number) - 1)) {
                                                                    setBettingPlayer(batsman)
                                                                    setIsBettingModalOpen(true)
                                                                }
                                                            }}
                                                        >
                                                            <div>
                                                                <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                                                                    {batsman.name}
                                                                    {isBatting && (
                                                                        <Badge variant="default" className="text-2xl m-0 p-0 text-white">
                                                                            *
                                                                        </Badge>
                                                                    )}
                                                                </h3>
                                                                <p className="text-sm font-bold text-gray-400">
                                                                    {batsman.runs} runs in {batsman.balls_faced} balls
                                                                </p>
                                                                {isOut && (
                                                                    <p className="text-sm font-bold text-red-400">{batsman.how_out}</p>
                                                                )}
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xl font-bold text-white">
                                                                    SR: {batsman.strike_rate}
                                                                </p>
                                                                <p className="text-xl font-bold text-gray-400">
                                                                    {batsman.fours} × 4s, {batsman.sixes} × 6s
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                        :
                                        <div className="mb-3">
                                            <div className="text-center">
                                                <p className="text-gray-400 text-4xl">{data.live}</p>
                                            </div>
                                        </div>
                                    }
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="bowling">
                        <div className="space-y-4">
                            {data.innings.map((inning, index) => (
                                <Card key={inning.iid} className="bg-slate-800/50 border-slate-700">
                                    <CardHeader className="border-b-white/20 border-b">
                                        <CardTitle className="text-white flex items-center gap-5 px-2">
                                            <span className="text-5xl">
                                                {index == 1 ?
                                                    `${index + 1}nd Innings`
                                                    :
                                                    `${index + 1}st Innings`
                                                }
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    {inning.bowlers.length != 0 ?
                                        <CardContent>
                                            <div className="space-y-2">
                                                {inning.bowlers.map((bowler) => (
                                                    <div
                                                        key={bowler.bowler_id}
                                                        className="flex items-center justify-between p-2"
                                                    >
                                                        <div>
                                                            <h3 className="text-white font-bold text-2xl flex items-center gap-2">
                                                                {bowler.name}
                                                                {bowler.bowling === "true" && (
                                                                    <Badge variant="destructive" className="text-4xl m-0 p-0 text-red-700 animate-pulse">
                                                                        *
                                                                    </Badge>
                                                                )}
                                                            </h3>
                                                            <p className="text-gray-400 text-lg">
                                                                {bowler.overs} overs
                                                                {Number(bowler.maidens) > 0 ? `, ${bowler.maidens} maidens` : ""}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-white font-bold text-2xl">
                                                                {bowler.wickets}/{bowler.runs_conceded}
                                                            </p>
                                                            <p className="text-gray-400 text-lg">@ {bowler.econ}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        :
                                        <div className="mb-3">
                                            <div className="text-center">
                                                <p className="text-gray-400 text-4xl">{data.live}</p>
                                            </div>
                                        </div>
                                    }
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="partnership">
                        <div className="space-y-4">
                            {data.innings[Number(data.latest_inning_number) - 1].current_partnership && (
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader className="pb-2 border-b-white/20 border-b">
                                        <CardTitle className="text-white text-5xl flex gap-5 items-center">
                                            Current Partnership
                                        </CardTitle>
                                    </CardHeader>
                                    {data.innings[Number(data.latest_inning_number) - 1].current_partnership.balls != '' ?
                                        <CardContent>
                                            <div className="grid grid-cols-3 gap-2 mb-3">
                                                <div className="text-center">
                                                    <p className="text-5xl font-bold text-white">{currentInnings.current_partnership.runs}</p>
                                                    <p className="text-gray-400 text-4xl">Runs</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-5xl font-bold text-white">{currentInnings.current_partnership.balls}</p>
                                                    <p className="text-gray-400 text-4xl">Balls</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-5xl font-bold text-white">{currentInnings.current_partnership.overs}</p>
                                                    <p className="text-gray-400 text-4xl">Overs</p>
                                                </div>
                                            </div>
                                            <Separator className="my-7 bg-white" />
                                            <div className="space-y-1">
                                                {currentInnings.current_partnership.batsmen?.map((batsman, index) => (
                                                    <div key={index} className="flex justify-between items-center font-bold text-3xl">
                                                        <span className="text-white">{batsman.name}</span>
                                                        <span className="text-gray-400">
                                                            {batsman.runs} in {batsman.balls}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        :
                                        <div className="mb-3">
                                            <div className="text-center">
                                                <p className="text-gray-400 text-4xl">{data.live}</p>

                                            </div>
                                        </div>
                                    }
                                </Card>
                            )}

                            {/* Fall of Wickets - Compact */}
                            {currentInnings?.fows && currentInnings.fows.length > 0 && (
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-white text-5xl">Fall of Wickets</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {currentInnings.fows.map((wicket, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-2"
                                                >
                                                    <div>
                                                        <span className="text-white font-bold text-2xl">{wicket.name}</span>
                                                        <p className="text-gray-400 text-2xl">{wicket.how_out}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-white font-bold text-4xl">
                                                            {wicket.score_at_dismissal}/{wicket.number}
                                                        </span>
                                                        <p className="text-gray-400 text-xl">({wicket.overs_at_dismissal} ov)</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="players">
                        <div className="space-y-4">
                            {Array.from(new Set(data.players.map((p) => p.nationality))).map((nationality) => (
                                <Card key={nationality} className="shadow-none bg-slate-800/50">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-white text-4xl flex items-center gap-2">
                                            {nationality}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 -mt-5">
                                            {data.players.filter((player) => player.nationality === nationality).map((player) => (
                                                <div
                                                    key={player.pid}
                                                    className="bg-gradient-to-br from-[#19317b]/30 via-[#2c256c]/20 to-[#4b1577]/10 rounded-lg p-4 hover:from-[#19317b]/40 hover:via-[#2c256c]/30 hover:to-[#4b1577]/20 duration-500 cursor-pointer transform transition-all hover:scale-102 "
                                                    onClick={() => {
                                                        setSelectedPlayer(player as any)
                                                        setIsModalOpen(true)
                                                    }}
                                                >
                                                    <div className="space-y-1">
                                                        <div className="flex items-start justify-between">
                                                            <h3 className="text-white font-bold text-md">
                                                                {player.first_name} {player.last_name}
                                                            </h3>
                                                            <Badge
                                                                variant="outline"
                                                                className={`text-sm ${getRoleColor(player.playing_role)} text-white border-0 font-extrabold`}
                                                            >
                                                                {player.playing_role.toUpperCase() == "BAT" ? "Batsman" : player.playing_role.toUpperCase() == "BOWL" ? "Bowler" : player.playing_role.toUpperCase() == "ALL" ? "All Rounder" : player.playing_role.toUpperCase() == "WK" ? "Wicket Keeper" : "Player"}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-gray-400 text-sm font-bold">{player.short_name}</p>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-yellow-400 text-sm font-bold">{player.fantasy_player_rating}/10</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="match-notes">
                        <Card className="bg-slate-800/50">
                            <CardHeader className="-mb-2 border-b border-b-white/20">
                                <CardTitle className="text-white text-4xl flex items-center gap-2 py-2">
                                    <BarChart3 className="w-10 h-10" />
                                    Match Commentary
                                </CardTitle>
                            </CardHeader>
                            { }
                            <CardContent>
                                <div className="space-y-2">
                                    {formatMatchNotes(matchNotesNormalized).map((note, index) => (
                                        <div
                                            key={index}
                                            className="p-2"
                                        >
                                            <p className="text-gray-300 text-md font-bold">{note}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>


                {selectedPlayer && isModalOpen && (
                    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-black/70 p-4">
                        <div className="w-full max-w-md transform rounded-xl bg-gradient-to-br from-gray-900/80 via-gray-900/90 to-gray-900 p-6 shadow-lg transition-all duration-300">
                            <div className="mb-4 flex items-start justify-between">
                                <h2 className="text-2xl font-bold text-white">
                                    {selectedPlayer.first_name} {selectedPlayer.last_name}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedPlayer(null);
                                    }}
                                    className="text-gray-400 transition-colors hover:text-white cursor-pointer shadow-md"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Role:</span>
                                    <Badge className={getRoleColor(selectedPlayer.playing_role)}>
                                        {(() => {
                                            const role = selectedPlayer.playing_role.toUpperCase();
                                            if (role === "BAT") return "Batsman";
                                            if (role === "BOWL") return "Bowler";
                                            if (role === "ALL") return "All Rounder";
                                            if (role === "WK") return "Wicket Keeper";
                                            return "Player";
                                        })()}
                                    </Badge>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-400">Country:</span>
                                    <span className="text-white">{selectedPlayer.nationality}</span>
                                </div>

                                {selectedPlayer.birthdate && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Born:</span>
                                        <span className="text-white">{selectedPlayer.birthdate}</span>
                                    </div>
                                )}

                                {selectedPlayer.batting_style && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Batting:</span>
                                        <span className="text-white">{selectedPlayer.batting_style}</span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span className="text-gray-400">Rating:</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-white">{selectedPlayer.fantasy_player_rating}/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {bettingPlayer && isBettingModalOpen && (
                    <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-black/70 p-4">
                        <div className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-gray-900/90 via-gray-900/90 to-gray-900 p-8 shadow-2xl transition-all duration-300">
                            {/* === Header === */}
                            <div className="mb-6 flex items-start justify-between">
                                <h2 className="text-2xl md:text-3xl flex items-center gap-4 font-extrabold text-white">
                                    {bettingPlayer.name}
                                    <span className="text-sm text-gray-600 capitalize">{bettingPlayer.position}</span>
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsBettingModalOpen(false);
                                        setBettingPlayer(null);
                                    }}
                                    className="text-gray-400 transition-colors hover:text-white text-xl cursor-pointer"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* === Stats === */}
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-800/40 rounded-lg p-4">
                                    <p className="text-2xl font-bold text-white">{bettingPlayer.runs}</p>
                                    <p className="text-sm font-bold text-gray-400">Runs</p>
                                </div>
                                <div className="bg-gray-800/40 font-bold rounded-lg p-4">
                                    <p className="text-2xl font-bold text-white">{bettingPlayer.balls_faced}</p>
                                    <p className="text-sm text-gray-400">Balls</p>
                                </div>
                                <div className="bg-gray-800/40 font-bold rounded-lg p-4">
                                    <p className="text-2xl font-bold text-white">{Number(bettingPlayer.strike_rate)}</p>
                                    <p className="text-sm text-gray-400">Strike Rate</p>
                                </div>
                                <div className="bg-gray-800/40 font-bold rounded-lg p-4">
                                    <p className="text-2xl font-bold text-white">{bettingPlayer.fours}</p>
                                    <p className="text-sm text-gray-400">Fours</p>
                                </div>
                                <div className="bg-gray-800/40 font-bold rounded-lg p-4">
                                    <p className="text-2xl font-bold text-white">{bettingPlayer.sixes}</p>
                                    <p className="text-sm text-gray-400">Sixes</p>
                                </div>
                                <div className="bg-gray-800/40 font-bold rounded-lg p-4">
                                    <p className="text-2xl font-bold text-white">
                                        {bettingPlayer.balls_faced && Number(bettingPlayer.balls_faced) > 0
                                            ? `${Math.round((Number(bettingPlayer.run0) / Number(bettingPlayer.balls_faced)) * 100)}`
                                            : "N/A"}
                                    </p>
                                    <p className="text-sm font-bold text-gray-400">Dot %</p>
                                </div>
                                <div className="bg-gray-800/40 font-bold rounded-lg p-4">
                                    <p className="text-2xl font-bold text-white">₹{30}</p>
                                    <p className="text-sm text-gray-400">Price</p>
                                </div>
                            </div>
                            {/* === Quantity Selector === */}
                            <div className="mt-8">
                                <label className="block mb-2 text-sm font-bold text-gray-300">Select Quantity</label>
                                <div className="flex gap-1.5 flex-wrap">
                                    {[1, 5, 10, 15, 20, 25, 30, 35].map((qty) => (
                                        <button
                                            key={qty}
                                            onClick={() => setQuantity(qty)}
                                            className={`px-[16.7px] py-2 rounded-lg text-white font-bold transition-all cursor-pointer ${quantity === qty
                                                ? "bg-green-600 border-green-700"
                                                : "bg-gray-800 hover:bg-gray-700"
                                                }`}
                                        >
                                            {qty}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* === CTA Buttons === */}
                            <div className="mt-8 flex flex-col md:flex-row gap-4">
                                <button
                                    className="flex-1 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg shadow-md transition cursor-pointer"
                                    onClick={async () => {
                                        const data = await buyPlayer(bettingPlayer, "30", String(quantity), match_id)
                                        toast(data.message)
                                    }}
                                >
                                    Buy Player
                                </button>
                                <button
                                    className="flex-1 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg shadow-md transition cursor-pointer"
                                    onClick={async () => {
                                        const data = await sellPlayer(bettingPlayer, "35", String(quantity), match_id)
                                        toast(data.message)
                                    }}
                                >
                                    Sell Player
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <Card className="bg-gradient-to-r via-sky-700/70 from-transparent to-transparent">
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-3xl">
                            <div>
                                <h4 className="text-white font-bold mb-1">Umpires</h4>
                                <p className="text-white/60 font-bold text-lg">{data.umpires}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Match Referee</h4>
                                <p className="text-white/60 font-bold text-lg">{data.referee}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="w-full flex justify-center mb-12">
                    <Card className="w-full bg-gradient-to-r via-sky-700/70 from-transparent to-transparent rounded-3xl">
                        <CardContent className="px-6 py-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {/* Venue */}
                                {typeof data.venue === "object" && data.venue && (
                                    <div className="space-y-4">
                                        <h4 className="flex items-center gap-3 text-white font-semibold text-2xl md:text-3xl">
                                            <MapPin className="w-8 h-8 text-emerald-400" />
                                            Venue
                                        </h4>
                                        <div className="text-gray-300 text-lg md:text-xl leading-relaxed">
                                            {Object.entries(data.venue)
                                                .filter(([key, value]) => !!value && key !== "timezone")
                                                .map(([key, value]) => {
                                                    if (key === "venue_id") return null;
                                                    return (
                                                        <p key={key}>
                                                            <span className="font-semibold text-white">
                                                                {key
                                                                    .replace(/_/g, " ")
                                                                    .replace(/\b\w/g, (l) => l.toUpperCase())
                                                                }
                                                            </span>{" "}
                                                            {typeof value === "string" || typeof value === "number" ? value : ""}
                                                        </p>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                )}

                                {/* Weather */}
                                {data.weather && typeof data.weather === "object" && !!data.weather.weather_desc && (
                                    <div className="space-y-4">
                                        <h4 className="flex items-center gap-3 text-white font-semibold text-2xl md:text-3xl">
                                            <Thermometer className="w-8 h-8 text-orange-400" />
                                            Weather
                                        </h4>
                                        <div className="text-gray-300 text-lg md:text-xl leading-relaxed">
                                            {typeof data.weather.weather_desc === "string" && data.weather.weather_desc.trim().length > 0 && (() => {
                                                // Defensive split for hydration error proofing
                                                const words = data.weather.weather_desc.split(" ");
                                                if (words.length >= 2) {
                                                    const first = words[0];
                                                    const second = words[1];
                                                    return (
                                                        <p>
                                                            {first.charAt(0).toUpperCase() + first.slice(1)}{" "}
                                                            {second.charAt(0).toUpperCase() + second.slice(1)}
                                                        </p>
                                                    );
                                                } else {
                                                    return <p>{data.weather.weather_desc}</p>;
                                                }
                                            })()}
                                            <div>
                                                {typeof data.weather.temp !== "undefined" && data.weather.temp !== null && (
                                                    <p>
                                                        <span className="font-semibold text-white">Temperature</span>{" "}
                                                        {String(data.weather.temp)}°C
                                                    </p>
                                                )}
                                                {data.weather.wind_speed && (
                                                    <p>
                                                        <span className="font-semibold text-white">Wind</span> {data.weather.wind_speed}km/h
                                                    </p>
                                                )}
                                                {data.weather.humidity && (
                                                    <p>
                                                        <span className="font-semibold text-white">Humidity</span> {data.weather.humidity}%
                                                    </p>
                                                )}
                                                {data.weather.clouds && (
                                                    <p>
                                                        <span className="font-semibold text-white">Clouds</span> {data.weather.clouds}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Pitch */}
                                {data.pitch && typeof data.pitch === "object" && (
                                    (data.pitch.pitch_condition ||
                                        data.pitch.batting_condition ||
                                        data.pitch.pace_bowling_condition ||
                                        data.pitch.spine_bowling_condition) && (
                                        <div className="space-y-4">
                                            <h4 className="flex items-center gap-3 text-white font-semibold text-2xl md:text-3xl">
                                                <Droplets className="w-8 h-8 text-blue-400" />
                                                Pitch
                                            </h4>
                                            <div className="text-gray-300 text-lg md:text-xl leading-relaxed">
                                                {data.pitch.pitch_condition && (
                                                    <p>{data.pitch.pitch_condition}</p>
                                                )}
                                                {data.pitch.batting_condition && (
                                                    <p>
                                                        <span className="font-semibold text-white">Batting</span> {data.pitch.batting_condition}
                                                    </p>
                                                )}
                                                {data.pitch.pace_bowling_condition && (
                                                    <p>
                                                        <span className="font-semibold text-white">Pace Bowling</span> {data.pitch.pace_bowling_condition}
                                                    </p>
                                                )}
                                                {data.pitch.spine_bowling_condition && (
                                                    <p>
                                                        <span className="font-semibold text-white">Spin Bowling</span> {data.pitch.spine_bowling_condition}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

