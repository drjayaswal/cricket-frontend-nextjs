"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Download, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { generateTermsPDF, generateTermsWord } from "@/lib/pdf-helper"
export default function TermsAndConditions() {
  const [expandedSection, setExpandedSection] = useState<string | null>("introduction")

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
      // Scroll to section
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: `Welcome to Cricstock11, an innovative, cricket-based fantasy gaming platform that introduces a unique stock-market-style experience for cricket enthusiasts. Cricstock11 allows users to virtually buy and sell shares of cricket batsmen and teams during live matches. The share values are influenced by real-time match performances — when a batsman scores, their stock value increases, and so does the stock value of the team they represent. Conversely, missed deliveries, dot balls, and dismissals lead to a decrease in stock values. A batsman getting out causes their stock to drop to 50% of the last buying price, affecting the team's valuation accordingly.

Cricstock11 is developed to offer a skill-based gaming experience where success depends on users' cricket knowledge, analytical skills, and strategic decision-making. The platform does not support or promote any form of real-money gambling.

By accessing or registering on Cricstock11, you agree to be legally bound by these Terms & Conditions ("Terms"), our Privacy Policy, and other applicable rules and policies. Please read them carefully before participating.`,
    },
    {
      id: "eligibility",
      title: "Eligibility",
      content: `To use Cricstock11, users must meet the following eligibility criteria:
• Must be an Indian citizen or resident.
• Must be 18 years of age or older.
• Must be legally competent to enter into a binding contract under the Indian Contract Act, 1872.
• Must not be a resident of any state where participation in fantasy gaming is prohibited.

Excluded States: Due to local laws, residents of the following Indian states are prohibited from participating in any paid contests or features of Cricstock11:
• Assam
• Odisha
• Telangana
• Andhra Pradesh
• Nagaland
• Sikkim

We reserve the right to modify this list based on changes in applicable law.`,
    },
    {
      id: "user-representations",
      title: "User Representations",
      content: `By creating an account and participating in games on Cricstock11, you represent and warrant that:
• You are a citizen or resident of India, aged 18 years or above.
• You are not accessing the platform from a restricted state.
• You are using the platform solely for personal entertainment and skill-based gaming.
• You will not use multiple accounts or engage in any form of fraud or unfair gameplay.
• You will provide accurate and truthful information during account registration and gameplay.

We reserve the right to verify your eligibility at any time and to suspend or terminate your account if found in violation.`,
    },
    {
      id: "account-creation",
      title: "User Account Creation and Operation",
      content: `To use Cricstock11, users must create an account through mobile verification or third-party login services. During registration, you may be required to provide personal details such as your name, date of birth, mobile number, and email address.

You are solely responsible for maintaining the confidentiality of your account credentials and all activities occurring under your account. Sharing account access or using automated tools or scripts is strictly prohibited.`,
    },
    {
      id: "account-validation",
      title: "User Account Validation and Personal Information Verification",
      content: `To ensure security, transparency, and legal compliance, Cricstock11 may request verification of your identity through documents such as:
• PAN card
• Aadhaar card or other government-issued ID
• Bank account details

This verification process must be completed to enable withdrawals or participate in specific contests. Failing to complete KYC verification may result in restricted account access or forfeiture of winnings.`,
    },
    {
      id: "user-restrictions",
      title: "User Restrictions",
      content: `Users are prohibited from:
• Creating multiple or fake accounts.
• Using bots, scripts, or third-party tools to gain an unfair advantage.
• Manipulating or misusing any platform features.
• Posting, sharing, or promoting offensive, abusive, or illegal content.
• Engaging in any fraudulent or unethical conduct.

Violations may result in temporary suspension or permanent banning of the user account.`,
    },
    {
      id: "game-participation",
      title: "Participation in the Cricstock11 Game",
      content: `Cricstock11 offers a simulated trading experience where users can purchase and sell virtual shares of batsmen and teams during live cricket matches. Share prices are determined by in-game algorithms based on real-time performance metrics such as:

Positive Events: Runs scored, high strike rate, boundaries, etc., increase stock values.
Negative Events: Dot balls, missed shots, and low strike rates decrease stock values.
Dismissals: When a player gets out, their share value drops to 50% of the last buy price.

All decisions made on the platform are based on user skill, and no outcome is pre-determined.`,
    },
    {
      id: "deposit-withdrawal",
      title: "Deposit and Withdrawal Terms",
      content: `Users may deposit funds via supported payment methods for accessing premium features or contests. All deposits are final and non-refundable unless a transaction error occurs.

Withdrawals are processed only after successful KYC verification and may be subject to:
• Minimum and maximum withdrawal limits.
• Processing times.
• Verification checks.

We are not responsible for delays caused by third-party payment gateways or banks.`,
    },
    {
      id: "service-disruptions",
      title: "Service Disruptions",
      content: `Cricstock11 strives to provide seamless service but cannot guarantee uninterrupted access at all times. The platform may be temporarily unavailable due to:
• Server maintenance or upgrades.
• Internet service issues.
• Technical failures beyond our control.

We reserve the right to cancel or reschedule contests in case of service disruptions.`,
    },
    {
      id: "content",
      title: "Content",
      content: `All content available on Cricstock11 — including graphics, algorithms, game data, text, and design — is our intellectual property or is licensed to us. Unauthorized reproduction, use, or distribution is strictly prohibited.

Users are responsible for any content they post and must not share misleading, abusive, or offensive material.`,
    },
    {
      id: "license",
      title: "License Agreement and Intellectual Property",
      content: `We grant you a personal, limited, non-transferable, non-exclusive, revocable license to access and use Cricstock11 strictly in accordance with these Terms. You may not:
• Reverse engineer, decompile, or tamper with the platform.
• Use any content without our written permission.
• Create derivative works or copies of platform features or design.

All rights not expressly granted remain with Cricstock11.`,
    },
    {
      id: "breach",
      title: "Breach and Consequences",
      content: `Any breach of these Terms may result in:
• Account suspension or termination.
• Forfeiture of in-app points, deposits, or winnings.
• Legal action as deemed necessary.

Repeated violations or fraudulent behavior will lead to permanent bans.`,
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: `Cricstock11, its affiliates, directors, and employees shall not be liable for:
• Any indirect or consequential damages.
• User decisions resulting in loss.
• Service outages or payment gateway issues.

Our liability, if any, is limited to the actual amount paid by the user for participating in a contest.`,
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      content: `Cricstock11 is a skill-based fantasy platform and does not involve real-money gambling or betting. All gameplay outcomes are dependent on real-time sports data and user actions.

We do not guarantee any winnings or profits and are not responsible for user expectations.`,
    },
    {
      id: "indemnity",
      title: "Indemnity",
      content: `You agree to indemnify and hold Cricstock11, its officers, partners, and affiliates harmless from any losses, liabilities, claims, or damages arising out of:
• Your breach of these Terms.
• Misuse of the platform.
• Violation of any applicable law or rights of a third party.`,
    },
    {
      id: "grievance",
      title: "Grievance Redressal Mechanism",
      content: `We are committed to resolving user complaints promptly. For any concerns or disputes, please contact:
Grievance Officer: [To Be Appointed]
Email: support@cricstock11.com
Resolution Time: Within 15 working days`,
    },
    {
      id: "governing-law",
      title: "Governing Law, Dispute Resolution and Jurisdiction",
      content: `These Terms shall be governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in [City, India].

All efforts shall be made to resolve disputes amicably through arbitration or mediation before approaching the courts.`,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-8">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className={`w-full justify-start text-left text-sm whitespace-normal h-auto py-2 px-3 ${expandedSection === section.id ? "bg-gray-800" : ""
                        }`}
                      onClick={() => toggleSection(section.id)}
                    >
                      {section.title}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
                <p className="text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-6">
                  {sections.map((section) => (
                    <div key={section.id} id={section.id} className="scroll-mt-20">
                      <div
                        className="flex justify-between items-center cursor-pointer py-2"
                        onClick={() => toggleSection(section.id)}
                      >
                        <h2 className="text-xl font-semibold">{section.title}</h2>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          {expandedSection === section.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </div>

                      {expandedSection === section.id && (
                        <div className="mt-2 text-gray-300">
                          <p className="leading-relaxed">{section.content}</p>
                        </div>
                      )}

                      <Separator className="my-4 bg-gray-800" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                  <p className="text-center text-gray-300">
                    By using our website, you confirm that you have read, understood, and agree to these Terms and
                    Conditions.
                  </p>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <Button className="flex items-center bg-accent text-white hover:bg-accent/80 cursor-pointer gap-2" onClick={() => generateTermsPDF(sections)}>
                    <span>Download PDF</span>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button className="flex items-center bg-accent text-white hover:bg-accent/80 cursor-pointer gap-2" onClick={() => generateTermsWord(sections)}>
                    <span>Download Word</span>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
