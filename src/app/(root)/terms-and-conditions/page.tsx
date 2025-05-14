"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Download, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {generateTermsPDF} from "@/lib/helper"
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
      content: `Welcome to our website. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. Additionally, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services, which may be posted and modified from time to time. All such guidelines or rules are hereby incorporated by reference into these Terms and Conditions.`,
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: `This website and its original content, features, and functionality are owned by our company and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You agree not to copy, modify, create derivative works of, publicly display, publicly perform, republish, any of our copyrighted material, except to the extent permitted by the website.`,
    },
    {
      id: "user-accounts",
      title: "User Accounts",
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our website. You are responsible for safeguarding the password that you use to access the website and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.`,
    },
    {
      id: "user-content",
      title: "User Content",
      content: `Our website may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the website, including its legality, reliability, and appropriateness. By posting content to the website, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the website.`,
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      content: `You may use our website only for lawful purposes and in accordance with these Terms. You agree not to use our website: (1) In any way that violates any applicable national or international law or regulation. (2) For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way. (3) To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation. (4) To impersonate or attempt to impersonate our company, a company employee, another user, or any other person or entity.`,
    },
    {
      id: "third-party-links",
      title: "Third-Party Links",
      content: `Our website may contain links to third-party websites or services that are not owned or controlled by our company. Our company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that our company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.`,
    },
    {
      id: "termination",
      title: "Termination",
      content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the website will immediately cease. If you wish to terminate your account, you may simply discontinue using the website.`,
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      content: `In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.`,
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content: `These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
    },
    {
      id: "changes",
      title: "Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms.`,
    },
    {
      id: "contact",
      title: "Contact Us",
      content: `If you have any questions about these Terms, please contact us at support@example.com.`,
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
                      className={`w-full justify-start text-left ${
                        expandedSection === section.id ? "bg-gray-800" : ""
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
                    <div key={section.id} id={section.id} className="scroll-mt-8">
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

                <div className="mt-8 flex justify-center">
                  <Button className="flex items-center bg-accent text-white hover:bg-accent/80 cursor-pointer gap-2" onClick={()=>generateTermsPDF(sections)}>
                    <span>Download PDF</span>
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
