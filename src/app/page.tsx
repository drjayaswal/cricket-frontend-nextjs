import Navlinks from "@/components/landing-page/navlinks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, ChevronsRight, BarChart2, Users, Trophy, Gift, Shield, Zap, Star, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer/footer";
import BannerSlider from "@/components/landing-page/slider";
import { AnimatedTestimonials } from "@/components/landing-page/testimonials";


const testimonials = [
  {
    quote:
      "No luck in this game, really requires thinking and analysis. Can't get over how exciting it is to use my cricket knowledge to trade stocks of my favorite cricketers.",
    name: "Aakash J",
    designation: "Meant For Real Analysts",
    src: "/userdp.jpg",
  },
  {
    quote:
      "Really changing how to think about player performance and fantasy. Scoring takes into account so many factors, makes it really interesting to predict.",
    name: "Preeti K",
    designation: "Incredible UI",
    src: "/userdpf.jpg",
  },
  {
    quote:
      "I have been on CricStock11 for the past three years, and my portfolio has increased by over 800%. I love the concept of the app with an incredible UI and excellent customer support.",
    name: "Aarsh T",
    designation: "Love The Concept",
    src: "/userdp.jpg",
  },
  {
    quote:
      "CricStock11 has completely transformed my fantasy cricket experience. The trading aspect adds a whole new level of excitement and strategy. Highly recommend it!",
    name: "Rahul S",
    designation: "Game Changer",
    src: "/userdp.jpg",
  },
  {
    quote:
      "The app is user-friendly and the customer support is top-notch. I love how I can trade players just like stocks. It's addictive!",
    name: "Sneha M",
    designation: "User-Friendly & Addictive",
    src: "/userdpf.jpg",
  }

];

