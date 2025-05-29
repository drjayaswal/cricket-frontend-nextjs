"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navlinks = [
  { href: "/", label: "Home" },
  { href: "/game-rules", label: "Game Rules & Scoring" },
  { href: "/legality", label: "Security & Legality" },
  { href: "/contact-us", label: "Contact Us" },
]

const Navlinks = () => {
  return (
    <nav className="flex gap-3">
      {
        navlinks.map((link) => {
          const isActive = link.href === usePathname()
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-white hover:text-gray-300 px-5 py-2 rounded-full text-sm font-medium", isActive && "bg-white/10")}
            >
              {link.label}
            </Link>
          )
        })
      }
    </nav>
  )
}

export default Navlinks
