"use client";

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { Copy, Check, Share2, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { encrypt, generateAlphaCode } from "../../../lib/helper";
import "dotenv/config";
export default function InviteFriendsComponent() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  // Generate a random referral code
  const generateReferralCode = async () => {
    if (cooldownActive) return;
    let newCode;
    setIsGenerating(true);
    setCooldownActive(true);
    setCooldownTime(10);

    // Start the cooldown timer
    const cooldownInterval = setInterval(() => {
      setCooldownTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(cooldownInterval);
          setCooldownActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimeout(() => {
      newCode = `CRST-${encrypt(
        "+916377257649".replace("+", "")
      )}-${generateAlphaCode()}`;
      setReferralCode(newCode);
      setIsGenerating(false);
    }, 3000);

    // const token = localStorage.getItem("token");

    //   if (!token) {
    //     console.log("No token found, user not logged in");
    //     return;
    //   }

    //   const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/add-referral-code`, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       referralCode: newCode,
    //     }),
    //   });
    //   const status = data.status;
    //   if (status !== 200) {
    //     console.error("LOL");
    //   }
  };

  // Generate code on initial load
  useEffect(() => {
    if (!referralCode) {
      generateReferralCode();
    }
  }, [referralCode]);

  // Copy referral code to clipboard
  const copyToClipboard = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast.success("Referral Code Copied !");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  // Share referral link
  const generateReferralLink = () => {
    const referralLink = `http://localhost:3000/referrals?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral Link Copied !");
  };

  return (
    <div className="min-h-screen text-gray-100">
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-bold mb-6 text-center">
              Invite Friends
            </h1>
            <span>Refer Friends, Earn Rewards</span>
          </div>

          <Card className="">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400"></CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-md text-center text-gray-400">
                  Your Referral Code
                </p>
                <div className="flex items-center">
                  <div className="bg-gray-800 rounded-l-md p-2 flex-1 font-mono text-xl text-center text-purple-300 border-2 border-gray-900">
                    {isGenerating ? (
                      <div className="flex justify-center items-center h-6">
                        <div className="animate-pulse">Generating...</div>
                      </div>
                    ) : (
                      referralCode
                    )}
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="rounded-l-none h-12 border-2 border-gray-900 bg-gray-900 hover:bg-accent"
                    disabled={isGenerating}
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Button
                  onClick={generateReferralCode}
                  variant="outline"
                  className={`w-full border-gray-950 hover:bg-accent text-lg p-5 ${
                    cooldownActive
                      ? "bg-gray-950 cursor-progress"
                      : "bg-gray-800 cursor-pointer"
                  }`}
                  disabled={isGenerating || cooldownActive}
                >
                  {cooldownActive
                    ? `Cool Down in (${cooldownTime}s)`
                    : isGenerating
                    ? "Generating..."
                    : "Generate"}
                </Button>
              </div>

              <div className="pt-4">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex w-full bg-gray-900 border-gray-900 hover:bg-accent text-lg p-5"
                    onClick={generateReferralLink}
                  >
                    <Share2 className="h-5 w-5" />
                    Share Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
