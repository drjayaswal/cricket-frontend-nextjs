import Link from "next/link"
import { Shield, Lock, Eye, FileText, Bell, Clock, Database, Globe, Cookie, UserMinus, Link as LinkIcon } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Lock className="h-8 w-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>

        <div className="text-gray-400 mb-8">
          <p>Effective Date: June 1, 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-8">
            This Privacy Policy outlines how Cricstock11 Private Limited ("We", "Us", or "Our") collects, uses, stores, and discloses information about users ("You", "Your", "User(s)") of Our platform ("Platform"). By accessing or using any part of the Platform, including participating in contests or other services, You agree to the terms of this Privacy Policy.
          </p>
          <p className="text-gray-300 mb-8">
            Note: All capitalized terms not defined herein shall have the meaning ascribed to them in the Terms of Use.
          </p>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">1. Commitment to Privacy</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">
                We respect Your privacy and are committed to protecting Your personal data. This Privacy Policy is meant to help You understand:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>What data We collect</li>
                <li>Why We collect it</li>
                <li>How We use it</li>
                <li>When and with whom We share it</li>
                <li>Your rights over Your personal data</li>
              </ul>
              <p className="mb-4 text-gray-300">
                We do not serve or partner with any third-party advertisers on the Platform. Your data is not shared for marketing or advertising purposes.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">We collect information in the following ways:</p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">A. Information You Provide</h3>
              <p className="mb-4 text-gray-300">When You register or use our Services, We may collect:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Full name</li>
                <li>Username</li>
                <li>Email address</li>
                <li>Date of birth</li>
                <li>State and location</li>
                <li>Government ID (Aadhaar, Driving License, Voter ID)</li>
                <li>PAN (for compliance, if applicable)</li>
                <li>Payment-related information</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">B. Automatically Collected Information</h3>
              <p className="mb-4 text-gray-300">When You use the Platform, We automatically collect:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Device information (model, OS version)</li>
                <li>Network information (IP address, ISP, browsing details)</li>
                <li>Location (if permission is granted)</li>
                <li>Usage data (feature usage, time spent, navigation patterns)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">C. Sensitive Personal Information (SPI)</h3>
              <p className="mb-4 text-gray-300">We may collect SPI only for processing payments and verification:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Cardholder name</li>
                <li>Credit/debit card details (encrypted)</li>
                <li>UPI ID or wallet details</li>
                <li>Banking information (for withdrawals or refunds)</li>
              </ul>
              <p className="mb-4 text-gray-300">
                We do not collect any additional SPI unless required to comply with legal or regulatory obligations.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">3. Purpose of Data Collection and Use</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">Your data is collected and processed for the following purposes:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Account registration and identity verification</li>
                <li>Enabling participation in contests and usage of Platform services</li>
                <li>Payment processing and withdrawal management</li>
                <li>User support and service improvement</li>
                <li>Security monitoring and fraud prevention</li>
                <li>Compliance with legal and regulatory obligations</li>
              </ul>
              <p className="mb-4 text-gray-300">
                We may use anonymized and aggregated data for analytics and service enhancement. This data does not identify any individual and is not shared externally.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">4. Data Sharing and Disclosure</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">
                We do not sell or share Your personal information with third-party advertisers or for advertising purposes.
                However, We may share Your data with the following, under strict data protection agreements:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Affiliates or group entities: Only to enhance Your service experience or enable related services</li>
                <li>Payment processors: For facilitating secure transactions</li>
                <li>Verification service providers: To validate Your ID or PAN as required</li>
                <li>Government or regulatory authorities: If required under applicable laws or upon valid legal request</li>
                <li>Third-party service providers: For infrastructure, storage, or customer support purposes, bound by confidentiality obligations</li>
              </ul>
              <p className="mb-4 text-gray-300">
                In the event of a business transfer, merger, or acquisition, Your information may be shared as part of such a transaction, subject to the same level of protection.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Cookie className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">5. Use of Cookies</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Improve Platform performance</li>
                <li>Recognize returning users</li>
                <li>Understand user preferences and navigation</li>
                <li>Maintain session continuity</li>
              </ul>
              <p className="mb-4 text-gray-300">
                Cookies do not collect personal information unless You voluntarily provide it during the session. You may disable cookies through Your browser settings, though this may limit some Platform features.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">6. Data Storage and Security</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">We take reasonable steps to safeguard Your data, including:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Secure server infrastructure with firewalls</li>
                <li>Restricted access based on need-to-know</li>
                <li>Regular audits and vulnerability assessments</li>
              </ul>
              <p className="mb-4 text-gray-300">
                Despite Our best efforts, no system is completely secure. Hence, We cannot guarantee absolute security of information during transmission over the internet.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">7. Retention of Data</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">We retain Your personal data:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>As long as Your account remains active</li>
                <li>As needed to fulfill legal or regulatory requirements</li>
                <li>Until the purpose for which it was collected is no longer applicable</li>
              </ul>
              <p className="mb-4 text-gray-300">
                Upon Your request or account closure, We will delete or anonymize personal data, unless retention is required by law.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">8. User Rights</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">You may exercise the following rights:</p>
              <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                <li>Access: Request a copy of Your data</li>
                <li>Rectification: Correct inaccurate or outdated information</li>
                <li>Erasure: Request deletion of Your personal data</li>
                <li>Restriction: Temporarily suspend processing of Your data</li>
                <li>Objection: Withdraw consent or object to certain data uses</li>
              </ul>
              <p className="mb-4 text-gray-300">
                To exercise these rights, contact us at info@cricstock11.com
              </p>
              <p className="mb-4 text-gray-300">
                Note: Certain rights may be restricted if fulfilling them prevents Us from complying with legal obligations or delivering Our services.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <UserMinus className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">9. Children's Privacy</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">
                Our Platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If You believe that a child has provided personal information without parental consent, please contact Us for immediate removal.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <LinkIcon className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">10. External Links</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">
                The Platform may contain links to external websites. We are not responsible for the content, privacy practices, or data handling of those websites. Please review their privacy policies separately.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">11. Changes to the Privacy Policy</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">
                We may update this Privacy Policy from time to time to reflect changes in legal, technical, or operational requirements, without any prior notice. Your continued use of the Platform after such changes signifies Your acceptance of the revised Privacy Policy.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">12. Contact Us</h2>
            </div>
            <div className="pl-9">
              <p className="mb-4 text-gray-300">For any privacy-related questions, concerns, or complaints, please contact:</p>
              <div className="text-gray-300">
                <p>Attn: Cricstock11 Team</p>
                <p>Cricstock11 Private Limited</p>
                <p>Fl no 704, 7th floor, Silver crown,</p>
                <p>Gandhi Path, Jhotwara, Jaipur.</p>
                <p>Email: info@cricstock11.com</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}