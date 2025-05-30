import {
  Mail,
  Phone,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  BirdIcon as Cricket,
  Trophy,
  Calendar,
  Users,
  BarChart2,
  HelpCircle,
  MessageSquare,
  Shield,
  Gift,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="mt-10 sm:mt-32 mb-5 px-5 sm:px-10 font-normal border-t border-white/20 py-10 bg-background">
      <div className="mx-auto p-5">
        {/* Main Footer Grid - 5 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="CricStock11 Logo" width={140} height={40} className="rounded-full" />
            </div>
            <p className="text-gray-400 text-sm">
              Your premier platform for cricket stock trading and fantasy league investments.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-gray-500 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Live Matches</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" />
                  <span>Player Stocks</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Upcoming Events</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Fantasy Leagues</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-lg">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Community</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  <span>Referral Program</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-medium text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 group">
                <Mail className="w-4 h-4 text-accent group-hover:text-accent/80" />
                <span className="group-hover:text-gray-300 transition-colors">support@cricstock11.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group">
                <Phone className="w-4 h-4 text-accent group-hover:text-accent/80" />
                <span className="group-hover:text-gray-300 transition-colors">+91 9999999999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group">
                <Globe className="w-4 h-4 text-accent group-hover:text-accent/80" />
                <span className="group-hover:text-gray-300 transition-colors">www.cricstock11.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Demo Component */}
        <div className="w-full p-6 rounded-lg mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-medium text-lg">Subscribe to our Newsletter</h4>
              <p className="text-gray-400 text-sm">Stay updated with the latest cricket stocks and market trends</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border-1 border-accent/50 focus:border-accent/80 text-white rounded-l-md focus:outline-none w-full md:w-64"
              />
              <button className="bg-accent/50 hover:bg-accent/80  text-white font-bold text-lg px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm pt-6">
          <div>© {new Date().getFullYear()} CricStock11. All rights reserved.</div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="terms-and-conditions" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-accent transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
