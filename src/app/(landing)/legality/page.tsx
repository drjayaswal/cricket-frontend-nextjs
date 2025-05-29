import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Bell, CreditCard, Scale, UserCheck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security & Legality | Cricstock11',
  description: 'Learn about our security measures and legal compliance',
};

const SecurityFeature = ({
  title,
  description,
  icon: Icon,
  gradient
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}) => (
  <div className={`p-6 rounded-xl border border-gray-800 bg-gradient-to-br ${gradient} backdrop-blur-sm`}>
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-lg bg-white/10">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  </div>
);

export default function LegalityPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-down-lg">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Security & Legality
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Your security is our top priority. We use industry-leading measures to protect your data and funds.
          </p>
        </div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <SecurityFeature
            icon={Shield}
            title="Two-Factor Authentication"
            description="Your account is protected with 2FA, requiring verification via SMS or email for new device logins and sensitive operations."
            gradient="from-purple-500/20 to-pink-500/20"
          />
          <SecurityFeature
            icon={Lock}
            title="Data Encryption"
            description="We use industry-standard AES-256 encryption to protect all your data and transactions."
            gradient="from-blue-500/20 to-cyan-500/20"
          />
          <SecurityFeature
            icon={Bell}
            title="Real-time Monitoring"
            description="Our systems continuously monitor for suspicious activities and provide instant alerts for any unusual account behavior."
            gradient="from-green-500/20 to-emerald-500/20"
          />
          <SecurityFeature
            icon={CreditCard}
            title="Secure Payments"
            description="All financial transactions are processed through secure, PCI-compliant payment gateways with multiple layers of protection."
            gradient="from-yellow-500/20 to-orange-500/20"
          />
        </div>

        {/* Legal Information */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-8">Legal Compliance</h2>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Scale className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Platform Legality</h3>
                <p className="text-gray-300">
                  CricStock11 operates as a game of skill platform, where success depends on users' knowledge,
                  analytical capabilities, and strategic decision-making. Our platform complies with all
                  applicable laws and regulations governing online skill-based gaming.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <UserCheck className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">User Eligibility</h3>
                <p className="text-gray-300">
                  Users must be at least 18 years old and comply with their local jurisdiction's laws
                  regarding online gaming. We maintain strict verification processes to ensure compliance
                  with age restrictions and regional regulations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Heart className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Responsible Gaming</h3>
                <p className="text-gray-300">
                  We promote responsible gaming practices and provide tools for users to manage their
                  gaming activities. Users can set deposit limits, self-exclusion periods, and access
                  support resources for responsible gaming.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            This platform involves an element of financial risk and may be addictive. Please play responsibly.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} CricStock11. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
