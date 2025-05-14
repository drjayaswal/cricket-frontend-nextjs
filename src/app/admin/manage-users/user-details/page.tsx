'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ChevronDown, X, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// TypeScript interfaces
interface Transaction {
  OID: string;
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  time: string;
}

interface PlayerTransaction {
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: string;
  autoSold?: boolean;
  reason?: string;
}

interface PlayerPortfolioItem {
  playerName: string;
  team: string;
  initialPrice: number;
  currentHoldings: number;
  transactions: PlayerTransaction[];
}

interface TeamTransaction {
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: string;
  autoSold?: boolean;
  reason?: string;
}

interface TeamPortfolioItem {
  teamName: string;
  initialPrice: number;
  currentHoldings: number;
  transactions: TeamTransaction[];
}

interface UserDetails {
  _id: string;
  name: string;
  email: string | null;
  mobile: string | null;
  amount: number;
  isAdmin: boolean;
  lastSeen: string;
  transactions: Transaction[];
  portfolio: PlayerPortfolioItem[];
  teamPortfolio: TeamPortfolioItem[];
}

interface AccordionSections {
  transactions: boolean;
  playerPortfolio: boolean;
  teamPortfolio: boolean;
}

type Role = 'marketing' | 'financial' | 'super_admin'

export default function UserDetails() {
  const userId = useSearchParams().get('id');

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState<AccordionSections>({
    transactions: false,
    playerPortfolio: false,
    teamPortfolio: false
  });

  const [showPromotePopup, setShowPromotePopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('marketing');

  const toggleSection = (section: keyof AccordionSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePromote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login again");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/admin/promote-user-to-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userDetails?._id,
          role: selectedRole,
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("User promoted to admin successfully");
        setShowPromotePopup(false);
        setSelectedRole('marketing');
      } else {
        toast.error(data.message || "Failed to promote user to admin");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
      toast.error("An error occurred while promoting user");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/admin/user-details?id=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        setUserDetails(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <div className="w-full h-full text-xl flex gap-3 justify-center items-center"> Loading <LoaderCircle className="animate-spin" /> </div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!userDetails) return <div className="p-4">No user details found</div>;

  // Rest of the JSX remains the same, just add type annotations where needed
  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto">
      {/* Promote to Admin Popup */}
      {showPromotePopup && (
        <div className="fixed inset-0 w-screen h-screen justify-center flex items-center bg-black/30 backdrop-blur-xs z-50 p-4">
          <div
            onClick={() => setShowPromotePopup(false)}
            className="fixed inset-0 w-screen h-screen z-40"
          />
          <div className="z-50 bg-[#181a20] border-2 rounded-2xl border-[#4c6590]/20 p-4 sm:p-5 flex flex-col gap-5 w-[95vw] max-w-md">
            <div className="mb-5 flex justify-between items-center">
              <h1 className="font-bold">Promote to Admin</h1>
              <X
                onClick={() => setShowPromotePopup(false)}
                className="size-7 rounded-lg p-1 hover:bg-blue-900 cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Select Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
                className="p-2 rounded-lg border bg-gray-400/10 border-gray-300/20 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="marketing">Marketing Admin</option>
                <option value="financial">Financial Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <div className="flex gap-3 mt-5">
              <Button
                onClick={handlePromote}
                className="bg-purple-800 hover:bg-purple-900 text-white w-fit h-fit py-2 px-4 rounded-lg cursor-pointer"
              >
                Confirm Promotion
              </Button>
              <Button
                onClick={() => setShowPromotePopup(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white w-fit h-fit py-2 px-4 rounded-lg cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-white">User Details</h1>

      {/* Basic Information */}
      <div className="bg-white/5 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Basic Information</h2>
          <Button
            onClick={() => setShowPromotePopup(true)}
            className="flex justify-center items-center sm:ml-auto bg-purple-800 hover:bg-purple-900"
          >
            <ShieldCheck className="mr-2" />
            promote to admin
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium text-gray-300">{userDetails.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium text-gray-300">{userDetails.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">Mobile</p>
            <p className="font-medium text-gray-300">{userDetails.mobile || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-medium text-gray-300">₹{userDetails.amount}</p>
          </div>
          <div>
            <p className="text-gray-500">Admin Status</p>
            <p className="font-medium text-gray-300">{userDetails.isAdmin ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p className="text-gray-500">Last Seen</p>
            <p className="font-medium text-gray-300">{new Date(userDetails.lastSeen).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Transactions Accordion */}
      <div className="bg-white/5 rounded-lg shadow-md pt-0 mb-4 sm:mb-6">
        <button
          onClick={() => toggleSection('transactions')}
          className="w-full text-left flex justify-between items-center p-6 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Transactions</h2>
          <span className="transform transition-transform duration-200" style={{
            transform: openSections.transactions ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            <ChevronDown className="w-5 h-5" />
          </span>
        </button>
        <div className={`space-y-4 overflow-hidden transition-all duration-300 ${openSections.transactions ? 'max-h-[2000px] mt-4 p-4 sm:p-6' : 'max-h-0'
          }`}>
          {userDetails.transactions.length === 0 ? (
            <div className="text-gray-400 text-center py-4">No transactions found</div>
          ) : (
            userDetails.transactions.map((transaction, index) => (
              <div key={index} className="border rounded-lg p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-medium">{transaction.OID}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium">₹{transaction.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className={`font-medium ${transaction.status === 'SUCCESS' ? 'text-green-600' :
                      transaction.status === 'FAILED' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                      {transaction.status}
                    </p>
                  </div>
                  <div className="col-span-1 sm:col-span-3">
                    <p className="text-gray-500">Time</p>
                    <p className="font-medium">{new Date(transaction.time).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Player Portfolio Accordion */}
      <div className="bg-white/5 rounded-lg shadow-md mb-4 sm:mb-6">
        <button
          onClick={() => toggleSection('playerPortfolio')}
          className="w-full text-left flex justify-between items-center p-6 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Player Portfolio</h2>
          <span className="transform transition-transform duration-200" style={{
            transform: openSections.playerPortfolio ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            <ChevronDown className="w-5 h-5" />
          </span>
        </button>
        <div className={`space-y-4 overflow-hidden transition-all duration-300 ${openSections.playerPortfolio ? 'max-h-[2000px] mt-4 p-4 sm:p-6' : 'max-h-0'
          }`}>
          {userDetails.portfolio.length === 0 ? (
            <div className="text-gray-400 text-center py-4">No player portfolio found</div>
          ) : (
            userDetails.portfolio.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-gray-500">Player Name</p>
                    <p className="font-medium text-gray-300">{item.playerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Team</p>
                    <p className="font-medium text-gray-300">{item.team}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Initial Price</p>
                    <p className="font-medium text-gray-300">₹{item.initialPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Current Holdings</p>
                    <p className="font-medium text-gray-300">{item.currentHoldings}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Transactions</h3>
                  <div className="space-y-2">
                    {item.transactions.map((transaction, tIndex) => (
                      <div key={tIndex} className="bg-gray-50/5 p-3 rounded">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
                          <div>
                            <p className="text-gray-500">Type</p>
                            <p className={`font-medium ${transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'
                              }`}>
                              {transaction.type.toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Quantity</p>
                            <p className="font-medium text-gray-300">{transaction.quantity}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Price</p>
                            <p className="font-medium text-gray-300">₹{transaction.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Time</p>
                            <p className="font-medium text-gray-300">{new Date(transaction.timestamp).toLocaleString()}</p>
                          </div>
                          {transaction.autoSold && (
                            <div className="col-span-1 sm:col-span-4">
                              <p className="text-gray-500">Auto-sold Reason</p>
                              <p className="font-medium text-gray-300">{transaction.reason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Team Portfolio Accordion */}
      <div className="bg-white/5 rounded-lg shadow-md">
        <button
          onClick={() => toggleSection('teamPortfolio')}
          className="w-full text-left flex justify-between items-center p-6 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Team Portfolio</h2>
          <span className="transform transition-transform duration-200" style={{
            transform: openSections.teamPortfolio ? 'rotate(180deg)' : 'rotate(0deg)'
          }}>
            <ChevronDown className="w-5 h-5" />
          </span>
        </button>
        <div className={`space-y-4 overflow-hidden transition-all duration-300 ${openSections.teamPortfolio ? 'max-h-[2000px] mt-4 p-4 sm:p-6' : 'max-h-0'
          }`}>
          {userDetails.teamPortfolio.length === 0 ? (
            <div className="text-gray-400 text-center py-4">No team portfolio found</div>
          ) : (
            userDetails.teamPortfolio.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 sm:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div>
                    <p className="text-gray-500">Team Name</p>
                    <p className="font-medium text-gray-300">{item.teamName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Initial Price</p>
                    <p className="font-medium text-gray-300">₹{item.initialPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Current Holdings</p>
                    <p className="font-medium text-gray-300">{item.currentHoldings}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Transactions</h3>
                  <div className="space-y-2">
                    {item.transactions.map((transaction, tIndex) => (
                      <div key={tIndex} className="bg-gray-50/5 p-3 rounded">
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
                          <div>
                            <p className="text-gray-500">Type</p>
                            <p className={`font-medium ${transaction.type === 'buy' ? 'text-green-600' : 'text-red-600'
                              }`}>
                              {transaction.type.toUpperCase()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Quantity</p>
                            <p className="font-medium text-gray-300">{transaction.quantity}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Price</p>
                            <p className="font-medium text-gray-300">₹{transaction.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Time</p>
                            <p className="font-medium text-gray-300">{new Date(transaction.timestamp).toLocaleString()}</p>
                          </div>
                          {transaction.autoSold && (
                            <div className="col-span-1 sm:col-span-4">
                              <p className="text-gray-500">Auto-sold Reason</p>
                              <p className="font-medium text-gray-300">{transaction.reason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
