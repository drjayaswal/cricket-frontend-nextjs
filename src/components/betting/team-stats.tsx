import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Team {
  id: string;
  name: string;
  short_name: string;
  score: string;
  logo_url: string;
  head_coach?: string; // add this if you want to show coach name
}

interface TeamStatsProps {
  team: Team;
  teamPrice: string | number;
  color: string;
}

export function TeamStats({ team, teamPrice, color }: TeamStatsProps) {
  const generateBars = () => {
    const bars = [];
    const baseHeight = 20;
    let prevHeight = baseHeight;

    for (let i = 0; i < 20; i++) {
      const randomFactor = Math.random() * 8;
      const height = prevHeight + randomFactor;
      prevHeight = height;
      bars.push(height);
    }

    return bars;
  };

  const bars = generateBars();
  const colorClass = color === "green" ? "bg-purple-500" : "bg-cyan-500";
  const graphColor =
    color === "green"
      ? "bg-gradient-to-t from-purple-600/05 via-purple-600/50 to-purple-600"
      : "bg-gradient-to-t from-cyan-600/05 via-cyan-600/50 to-cyan-600";

  const priceTag = typeof teamPrice === "number" ? `₹${teamPrice}` : teamPrice;
  const priceClass = color === "green" ? "text-purple-500" : "text-cyan-500";

  return (
    <Card
      className={`bg-gray-900 shadow-lg overflow-hidden rounded-4xl p-7 border-2 border-transparent ${color === "green" ? "hover:border-purple-500" : "hover:border-cyan-500"
        }`}
    >
      <CardContent className="p-4">
        {/* Team Logo & Name */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={team.logo_url}
              alt={`${team.name} logo`}
              className="w-10 h-10 rounded-full border border-gray-700"
            />
            <h3 className="text-2xl md:text-3xl font-bold text-white">{team.name}</h3>
          </div>

          <div
            className={`px-3 py-1 rounded-full border-2 border-transparent ${colorClass === "bg-purple-500"
              ? "bg-purple-500/20"
              : "bg-cyan-500/20"
              }`}
          >
            <span className={`text-lg font-bold ${priceClass}`}>
              {priceTag}
            </span>
          </div>
        </div>

        <div className="text-lg text-gray-400 mb-1">
          <span className="font-semibold text-white">Score:</span> {team.score}
        </div>

        {team.head_coach && (
          <div className="text-sm text-gray-500 mb-4">
            Coach: {team.head_coach}
          </div>
        )}

        <div className="flex items-end h-32 gap-1 mb-4">
          {bars.map((height, index) => (
            <div
              key={index}
              className={`${graphColor} w-full`}
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>

        {/* CTA */}
        <Button
          variant="outline"
          className={`w-full border-transparent  text-white hover:text-gray-800 p-4 sm:size-default ${color === "green"
            ? "bg-purple-500/10 hover:bg-purple-500/70 hover:text-white text-purple-500"
            : "bg-cyan-500/10 hover:bg-cyan-500/70 hover:text-white text-cyan-500"
            }`}
        >
          Bet Now
        </Button>
      </CardContent>
    </Card>
  );
}