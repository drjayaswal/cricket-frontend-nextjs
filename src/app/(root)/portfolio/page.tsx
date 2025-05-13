import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Users, Trophy, Clock, Landmark, Bitcoin, DollarSign } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | CricStock11",
  description:
    "View your CricStock11 portfolio including player and team stocks, current performance, and investment value.",
};
export default function Portfolio() {
  return (
    <div className="p-5 min-h-screen bg-gray-950">
      <main className="container mx-auto px-4 py-8">
        {/* Portfolio Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Cricket Portfolio
          </h1>
          <p className="text-gray-400">
            Track your player investments and performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Card className="border-transparent">
            <CardContent className="p-6 border-2 border-transparent hover:border-purple-500 rounded-2xl bg-background/80">
              <div className="flex justify-around items-start">
                <div>
                  <p className="text-gray-400 text-md">Total Value</p>
                  <h3 className="text-3xl font-bold text-white mt-1">₹{"0"}</h3>
                  <p className="text-emerald-500 text-sm flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12.4%
                  </p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Landmark className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-transparent">
            <CardContent className="p-6 border-2 border-transparent hover:border-cyan-500 rounded-2xl bg-background/80">
              <div className="flex justify-around items-start">
                <div>
                  <p className="text-gray-400 text-md">Active Players</p>
                  <h3 className="text-3xl font-bold text-white mt-1">0</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    No active holdings
                  </p>
                </div>
                <div className="bg-cyan-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-cyan-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-transparent">
            <CardContent className="p-6 border-2 border-transparent hover:border-emerald-500 rounded-2xl bg-background/80">
              <div className="flex justify-around items-start">
                <div>
                  <p className="text-gray-400 text-md">Total Profit</p>
                  <h3 className="text-3xl font-bold text-white mt-1">₹{"0"}</h3>
                  <p className="text-emerald-500 text-sm flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +8.2%
                  </p>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Tabs */}
        <Tabs defaultValue="player" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-gray-800/50">
              <TabsTrigger
                value="player"
                className="p-4 data-[state=active]:bg-purple-500 text-white transition all ease-in-out duration-300 rounded-bl-2xl rounded-tl-2xl rounded-br-none rounded-tr-none"
              >
                Player Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="p-4 data-[state=active]:bg-purple-500 text-white transition all ease-in-out duration-300 rounded-br-2xl rounded-tr-2xl rounded-bl-none rounded-tl-none"
              >
                Team Portfolio
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="player">
            <Card className="bg-gray-800/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Player Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-6 rounded-full mb-4">
                    <Users className="h-10 w-10 text-gray-500 hover:text-purple-700" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    No current player holdings
                  </h3>
                  <p className="text-gray-400 max-w-md mb-6">
                    You don't have any active player investments. Add players to
                    your portfolio to start tracking their performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card className="bg-gray-800/30">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Team Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-6 rounded-full mb-4">
                    <Trophy className="h-10 w-10 text-gray-500 hover:text-purple-700" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    No team holdings
                  </h3>
                  <p className="text-gray-400 max-w-md mb-6">
                    You don't have any team investments yet. Add teams to your
                    portfolio to track their performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Transaction History */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Sold Players History
            </h2>
            <Button
              variant="outline"
              className="text-white hover:bg-background hover:text-white border-transparent hover:border-purple-600 border-2"
            >
              View All
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/30">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 bg-gray-800/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      Player
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                      Buy Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                      Sell Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                      Profit
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                      Percentage
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-gray-700">
                          <AvatarFallback className="bg-purple-900/30 text-purple-300">
                            SC
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">Sonam Choden</p>
                          <p className="text-xs text-gray-400">BW</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-300">
                      ₹29.5
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-300">
                      ₹35.75
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-emerald-500">
                      ₹50.00
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                        +21.19%
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Badge
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        Auto-sold
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Market Trends */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Market Trends</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-800/30 border-0">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-emerald-900/30 text-emerald-300 text-xs">
                            P{i}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white text-sm">
                            Player {i}
                          </p>
                          <p className="text-xs text-gray-400">All Rounder</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400">
                        +{(20 - i * 3).toFixed(1)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-2xl">Top Losers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-red-900/30 text-red-300 text-xs">
                            P{i + 6}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white text-sm">
                            Player {i + 6}
                          </p>
                          <p className="text-xs text-gray-400">Bowler</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400">
                        -{(5 + i * 3).toFixed(1)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
