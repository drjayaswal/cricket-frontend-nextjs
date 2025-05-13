"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Filter,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "./date-range-picker";

export default function MoneyTransactionsPage() {
  const [addAmount, setAddAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const presetAmounts = [
    "₹100",
    "₹500",
    "₹1,000",
    "₹2,000",
    "₹5,000",
    "₹10,000",
  ];
  // Utility: strip ₹ from the button string
  const parseAmount = (amount: string) => amount.replace(/[^\d]/g, "");

  return (
    <div className="p-5 h-full min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              My Wallet Transactions
            </h1>
            <p className="text-gray-400">Manage your wallet here</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white sm:size-default"
            >
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Export History</span>
              <span className="sm:hidden">Export</span>
            </Button>
            {/* <Button className="bg-green-500 text-white hover:bg-green-600" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Money</span>
              <span className="sm:hidden">Add</span>
            </Button>
            <Button className="bg-white text-gray-900 hover:bg-gray-100" size="sm">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Withdraw</span>
              <span className="sm:hidden">Withdraw</span>
            </Button> */}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-900 backdrop-blur-sm border-2 border-transparent hover:border-emerald-500">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-white">Available Balance</CardTitle>
              <CardDescription className="text-gray-400">
                Current funds in your wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <Wallet className="h-8 w-8 mr-3 text-emerald-500" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    ₹24,568.75
                  </div>
                  <p className="text-sm text-gray-400">
                    Last updated: 10 minutes ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 backdrop-blur-sm border-2 border-transparent hover:border-blue-400">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-white">Total Deposited</CardTitle>
              <CardDescription className="text-gray-400">
                All-time deposits to platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <ArrowDownLeft className="h-8 w-8 mr-3 text-blue-400" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    ₹45,750.00
                  </div>
                  <p className="text-sm text-gray-400">
                    Across 12 transactions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 backdrop-blur-sm border-2 border-transparent hover:border-orange-400">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-white">Total Withdrawn</CardTitle>
              <CardDescription className="text-gray-400">
                All-time withdrawals from platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <ArrowUpRight className="h-8 w-8 mr-3 text-orange-400" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    ₹21,181.25
                  </div>
                  <p className="text-sm text-gray-400">Across 5 transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:mb-2 grid-cols-1 md:grid-cols-2">
          {/* Quick Add Money Card */}
          <Card className="bg-gray-900 backdrop-blur-sm">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-4xl text-white">
                Quick Add Money
              </CardTitle>
              <CardDescription className="text-gray-400">
                Add funds to your wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {presetAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setAddAmount(parseAmount(amount))}
                      className="border-gray-900 bg-gray-800 text-gray-200 hover:border-white hover:bg-gray-900 hover:text-white"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Enter Amount"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="border-2 border-transparent focus-visible:border-green-600 bg-gray-800 text-gray-200 placeholder:text-gray-500"
                  />
                  <Button className="bg-green-600 text-white font-bold hover:bg-green-600/60">
                    Pay
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Withdraw Card */}
          <Card className="bg-gray-900 backdrop-blur-sm">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-4xl text-white">
                Quick Withdraw
              </CardTitle>
              <CardDescription className="text-gray-400">
                Withdraw funds from your wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {presetAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setWithdrawAmount(parseAmount(amount))}
                      className="border-gray-900 bg-gray-800 text-gray-200 hover:border-white hover:bg-gray-900 hover:text-white"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Enter Amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="border-2 border-transparent focus-visible:border-orange-500 bg-gray-800 text-gray-200 placeholder:text-gray-500"
                  />
                  <Button className="bg-orange-500 font-bold hover:bg-orange-500/60">
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="mt-10 bg-gray-800 text-gray-400">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              All Transactions
            </TabsTrigger>
            <TabsTrigger
              value="deposits"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Deposits
            </TabsTrigger>
            <TabsTrigger
              value="withdrawals"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
            >
              Withdrawals
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card className="border-gray-900 bg-gray-900 backdrop-blur-sm">
              <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                <CardTitle className="text-white">
                  All Wallet Transactions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  View all your deposits and withdrawals
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 lg:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search transactions..."
                      className="border-gray-700 bg-gray-800 pl-10 text-gray-200 placeholder:text-gray-500"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="w-full sm:w-[180px]">
                      <Select>
                        <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-200">
                          <div className="flex items-center">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Payment Method" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="border-gray-700 bg-gray-800 text-gray-200">
                          <SelectItem value="all">All Methods</SelectItem>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="netbanking">
                            Net Banking
                          </SelectItem>
                          <SelectItem value="card">
                            Credit/Debit Card
                          </SelectItem>
                          <SelectItem value="wallet">Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DatePickerWithRange className="w-full sm:w-auto" />
                  </div>
                </div>

                <div className="rounded-md border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700 bg-gray-800/50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Date & Time
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Transaction ID
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                            Payment Method
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                            Type
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="border-b border-gray-700 bg-gray-800/20 hover:bg-gray-700/30"
                          >
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                              {transaction.date}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300">
                              <div className="font-mono">
                                {transaction.transactionId}
                              </div>
                              <div className="text-xs text-gray-400">
                                {transaction.reference}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-300">
                              <div className="flex items-center">
                                {getPaymentMethodIcon(
                                  transaction.paymentMethod
                                )}
                                <span className="ml-2">
                                  {transaction.paymentMethod}
                                </span>
                              </div>
                            </td>
                            <td
                              className={`whitespace-nowrap px-4 py-4 text-right text-sm font-medium ${
                                transaction.type === "deposit"
                                  ? "text-green-400"
                                  : "text-orange-400"
                              }`}
                            >
                              {transaction.type === "deposit" ? "+" : "-"}₹
                              {transaction.amount}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-center text-sm">
                              <Badge
                                className={`${
                                  transaction.type === "deposit"
                                    ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                    : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                }`}
                              >
                                <span className="flex items-center">
                                  {transaction.type === "deposit" ? (
                                    <ArrowDownLeft className="mr-1 h-3 w-3" />
                                  ) : (
                                    <ArrowUpRight className="mr-1 h-3 w-3" />
                                  )}
                                  {transaction.type === "deposit"
                                    ? "Deposit"
                                    : "Withdrawal"}
                                </span>
                              </Badge>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                              <Badge
                                className={`${getStatusColor(
                                  transaction.status
                                )}`}
                              >
                                {transaction.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm text-gray-400">
                    Showing 10 of 17 transactions
                  </p>
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 h-8 px-3"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 h-8 px-3"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deposits" className="mt-4">
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                <CardTitle className="text-white">Deposits</CardTitle>
                <CardDescription className="text-gray-400">
                  View all your deposits to the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <p className="text-gray-400">
                  Your deposit transactions will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="withdrawals" className="mt-4">
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
                <CardTitle className="text-white">Withdrawals</CardTitle>
                <CardDescription className="text-gray-400">
                  View all your withdrawals from the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 md:p-6">
                <p className="text-gray-400">
                  Your withdrawal transactions will be displayed here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Sample transaction data for money transactions
const transactions = [
  {
    id: 1,
    date: "May 12, 2023 • 14:32",
    transactionId: "TXN123456789",
    reference: "Add money to wallet",
    paymentMethod: "UPI",
    amount: "5,000.00",
    type: "deposit",
    status: "Completed",
  },
  {
    id: 2,
    date: "May 10, 2023 • 09:15",
    transactionId: "TXN123456788",
    reference: "Withdrawal to bank account",
    paymentMethod: "Bank Transfer",
    amount: "2,500.00",
    type: "withdrawal",
    status: "Completed",
  },
  {
    id: 3,
    date: "May 8, 2023 • 18:45",
    transactionId: "TXN123456787",
    reference: "Add money to wallet",
    paymentMethod: "Credit Card",
    amount: "10,000.00",
    type: "deposit",
    status: "Completed",
  },
  {
    id: 4,
    date: "May 5, 2023 • 11:20",
    transactionId: "TXN123456786",
    reference: "Withdrawal to bank account",
    paymentMethod: "Bank Transfer",
    amount: "7,500.00",
    type: "withdrawal",
    status: "Completed",
  },
  {
    id: 5,
    date: "May 3, 2023 • 16:05",
    transactionId: "TXN123456785",
    reference: "Add money to wallet",
    paymentMethod: "Net Banking",
    amount: "3,000.00",
    type: "deposit",
    status: "Completed",
  },
  {
    id: 6,
    date: "Apr 30, 2023 • 20:18",
    transactionId: "TXN123456784",
    reference: "Add money to wallet",
    paymentMethod: "UPI",
    amount: "2,000.00",
    type: "deposit",
    status: "Completed",
  },
  {
    id: 7,
    date: "Apr 28, 2023 • 13:40",
    transactionId: "TXN123456783",
    reference: "Withdrawal to bank account",
    paymentMethod: "Bank Transfer",
    amount: "5,000.00",
    type: "withdrawal",
    status: "Completed",
  },
  {
    id: 8,
    date: "Apr 25, 2023 • 09:55",
    transactionId: "TXN123456782",
    reference: "Add money to wallet",
    paymentMethod: "Debit Card",
    amount: "7,500.00",
    type: "deposit",
    status: "Completed",
  },
  {
    id: 9,
    date: "Apr 22, 2023 • 17:30",
    transactionId: "TXN123456781",
    reference: "Add money to wallet",
    paymentMethod: "UPI",
    amount: "1,250.00",
    type: "deposit",
    status: "Failed",
  },
  {
    id: 10,
    date: "Apr 20, 2023 • 14:15",
    transactionId: "TXN123456780",
    reference: "Withdrawal to bank account",
    paymentMethod: "Bank Transfer",
    amount: "6,181.25",
    type: "withdrawal",
    status: "Pending",
  },
];

// Helper function for status colors
function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
    case "Failed":
      return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
  }
}

// Helper function for payment method icons
function getPaymentMethodIcon(method: string) {
  switch (method) {
    case "UPI":
      return (
        <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
          U
        </div>
      );
    case "Credit Card":
      return (
        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
          C
        </div>
      );
    case "Debit Card":
      return (
        <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
          D
        </div>
      );
    case "Net Banking":
      return (
        <div className="h-4 w-4 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
          N
        </div>
      );
    case "Bank Transfer":
      return (
        <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
          B
        </div>
      );
    case "Wallet":
      return (
        <div className="h-4 w-4 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
          W
        </div>
      );
    default:
      return (
        <div className="h-4 w-4 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
          ?
        </div>
      );
  }
}