export default function LandingPage() {

  return (
    <>
      <header className="sticky top-0 z-50 border-white/10 pt-2">
        <div className=" flex justify-between items-center py-1 px-6 max-w-[90rem] mx-auto bg-white/5 backdrop-blur-md rounded-2xl">
          <div>
            <Image src="/logo.png" alt="Logo" width={180} height={100} className="rounded-md object-cover" />
          </div>

          <Navlinks />

          <div>
            <Button className="group bg-purple-700 text-base border-b border-transparent hover:rounded-none hover:border-purple-500 flex justify-center items-center rounded-sm " asChild>
              <Link href={"/login"} className="flex justify-center items-center ">
                <span className=""> Trade Now </span>
                <Image src="/trade.svg" alt="trade now" width={50} height={50} className="invert size-0 group-hover:size-6 transition-all duration-400" />
                {/* <ChevronRight className="size-0 group-hover:size-5 transition-all duration-400" /> */}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[90rem] mt-10 mx-auto px-4 sm:px-6 lg:px-8">

        <BannerSlider />

        {/* Slim Get the App Section */}
        <section className="px-30 mt-10">
          <div className="relative overflow-hidden">
            <div className="relative flex items-center justify-between gap-8 bg-white/6 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-purple-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Image src="/graph.svg" alt="trade now" width={50} height={50} className="size-6 invert" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Trade Anywhere, Anytime</h3>
                  <p className="text-sm text-slate-300">Download our app for the best trading experience</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <a href="#" className="transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/playstore.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={32}
                    className=""
                  />
                </a>
                <div className="h-8 w-px bg-white/30"></div>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-white/5" asChild>
                  <Link href="/login">
                    <span>Continue on Web</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with modern cards */}
        <section className="mt-40" id="features">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose CricStock11?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Experience the future of fantasy cricket trading with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "/trophy.svg",
                title: "India's 1st Cricket Market",
                desc: "Revolutionary trading platform",
                gradient: "from-yellow-500/20 to-orange-500/20",
              },
              {
                icon: "/globe.svg",
                title: "100% Secure & Legal",
                desc: "Bank-grade security",
                gradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                icon: "/user.svg",
                title: "24/7 Customer Support",
                desc: "Always here to help",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                icon: "/gift.svg",
                title: "Get Rewarded for Referrals",
                desc: "Earn with friends",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image src={feature.icon || "/placeholder.svg"} alt={feature.title} width={32} height={32} className="invert" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section with enhanced design */}
        <section className="mt-40" id="how-it-works">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              Four simple steps to start your cricket trading journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Analyze Fantasy Stocks",
                desc: "Check out all player stocks in the marketplace. Use your knowledge and predictions to predict how players are going to perform.",
                icon: <BarChart2 className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
                step: "01",
              },
              {
                title: "Build Your Portfolio",
                desc: "Assemble a portfolio of players that you think will do well over a period of time. Choose how many fantasy stocks to buy in each player.",
                icon: <Users className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500",
                step: "02",
              },
              {
                title: "Start Trading",
                desc: "The better a player plays on the pitch, the higher their stock will rise! Be smart about your trades.",
                icon: <Trophy className="w-8 h-8" />,
                color: "from-yellow-500 to-orange-500",
                step: "03",
              },
              {
                title: "Invite Friends & Get Rewards",
                desc: "Invite friends and receive referral rewards. Both you and your friend get bonuses!",
                icon: <Gift className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500",
                step: "04",
              },
            ].map((step, i) => (
              <div key={i} className="group relative">
                <div className="relative h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-white/5 transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-3xl font-bold text-slate-600">{step.step}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{step.title}</h4>
                  <p className="text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section with modern cards */}
        <section className="mt-40">
          <div className="text-center mb-2">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
              Trusted by Lakhs of Happy Users
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              See what our community has to say about their trading experience
            </p>
          </div>

          <AnimatedTestimonials testimonials={testimonials} />

        </section>

        {/* Security Section with modern grid */}
        <section className="mt-30">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
              Security & Trust
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              Your security is our top priority. We use industry-leading measures to protect your data and funds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Two-factor Authentication",
                desc: "Your account is tied to your unique phone number when you register, so that every time you login from a new device or update your account, 2FA will require you to enter a One-Time-Password (OTP) sent via SMS.",
                gradient: "from-green-500/20 to-emerald-500/20",
              },
              {
                title: "Data Encryption",
                desc: "Our systems are hosted on Amazon Web Services and benefit from the industry standard AES-256 encryption algorithm to encrypt your data. So, basically, we protect all your data.",
                gradient: "from-blue-500/20 to-cyan-500/20",
              },
              {
                title: "Account Notifications",
                desc: "Real-time push and email notifications alert you of any transactions happening on your account. If it wasn't you, you'd know, fast.",
                gradient: "from-purple-500/20 to-pink-500/20",
              },
              {
                title: "Payment Protection",
                desc: "We've partnered with Cashfree to offer a smooth and protected gateway for your deposits and withdrawals. Rest assured that in this most crucial time your money moves seamlessly and safely.",
                gradient: "from-yellow-500/20 to-orange-500/20",
              },
            ].map((security, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden bg-gradient-to-br ${security.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{security.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{security.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* App Promotion Section with enhanced design */}
        <section className="mt-24 mb-16">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-indigo-900/30 rounded-3xl"></div>
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 rounded-3xl p-8 lg:p-16 shadow-2xl">
              <div className="flex-1 z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-200">Download Now</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6">
                  Get the CricStock11 App
                </h2>

                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Trade on the go with our mobile app. Experience seamless trading with real-time updates and
                  notifications.
                </p>

                <div className="flex gap-4 items-center">
                  <a href="#" className="transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/playstore.png"
                      alt="Get it on Google Play"
                      width={150}
                      height={32}
                      className=""
                    />
                  </a>
                  <div className="h-8 w-px bg-white/30"></div>
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-white/5" asChild>
                    <Link href="/login">
                      <span>Continue on Web</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>

                <p className="text-slate-400">Available for Android • Free Download</p>
              </div>

              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-2xl transform rotate-6"></div>
                  <Image
                    src="/logo.png"
                    alt="CricStock11 Mobile App"
                    width={280}
                    height={450}
                    className="relative rounded-3xl shadow-2xl object-cover border border-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
