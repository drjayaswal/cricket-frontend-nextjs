import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PlayerModalProps {
  player: any
  isOpen: boolean
  onClose: () => void
}

export function PlayerModal({ player, isOpen, onClose }: PlayerModalProps) {
  if (!player) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {player.first_name} {player.last_name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{player.short_name}</Badge>
            <Badge variant="secondary">{player.country?.toUpperCase()}</Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Role:</span>
              <span className="capitalize">{player.playing_role}</span>
            </div>
            {player.batting_style && (
              <div className="flex justify-between">
                <span className="text-gray-400">Batting:</span>
                <span>{player.batting_style}</span>
              </div>
            )}
            {player.bowling_style && (
              <div className="flex justify-between">
                <span className="text-gray-400">Bowling:</span>
                <span>{player.bowling_style}</span>
              </div>
            )}
            {player.birthdate && (
              <div className="flex justify-between">
                <span className="text-gray-400">Born:</span>
                <span>{new Date(player.birthdate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
