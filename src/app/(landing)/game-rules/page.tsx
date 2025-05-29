import React from 'react';
import { Shield, Zap, Trophy, Smartphone, Globe } from 'lucide-react';

const GameRules = () => {
  return (
    <div className="min-h-screen bg-[#0B1121] text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slide-down-lg">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Game Rules
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto">
            Learn how to play and master the art of cricket stock trading
          </p>
        </div>

        <div className="space-y-12">
          {/* Overview Section */}
          <section className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10 animate-scale-in-lg">
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">Overview</h2>
            <p className="text-slate-300">
              Cricket Fantasy is a game of skill where you can purchase and sell virtual stocks attached to real-world cricket players. 
              By participating in the game, you confirm to have agreed to our Terms and Conditions and Privacy Policy.
            </p>
          </section>

          {/* Getting Started Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-medium mb-4 text-purple-300">Sign Up</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Mobile number with OTP validation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Optional referral code
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Quick and easy process
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-medium mb-4 text-purple-300">Deposit</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Minimum: ₹100
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Maximum: ₹20,00,000/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Multiple payment methods
                </li>
              </ul>
            </div>
          </section>

          {/* Account Types Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Account Types</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-purple-300">Deposits</h3>
                <p className="text-slate-300">
                  Credits from deposits (after GST deduction). Can be used for purchases but not for withdrawal.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-purple-300">Winnings</h3>
                <p className="text-slate-300">
                  Proceeds from stock sales. Can be used for further purchases or withdrawn to your bank account.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-purple-300">Discount Bonus</h3>
                <p className="text-slate-300">
                  Equivalent to GST deduction at deposit. Can be earned through promo codes, referrals, and contests.
                </p>
              </div>
            </div>
          </section>

          {/* Trading Rules Section */}
          <section className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Trading Rules</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4 text-purple-300">Portfolio Creation</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Minimum 3 players in first portfolio
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Multiplier option available after first portfolio
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Minimum 3 unique stocks required
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-purple-300">Stock Types</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Up Stocks: For players expected to perform well
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Down Stocks: For players expected to perform poorly
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Multiplier: Increases potential score
                  </li>
                </ul>

                {/* Up/Down Stock Example Table */}
                <div className="overflow-x-auto mt-8">
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">Example: Up & Down Stock</h4>
                  <table className="min-w-full text-center border border-white/10 rounded-lg overflow-hidden">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-2">Participant</th>
                        <th className="px-4 py-2">Stock Type</th>
                        <th className="px-4 py-2">Buy Price</th>
                        <th className="px-4 py-2">Sell Price</th>
                        <th className="px-4 py-2">Profit/Loss</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white/2 text-slate-200">
                      <tr className="border-t border-white/10">
                        <td className="px-4 py-2">A</td>
                        <td className="px-4 py-2">Up</td>
                        <td className="px-4 py-2">₹10</td>
                        <td className="px-4 py-2">₹12</td>
                        <td className="px-4 py-2">+₹2 or +20%</td>
                      </tr>
                      <tr className="border-t border-white/10">
                        <td className="px-4 py-2">B</td>
                        <td className="px-4 py-2">Down</td>
                        <td className="px-4 py-2">₹10</td>
                        <td className="px-4 py-2">₹12</td>
                        <td className="px-4 py-2">-₹2 or -20%</td>
                      </tr>
                      <tr className="border-t border-white/10">
                        <td className="px-4 py-2">C</td>
                        <td className="px-4 py-2">Up</td>
                        <td className="px-4 py-2">₹10</td>
                        <td className="px-4 py-2">₹8</td>
                        <td className="px-4 py-2">-₹2 or -20%</td>
                      </tr>
                      <tr className="border-t border-white/10">
                        <td className="px-4 py-2">D</td>
                        <td className="px-4 py-2">Down</td>
                        <td className="px-4 py-2">₹10</td>
                        <td className="px-4 py-2">₹8</td>
                        <td className="px-4 py-2">+₹2 or +20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Multiplier Example Table */}
                <div className="overflow-x-auto mt-8">
                  <h4 className="text-lg font-semibold text-purple-200 mb-2">Example: Multiplier</h4>
                  <table className="min-w-full text-center border border-white/10 rounded-lg overflow-hidden">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-2">Participant</th>
                        <th className="px-4 py-2">Stock Type</th>
                        <th className="px-4 py-2">Multiplier</th>
                        <th className="px-4 py-2">Buy Price</th>
                        <th className="px-4 py-2">Sell Price</th>
                        <th className="px-4 py-2">Profit/Loss</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white/2 text-slate-200">
                      <tr className="border-t border-white/10">
                        <td className="px-4 py-2">A</td>
                        <td className="px-4 py-2">Down</td>
                        <td className="px-4 py-2">1x</td>
                        <td className="px-4 py-2">₹10</td>
                        <td className="px-4 py-2">₹8</td>
                        <td className="px-4 py-2">+₹2 or +20%</td>
                      </tr>
                      <tr className="border-t border-white/10">
                        <td className="px-4 py-2">B</td>
                        <td className="px-4 py-2">Down</td>
                        <td className="px-4 py-2">2x</td>
                        <td className="px-4 py-2">₹10</td>
                        <td className="px-4 py-2">₹8</td>
                        <td className="px-4 py-2">+₹4 or +40%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Trading Limits Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-medium mb-4 text-purple-300">Transaction Limits</h3>
              <p className="text-slate-300">
                Maximum number of stocks per trade varies based on market conditions and your account type.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-xl font-medium mb-4 text-purple-300">Holding Limits</h3>
              <p className="text-slate-300">
                Maximum number of stocks in portfolio is determined by account type and market conditions.
              </p>
            </div>
          </section>

          {/* Withdrawal Section */}
          <section className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Withdrawal</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4 text-purple-300">Limits</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Minimum: ₹25
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Maximum: ₹1,00,000 per day
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Maximum 10 withdrawals per day
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4 text-purple-300">Requirements</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    KYC verification required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    TDS applicable as per regulations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Bank account verification
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Important Notice Section */}
          <section className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-semibold text-purple-300">Important Notice</h2>
            </div>
            <p className="text-slate-300">
              This game involves an element of financial risk and may be addictive. Please play responsibly at your own risk.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GameRules;
