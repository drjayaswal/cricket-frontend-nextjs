"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  Shield,
  FileText,
  ChevronRight,
  Phone,
  ShieldCheck,
  HelpCircle,
  UserPlus,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function UserProfile() {
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    router.replace("/login");
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Profile Card */}
        <Card className="border-none rounded-xl shadow-md overflow-hidden">
          <CardContent className="pt-0">
            <div className="flex items-start justify-between gap-4 w-full">
              <div className="flex gap-4">
                <Avatar className="h-16 w-16 border-2 transition-all duration-250 hover:border-accent shadow-md">
                  <AvatarFallback className="text-gray-300 text-xl">
                    US
                  </AvatarFallback>
                  <AvatarImage src="/diverse-group.png" />
                </Avatar>
                <div className="pt-4">
                  <h2 className="text-xl font-medium text-gray-100">
                    User Profile
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Phone className="h-3 w-3" />
                    <span>+919549098255</span>
                    <Badge
                      variant="outline"
                      className="ml-1 text-xs bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] border-[#444444] cursor-pointer"
                    >
                      Verify
                    </Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="mt-5 text-white hover:text-red-500 hover:border-red-500/50 cursor-pointer hover:bg-transparent border-2 border-transparent flex items-center gap-1"
                onClick={() => setLogoutOpen(true)}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Card */}
        <Card className="border-none rounded-xl shadow-md overflow-hidden bg-gray-900 border border-white">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-md font-normal text-gray-400">
                  Wallet Balance
                </p>
                <h3 className="text-5xl font-medium text-white mt-1">₹0</h3>
              </div>
              <Button
                className="bg-[#f5f5f5] text-[#121212] hover:bg-white/70 shadow-md"
                asChild
              >
                <Link href={"/wallet"}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Money
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* My Account Section */}
        <Card className="border-none rounded-xl shadow-md overflow-hidden">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-3xl font-bold text-gray-100">
              My Account
            </CardTitle>
          </CardHeader>
          <hr />
          <CardContent className="p-0 space-y-1 bg-gray-900 rounded-2xl">
            {[
              {
                label: "KYC Verification",
                desc: "Complete your KYC to start playing",
                icon: <ShieldCheck className="h-5 w-5" />,
                href: "/kyc",
              },
              {
                label: "Invite Friends",
                desc: "Earn rewards by inviting friends",
                icon: <UserPlus className="h-5 w-5" />,
                href: "/invite",
              },
            ].map(({ label, desc, icon, href }) => {
              // Define custom hover class only for KYC and Invite
              let hoverTextColor = "";
              if (label === "KYC Verification")
                hoverTextColor = "hover:text-yellow-400";
              else if (label === "Invite Friends")
                hoverTextColor = "hover:text-emerald-500";

              return (
                <Link href={href} key={label}>
                  <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-950 cursor-pointer transition-colors rounded-2xl border-4 border-gray-900">
                    <div className="flex items-center gap-4">
                      <div className="text-gray-400">{icon}</div>
                      <div>
                        <p
                          className={`font-medium text-gray-200 transition-colors ${hoverTextColor}`}
                        >
                          {label}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* Legality Section */}
        <Card className="border-none rounded-xl shadow-md overflow-hidden">
          <CardHeader className="px-6 py-4 ">
            <CardTitle className="text-3xl font-bold text-gray-100">
              Legality & Security
            </CardTitle>
          </CardHeader>
          <hr />
          <CardContent className="p-0 space-y-1 bg-gray-900 rounded-2xl">
            {[
              {
                label: "Terms and Conditions",
                desc: "Read our terms of service",
                icon: <FileText className="h-5 w-5" />,
                href: "/terms-and-conditions",
                border: "border-blue-700",
                hoverBg: "hover:bg-blue-950",
                hoverText: "hover:text-blue-400",
              },
              {
                label: "Privacy Policy",
                desc: "Know how your data is used",
                icon: <Shield className="h-5 w-5" />,
                href: "/privacy-policy",
                border: "border-purple-700",
                hoverBg: "hover:bg-purple-950",
                hoverText: "hover:text-purple-400",
              },
              {
                label: "Contact Us",
                desc: "Reach out for support",
                icon: <HelpCircle className="h-5 w-5" />,
                href: "/contact",
                border: "border-rose-700",
                hoverBg: "hover:bg-rose-950",
                hoverText: "hover:text-cyan-600",
              },
            ].map(({ label, desc, icon, href, border, hoverBg, hoverText }) => (
              <Link href={href} key={label}>
                <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-950 cursor-pointer transition-colors rounded-2xl border-4 border-gray-900">
                  <div className="flex items-center gap-4">
                    <div className="text-gray-400">{icon}</div>
                    <div>
                      <p
                        className={`font-medium text-gray-200 transition-colors ${hoverText}`}
                      >
                        {label}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </main>
      {/* Logout Modal */}
      <Dialog open={isLogoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="bg-gray-950 border-2 border-white/50 rounded-xl ">
          <DialogHeader>
            <DialogTitle className="text-white">
              Are you sure you want to logout?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              onClick={() => setLogoutOpen(false)}
              className="bg-gray-800 text-white hover:bg-gray-600 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              className="text-white border-1 border-transparent hover:text-red-500 hover:border-red-500 cursor-pointer"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>{" "}
    </div>
  );
}
