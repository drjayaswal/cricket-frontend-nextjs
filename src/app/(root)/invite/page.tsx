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

export default function InviteFriendsComponent() {
  const [referralCode, setReferralCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate a random referral code
  const generateReferralCode = () => {
    setIsGenerating(true);

    // Simulate API call to generate code
    setTimeout(() => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "";
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      setReferralCode(result);
      setIsGenerating(false);
    }, 800);
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
              <CardDescription className="text-gray-400 text-center">
                Share your unique referral code with your friends and enjoy
                mutual benifits
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Your Referral Code</p>
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
                  className="w-full bg-gray-800 border-gray-900 hover:bg-accent text-lg p-5"
                  disabled={isGenerating}
                >
                  Generate
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
