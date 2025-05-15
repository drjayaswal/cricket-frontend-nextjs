import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TeamStatsProps {
  teamName: string;
  teamPrice: string | number;
  color: string;
}

export function TeamStats({ teamName, teamPrice, color }: TeamStatsProps) {
  // Generate random heights for the bars
  const generateBars = () => {
    const bars = [];
    const baseHeight = 20;
    let prevHeight = baseHeight;

    for (let i = 0; i < 20; i++) {
      // Gradually increase heights with some randomness
      const randomFactor = Math.random() * 8;
      const height = prevHeight + randomFactor;
      prevHeight = height;
      bars.push(height);
    }

    return bars;
  };

  const bars = generateBars();
  const colorClass = color === "green" ? "bg-purple-500" : "bg-cyan-500";
  const graphColor = color === "green" ? "bg-gradient-to-t from-purple-600/05 via-purple-600/50 to-purple-600" : "bg-gradient-to-t from-cyan-600/05 via-cyan-600/50 to-cyan-600"
  const priceTag = typeof teamPrice === "number" ? `₹${teamPrice}` : teamPrice;
  const priceClass = color === "green" ? "text-purple-500" : "text-cyan-500";
  const teamPriceValue = color === "green" ? "3.85" : "N/A";

  return (
    <Card
      className={`bg-gray-900 shadow-lg overflow-hidden rounded-4xl p-7 border-2 border-transparent ${
        color == "green" ? "hover:border-purple-500" : "hover:border-cyan-500"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-4xl font-bold text-white">{teamName}</h3>
          <div
            className={`px-3 py-1 rounded-full border-2 border-transparent ${
              colorClass === "bg-purple-500"
                ? "bg-purple-500/20"
                : "bg-cyan-500/20"
            }`}
          >
            <span className={`text-lg font-bold ${priceClass}`}>
              {priceTag}
            </span>
          </div>
        </div>

        <div className="text-lg text-gray-400 mb-2">
          Team Price: ₹ 50
        </div>

        <div className="flex items-end h-32 gap-1 mb-4">
          {bars.map((height, index) => (
            <div
              key={index}
              className={`${graphColor} w-full`}
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
