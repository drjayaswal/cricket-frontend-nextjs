"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const navlinks = [
  { href: "/", label: "Home" },
  { href: "/game-rules", label: "Game Rules" },
  { href: "/scoring-system", label: "Scoring System" },
  { href: "/legality", label: "Security & Legality" },
  { href: "/contact", label: "Contact Us" },
]

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* <div */}
      {/*   className={cn( */}
      {/*     "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300", */}
      {/*     isOpen ? "opacity-100" : "opacity-0 pointer-events-none" */}
      {/*   )} */}
      {/*   onClick={() => setIsOpen(false)} */}
      {/* /> */}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full max-w-sm shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-96"
        )}
      >
        <div className="flex flex-col space-y-4 bg-white/5 backdrop-blur-md mt-16 p-10 rounded-2xl">
          {navlinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileNav 
