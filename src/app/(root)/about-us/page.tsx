import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StockAnimationBackground } from "@/components/about-us/stock-animation-background";
import { CricketStockChart } from "@/components/about-us/cricket-stock-chart";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0" />
        <div className="absolute inset-0 " />
        <StockAnimationBackground />
        <div className="container relative z-10 px-4 md:px-6 max-w-[95rem] mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-snug">
              <span className="text-gray-300">
                Driven by Passion, Backed by Data.
              </span>
            </h1>
            <p className="text-md md:text-xl text-gray-400 max-w-2xl">
              Step into a new era of cricket where every trade can change the
              game.
            </p>
          </div>
        </div>{" "}
      </section>

      {/* Our Story Section */}

      <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden max-w-[95rem] mx-auto text-center flex justify-center items-center">
        <div className="absolute inset-0 opacity-80 z-0" />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="inline-block rounded-lg px-3 py-1 text-sm text-gray-300">
            Our Story
          </div>
          <div>
            <div className="space-y-4 rounded-xl p-3">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                From Vision to Reality
              </h2>
              <p className=" p-5 text-gray-400 md:text-xl/relaxed">
                Founded in 2023, CricStock11 emerged from a passion for cricket
                and a vision to transform how fans engage with the sport. Our
                founders, avid cricket enthusiasts and technology experts,
                recognized the potential to combine fantasy sports with
                blockchain technology. What began as a small project has grown
                into a platform that serves thousands of cricket fans worldwide,
                offering a unique blend of entertainment, strategy, and
                investment opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 max-w-[95rem] mx-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg px-3 py-1 text-sm text-gray-300">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Revolutionizing Fantasy Cricket
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At CricStock11, we're on a mission to transform fantasy cricket
                by creating a transparent, engaging, and rewarding platform that
                combines the thrill of fantasy sports with the innovation of
                blockchain technology.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">
                Trust & Transparency
              </h3>
              <p className="text-gray-400">
                We leverage blockchain technology to ensure complete
                transparency in all transactions and player valuations.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M20 7h-9" />
                  <path d="M14 17H5" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Innovation</h3>
              <p className="text-gray-400">
                We continuously push the boundaries of what's possible in
                fantasy sports through cutting-edge technology and AI-driven
                insights.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M17 6.1H3" />
                  <path d="M21 12.1H3" />
                  <path d="M15.1 18H3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Community</h3>
              <p className="text-gray-400">
                We foster a vibrant community of cricket enthusiasts who share
                insights, strategies, and a passion for the game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Chart Showcase */}
      <section className="w-full py-5 md:py-24 lg:py-32 max-w-[95rem] mx-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Cricket Meets the Stock Market
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Watch how player values fluctuate based on performance, market
                demand, and strategic insights.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="aspect-[16/9] w-full">
              <CricketStockChart />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-5 md:py-24 lg:py-32 bg-gray-950 max-w-[95rem] mx-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg px-3 py-1 text-sm text-gray-300">
              Our Leaders
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Meet the Experts Behind CricStock11
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our diverse team brings together expertise in cricket,
                blockchain technology, data science, and user experience design.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                <Image
                  src="/professional-male-headshot.png"
                  alt="Team member"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Rahul Sharma</h3>
                <p className="text-gray-400">Co-Founder & CEO</p>
                <p className="mt-2 text-sm text-gray-500">
                  Former cricket analyst with 10+ years of experience in sports
                  technology
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]">
                <Image
                  src="/professional-headshot-female.png"
                  alt="Team member"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Priya Patel</h3>
                <p className="text-gray-400">Co-Founder & CTO</p>
                <p className="mt-2 text-sm text-gray-500">
                  Blockchain expert with background in developing decentralized
                  applications
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <Image
                  src="/placeholder.svg?key=qs6le"
                  alt="Team member"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Vikram Singh</h3>
                <p className="text-gray-400">Head of Data Science</p>
                <p className="mt-2 text-sm text-gray-500">
                  AI specialist focused on predictive analytics for sports
                  performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 max-w-[95rem] mx-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                Ready to Join the Revolution?
              </h2>
              <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
                Start your journey with CricStock11 today and experience fantasy
                cricket like never before.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-background hover:bg-accent py-5 font-semibold text-accent hover:text-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                asChild
              >
                <Link href="/live-matches" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
