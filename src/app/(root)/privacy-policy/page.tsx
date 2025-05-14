import Link from "next/link"
import { Shield, Lock, Eye, FileText, Bell, Clock, Database, Globe } from "lucide-react"

export default function PrivacyPolicy() {
  return (
  <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <Lock className="h-8 w-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
          </div>

          <div className="text-gray-400 mb-8">
            <p>Last updated: May 13, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-8">
              At Company Name, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website or use our services. Please read this
              privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access
              the site.
            </p>

            <section className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
              </div>
              <div className="pl-9">
                <p className="mb-4 text-gray-300">
                  We may collect personal information that you voluntarily provide to us when you register on the
                  website, express an interest in obtaining information about us or our products and services,
                  participate in activities on the website, or otherwise contact us.
                </p>
                <p className="mb-4 text-gray-300">
                  The personal information that we collect depends on the context of your interactions with us and the
                  website, the choices you make, and the products and features you use. The personal information we
                  collect may include:
                </p>
                <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                  <li>Name and contact data (such as email address, phone number)</li>
                  <li>Credentials (such as passwords and security questions)</li>
                  <li>Payment data (such as credit card information)</li>
                  <li>Location data</li>
                  <li>Device and usage information</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">How We Use Your Information</h2>
              </div>
              <div className="pl-9">
                <p className="mb-4 text-gray-300">We use the information we collect in various ways, including to:</p>
                <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                  <li>Provide, operate, and maintain our website and services</li>
                  <li>Improve, personalize, and expand our website and services</li>
                  <li>Understand and analyze how you use our website and services</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you, including for customer service and updates</li>
                  <li>Process your transactions</li>
                  <li>Send you marketing and promotional communications</li>
                  <li>Find and prevent fraud</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">Information Storage and Security</h2>
              </div>
              <div className="pl-9">
                <p className="mb-4 text-gray-300">
                  We use administrative, technical, and physical security measures to help protect your personal
                  information. While we have taken reasonable steps to secure the personal information you provide to
                  us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no
                  method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">Third-Party Websites</h2>
              </div>
              <div className="pl-9">
                <p className="mb-4 text-gray-300">
                  Our website may contain links to third-party websites and applications of interest, including
                  advertisements and external services, that are not affiliated with us. Once you have used these links
                  to leave our site, any information you provide to these third parties is not covered by this Privacy
                  Policy, and we cannot guarantee the safety and privacy of your information.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">GDPR Privacy</h2>
              </div>
              <div className="pl-9">
                <p className="mb-4 text-gray-300">
                  If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We
                  aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal
                  Information.
                </p>
                <p className="mb-4 text-gray-300">
                  If you wish to be informed what Personal Information we hold about you and if you want it to be
                  removed from our systems, please contact us.
                </p>
                <p className="mb-4 text-gray-300">
                  In certain circumstances, you have the following data protection rights:
                </p>
                <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-2">
                  <li>The right to access, update or to delete your personal information</li>
                  <li>The right of rectification</li>
                  <li>The right to object</li>
                  <li>The right of restriction</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">Changes to This Privacy Policy</h2>
              </div>
              <div className="pl-9">
                <p className="mb-4 text-gray-300">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy
                  Policy. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6 text-purple-500" />
                <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
              </div>
              <div className="pl-9">
                <p className="mb-4 text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-none pl-0 mb-4 text-gray-300 space-y-2">
                  <li>By email: privacy@companyname.com</li>
                  <li>By phone: (555) 123-4567</li>
                  <li>By mail: 123 Privacy Street, City, State 12345</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
  )}