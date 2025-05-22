"use client"

import { useEffect, useState } from "react";
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
import { useUserStore } from "@/store/user-store";
import { TransactionModal } from "./transaction-modal";

export default function MoneyTransactionsPage() {
  const [addtxnAmount, setAddtxnAmount] = useState("")
  const [withdrawtxnAmount, setWithdrawtxnAmount] = useState("")
  const [depositsAvailable, setDepositsAvailable] = useState(false)
  const [withdrawlAvailable, setWithdrawlAvailable] = useState(false)
  const [transactionsAvailable, setTransactionsAvailable] = useState(false)
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  // Filtered transactions
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  function formatINR(amount: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(amount))
  }

  useEffect(() => {
    setDepositsAvailable(true)
    setTransactionsAvailable(true)
    setWithdrawlAvailable(true)
  }, [])

  // Filter transactions whenever filter criteria change
  useEffect(() => {
    let results = [...transactions]

    // Filter by search query (check ID, reference, and amount)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (transaction) =>
          transaction.txnId.toLowerCase().includes(query) ||
          (transaction.reference && transaction.reference.toLowerCase().includes(query)) ||
          transaction.txnAmount.toString().includes(query),
      )
    }

    // Filter by payment method
    if (paymentMethodFilter !== "all") {
      results = results.filter(
        (transaction) => transaction.txnPaymentMethod.toLowerCase() === paymentMethodFilter.toLowerCase(),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      results = results.filter((transaction) => transaction.txnStatus.toLowerCase() === statusFilter.toLowerCase())
    }

    // Filter by date range
    if (dateRange.from || dateRange.to) {
      results = results.filter((transaction) => {
        const txnDate = new Date(transaction.txnDate.split("•")[0].trim())

        if (dateRange.from && dateRange.to) {
          return txnDate >= dateRange.from && txnDate <= dateRange.to
        } else if (dateRange.from) {
          return txnDate >= dateRange.from
        } else if (dateRange.to) {
          return txnDate <= dateRange.to
        }

        return true
      })
    }

    setFilteredTransactions(results)
  }, [searchQuery, paymentMethodFilter, statusFilter, dateRange])

  const presettxnAmounts = ["₹100", "₹500", "₹1,000", "₹2,000", "₹5,000", "₹10,000"]

  const parsetxnAmount = (txnAmount: string) => txnAmount.replace(/[^\d]/g, "")

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setPaymentMethodFilter("all")
    setStatusFilter("all")
    setDateRange({ from: undefined, to: undefined })
  }

  return (
    <div className="p-5 h-full min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">My Wallet Transactions</h1>
            <p className="text-gray-400">Manage your wallet here</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-spacing-x-0.5 border-transparent hover:border-white text-white hover:bg-transparent p-4 sm:size-default"
            >
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Export Transactions</span>
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
              <CardTitle className="text-2xl text-white">Available Balance</CardTitle>
              <CardDescription className="text-lg text-gray-400">Current funds in your wallet</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <Wallet className="h-10 w-10 mr-3 text-emerald-500" />
                <div>
                  <div className="text-3xl font-bold text-white">{formatINR(Number(user?.amount))}</div>
                  <p className="mt-1 text-sm text-gray-400">
                    Last updated :{" "}
                    {user?.lastSeen
                      ? (() => {
                          const diffMs = Date.now() - new Date(user.lastSeen).getTime()
                          const diffSec = Math.floor(diffMs / 1000)
                          const hours = Math.floor(diffSec / 3600)
                          const minutes = Math.floor((diffSec % 3600) / 60)
                          return `${hours} hrs ${minutes} mins ago`
                        })()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 backdrop-blur-sm border-2 border-transparent hover:border-blue-400">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-2xl text-white">Total Deposited</CardTitle>
              <CardDescription className="text-lg text-gray-400">All-time deposits to platform</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <ArrowDownLeft className="h-10 w-10 mr-3 text-blue-400" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    {formatINR(
                      transactions
                        .filter((transaction) => transaction.txnType === "deposit")
                        .reduce((sum, transaction) => {
                          const amount = Number(transaction.txnAmount.replace(/,/g, ""))
                          return sum + (isNaN(amount) ? 0 : amount)
                        }, 0),
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-400">Across {
                    transactions
                      .filter((transaction) => transaction.txnType === "deposit").length
                  } deposits</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 backdrop-blur-sm border-2 border-transparent hover:border-orange-400">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-2xl text-white">Total Withdrawls</CardTitle>
              <CardDescription className="text-lg text-gray-400">All-time withdrawals from platform</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <ArrowUpRight className="h-10 w-10 mr-3 text-orange-400" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    {formatINR(
                      transactions
                        .filter((transaction) => transaction.txnType === "withdrawal")
                        .reduce((sum, transaction) => {
                          const amount = Number(transaction.txnAmount.replace(/,/g, ""))
                          return sum + (isNaN(amount) ? 0 : amount)
                        }, 0),
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-400">Across {
                    transactions
                      .filter((transaction) => transaction.txnType === "withdrawal").length
                  } withdrawals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:mb-2 grid-cols-1 md:grid-cols-2">
          {/* Quick Add Money Card */}
          <Card className="bg-gray-900 backdrop-blur-sm">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
              <CardTitle className="text-4xl text-white">Quick Add Funds</CardTitle>
              <CardDescription className="text-lg text-gray-400">Add funds to your wallet</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {presettxnAmounts.map((txnAmount) => (
                    <Button
                      key={txnAmount}
                      variant="outline"
                      onClick={() => setAddtxnAmount(parsetxnAmount(txnAmount))}
                      className="border-gray-900 bg-gray-800 text-gray-200 hover:border-white hover:bg-gray-900 hover:text-white"
                    >
                      {txnAmount}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Enter txnAmount"
                    value={addtxnAmount}
                    onChange={(e) => setAddtxnAmount(e.target.value)}
                    className="border-2 border-transparent focus-visible:border-green-600 bg-gray-800 text-gray-200 placeholder:text-gray-500"
                  />
                  <Button className="bg-green-600 text-white font-bold hover:bg-green-600/60">Pay</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Withdraw Card */}
          <Card className="bg-gray-900 backdrop-blur-sm">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3">
              <CardTitle className="text-4xl text-white">Quick Withdraw Funds</CardTitle>
              <CardDescription className="text-lg text-gray-400">Withdraw funds from your wallet</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {presettxnAmounts.map((txnAmount) => (
                    <Button
                      key={txnAmount}
                      variant="outline"
                      onClick={() => setWithdrawtxnAmount(parsetxnAmount(txnAmount))}
                      className="border-gray-900 bg-gray-800 text-gray-200 hover:border-white hover:bg-gray-900 hover:text-white"
                    >
                      {txnAmount}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Enter txnAmount"
                    value={withdrawtxnAmount}
                    onChange={(e) => setWithdrawtxnAmount(e.target.value)}
                    className="border-2 border-transparent focus-visible:border-orange-500 bg-gray-800 text-gray-200 placeholder:text-gray-500"
                  />
                  <Button className="bg-orange-500 font-bold hover:bg-orange-500/60">Withdraw</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="mt-10 h-12 w-100 p-0 bg-gray-900 text-gray-400 rounded-full">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-accent border data-[state=active]:border-accent data-[state=active]:text-white rounded-none rounded-tl-full rounded-bl-full"
            >
              All Transactions
            </TabsTrigger>
            <TabsTrigger
              value="deposits"
              className="data-[state=active]:bg-accent data-[state=active]:text-white rounded-none"
            >
              Deposits
            </TabsTrigger>
            <TabsTrigger
              value="withdrawals"
              className="data-[state=active]:bg-accent data-[state=active]:text-white rounded-none rounded-tr-full rounded-br-full"
            >
              Withdrawals
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card className="border-gray-900 bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="px-3 pt-2 sm:px-4 sm:pt-3 md:px-6 md:pt-4">
                <CardTitle className="text-4xl text-white">All Transactions</CardTitle>
              </CardHeader>
              {transactionsAvailable ? (
                <>
                  <CardContent className="p-6 pt-0">
                    <div className="sm:mb-6 flex flex-col gap-3 sm:gap-4 lg:flex-row">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search transactions..."
                          className="border-gray-700 bg-gray-800 pl-10 text-gray-200 placeholder:text-gray-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-full sm:w-[180px]">
                          <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                            <SelectTrigger className="border-gray-700 bg-gray-800 text-gray-200">
                              <div className="flex items-center">
                                <Filter className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Payment Method" />
                              </div>
                            </SelectTrigger>
                            <SelectContent className="border-gray-700 bg-gray-800 text-gray-200">
                              <SelectItem value="all">All Methods</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="net banking">Net Banking</SelectItem>
                              <SelectItem value="credit card">Credit Card</SelectItem>
                              <SelectItem value="debit card">Debit Card</SelectItem>
                              <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

















                    <div className="rounded-md border border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700 bg-gray-800/50">
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date & Time</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Transaction ID</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Payment Method</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Amount</th>
                              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Type</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTransactions.length > 0 ? (
                              filteredTransactions.map((transaction) => (
                                <tr
                                  key={transaction.id}
                                  className="border-b border-gray-700 bg-gray-800/20 hover:bg-gray-700/30 cursor-pointer"
                                  onClick={() => handleTransactionClick(transaction)}
                                >
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                                    {transaction.txnDate}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-300">
                                    <div className="font-mono">{transaction.txnId}</div>
                                    <div className="text-xs text-gray-400">{transaction.reference}</div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-300">
                                    <div className="flex items-center">
                                      {gettxnPaymentMethodIcon(transaction.txnPaymentMethod)}
                                      <span className="ml-2">{transaction.txnPaymentMethod}</span>
                                    </div>
                                  </td>
                                  <td
                                    className={`whitespace-nowrap px-4 py-4 text-right text-sm font-medium ${
                                      transaction.txnType === "deposit" ? "text-green-400" : "text-orange-400"
                                    }`}
                                  >
                                    {transaction.txnType === "deposit" ? "+" : "-"}₹{transaction.txnAmount}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm">
                                    <Badge
                                      className={`${
                                        transaction.txnType === "deposit"
                                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                          : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        {transaction.txnType === "deposit" ? (
                                          <ArrowDownLeft className="mr-1 h-3 w-3" />
                                        ) : (
                                          <ArrowUpRight className="mr-1 h-3 w-3" />
                                        )}
                                        {transaction.txnType === "deposit" ? "Deposit" : "Withdrawal"}
                                      </span>
                                    </Badge>
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                                    <Badge className={`${gettxnStatusColor(transaction.txnStatus)}`}>
                                      {transaction.txnStatus}
                                    </Badge>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                                  No transactions found matching your filters
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {filteredTransactions.length > 0 && (
                      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <p className="text-xs sm:text-sm text-gray-400">
                          Showing {filteredTransactions.length} of {transactions.length} transactions
                        </p>
                      </div>
                    )}
                  </CardContent>
                </>
              ) : (
                <>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <p className="text-lg text-gray-400">Your Transactions will be displayed here</p>
                  </CardContent>
                </>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="deposits" className="mt-4">
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="px-3 pt-2 sm:px-4 sm:pt-3 md:px-6 md:pt-4">
                <CardTitle className="text-4xl text-white">Deposits</CardTitle>
              </CardHeader>
              {depositsAvailable ? (
                <>
                  <CardContent className="p-6 pt-0">
                    <div className="sm:mb-6 flex flex-col gap-3 sm:gap-4 lg:flex-row">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search deposits..."
                          className="border-gray-700 bg-gray-800 pl-10 text-gray-200 placeholder:text-gray-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700 bg-gray-800/50">
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date & Time</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Transaction ID</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Payment Method</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Amount</th>
                              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Type</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTransactions
                              .filter((t) => t.txnType.includes("deposit"))
                              .map((transaction) => (
                                <tr
                                  key={transaction.id}
                                  className="border-b border-gray-700 bg-gray-800/20 hover:bg-gray-700/30 cursor-pointer"
                                  onClick={() => handleTransactionClick(transaction)}
                                >
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                                    {transaction.txnDate}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-300">
                                    <div className="font-mono">{transaction.txnId}</div>
                                    <div className="text-xs text-gray-400">{transaction.reference}</div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-300">
                                    <div className="flex items-center">
                                      {gettxnPaymentMethodIcon(transaction.txnPaymentMethod)}
                                      <span className="ml-2">{transaction.txnPaymentMethod}</span>
                                    </div>
                                  </td>
                                  <td
                                    className={`whitespace-nowrap px-4 py-4 text-right text-sm font-medium ${
                                      transaction.txnType === "deposit" ? "text-green-400" : "text-orange-400"
                                    }`}
                                  >
                                    {transaction.txnType === "deposit" ? "+" : "-"}₹{transaction.txnAmount}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm">
                                    <Badge
                                      className={`${
                                        transaction.txnType === "deposit"
                                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                          : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        {transaction.txnType === "deposit" ? (
                                          <ArrowDownLeft className="mr-1 h-3 w-3" />
                                        ) : (
                                          <ArrowUpRight className="mr-1 h-3 w-3" />
                                        )}
                                        {transaction.txnType === "deposit" ? "Deposit" : "Withdrawal"}
                                      </span>
                                    </Badge>
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                                    <Badge className={`${gettxnStatusColor(transaction.txnStatus)}`}>
                                      {transaction.txnStatus}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <p className="text-gray-400">Your deposit transactions will be displayed here</p>
                  </CardContent>
                </>
              )}
            </Card>
          </TabsContent>
          <TabsContent value="withdrawals" className="mt-4">
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
              <CardHeader className="px-3 pt-2 sm:px-4 sm:pt-3 md:px-6 md:pt-4">
                <CardTitle className="text-4xl text-white">Withdrawls</CardTitle>
              </CardHeader>
              {withdrawlAvailable ? (
                <>
                  <CardContent className="p-6 pt-0">
                    <div className="sm:mb-6 flex flex-col gap-3 sm:gap-4 lg:flex-row">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search withdrawals..."
                          className="border-gray-700 bg-gray-800 pl-10 text-gray-200 placeholder:text-gray-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-700 bg-gray-800/50">
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date & Time</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Transaction ID</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Payment Method</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Amount</th>
                              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Type</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTransactions
                              .filter((t) => t.txnType.includes("withdrawal"))
                              .map((transaction) => (
                                <tr
                                  key={transaction.id}
                                  className="border-b border-gray-700 bg-gray-800/20 hover:bg-gray-700/30 cursor-pointer"
                                  onClick={() => handleTransactionClick(transaction)}
                                >
                                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                                    {transaction.txnDate}
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-300">
                                    <div className="font-mono">{transaction.txnId}</div>
                                    <div className="text-xs text-gray-400">{transaction.reference}</div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-300">
                                    <div className="flex items-center">
                                      {gettxnPaymentMethodIcon(transaction.txnPaymentMethod)}
                                      <span className="ml-2">{transaction.txnPaymentMethod}</span>
                                    </div>
                                  </td>
                                  <td
                                    className={`whitespace-nowrap px-4 py-4 text-right text-sm font-medium ${
                                      transaction.txnType === "deposit" ? "text-green-400" : "text-orange-400"
                                    }`}
                                  >
                                    {transaction.txnType === "deposit" ? "+" : "-"}₹{transaction.txnAmount}
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-center text-sm">
                                    <Badge
                                      className={`${
                                        transaction.txnType === "deposit"
                                          ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                          : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        {transaction.txnType === "deposit" ? (
                                          <ArrowDownLeft className="mr-1 h-3 w-3" />
                                        ) : (
                                          <ArrowUpRight className="mr-1 h-3 w-3" />
                                        )}
                                        {transaction.txnType === "deposit" ? "Deposit" : "Withdrawal"}
                                      </span>
                                    </Badge>
                                  </td>
                                  <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                                    <Badge className={`${gettxnStatusColor(transaction.txnStatus)}`}>
                                      {transaction.txnStatus}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <p className="text-lg text-gray-400">Your withdrawal transactions will be displayed here</p>
                  </CardContent>
                </>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {selectedTransaction && (
        <TransactionModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
      )}
    </div>
  )
}

// Sample transaction data for money transactions
const transactions = [
  {
    id: 1,
    txnDate: "May 12, 2023 • 14:32",
    txnId: "TXN123456789",
    reference: "Add money to wallet",
    txnPaymentMethod: "UPI",
    txnAmount: "5,000.00",
    txnType: "deposit",
    txnStatus: "Completed",
  },
  {
    id: 2,
    txnDate: "May 10, 2023 • 09:15",
    txnId: "TXN123456788",
    reference: "Withdrawal to bank account",
    txnPaymentMethod: "Bank Transfer",
    txnAmount: "2,500.00",
    txnType: "withdrawal",
    txnStatus: "Completed",
  },
  {
    id: 3,
    txnDate: "May 8, 2023 • 18:45",
    txnId: "TXN123456787",
    reference: "Add money to wallet",
    txnPaymentMethod: "Credit Card",
    txnAmount: "10,000.00",
    txnType: "deposit",
    txnStatus: "Completed",
  },
  {
    id: 4,
    txnDate: "May 5, 2023 • 11:20",
    txnId: "TXN123456786",
    reference: "Withdrawal to bank account",
    txnPaymentMethod: "Bank Transfer",
    txnAmount: "7,500.00",
    txnType: "withdrawal",
    txnStatus: "Completed",
  },
  {
    id: 5,
    txnDate: "May 3, 2023 • 16:05",
    txnId: "TXN123456785",
    reference: "Add money to wallet",
    txnPaymentMethod: "Net Banking",
    txnAmount: "3,000.00",
    txnType: "deposit",
    txnStatus: "Completed",
  },
  {
    id: 6,
    txnDate: "Apr 30, 2023 • 20:18",
    txnId: "TXN123456784",
    reference: "Add money to wallet",
    txnPaymentMethod: "UPI",
    txnAmount: "2,000.00",
    txnType: "deposit",
    txnStatus: "Completed",
  },
  {
    id: 7,
    txnDate: "Apr 28, 2023 • 13:40",
    txnId: "TXN123456783",
    txnPaymentMethod: "Bank Transfer",
    txnAmount: "5,000.00",
    txnType: "withdrawal",
    txnStatus: "Completed",
  },
  {
    id: 8,
    txnDate: "Apr 25, 2023 • 09:55",
    txnId: "TXN123456782",
    reference: "Add money to wallet",
    txnPaymentMethod: "Debit Card",
    txnAmount: "7,500.00",
    txnType: "deposit",
    txnStatus: "Completed",
  },
  {
    id: 9,
    txnDate: "Apr 22, 2023 • 17:30",
    txnId: "TXN123456781",
    reference: "Add money to wallet",
    txnPaymentMethod: "UPI",
    txnAmount: "1,250.00",
    txnType: "deposit",
    txnStatus: "Failed",
  },
  {
    id: 10,
    txnDate: "Apr 20, 2023 • 14:15",
    txnId: "TXN123456780",
    reference: "Withdrawal to bank account",
    txnPaymentMethod: "Bank Transfer",
    txnAmount: "6,181.25",
    txnType: "withdrawal",
    txnStatus: "Pending",
  },
]

// Helper function for txnStatus colors
function gettxnStatusColor(txnStatus: string) {
  switch (txnStatus) {
    case "Completed":
      return "bg-green-500/20 text-green-400 hover:bg-green-500/30"
    case "Pending":
      return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
    case "Failed":
      return "bg-red-500/20 text-red-400 hover:bg-red-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
  }
}

// Helper function for payment method icons
function gettxnPaymentMethodIcon(method: string) {
  switch (method) {
    case "UPI":
      return (
        <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">U</div>
      )
    case "Credit Card":
      return (
        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">C</div>
      )
    case "Debit Card":
      return (
        <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">D</div>
      )
    case "Net Banking":
      return (
        <div className="h-4 w-4 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">N</div>
      )
    case "Bank Transfer":
      return (
        <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">B</div>
      )
    case "Wallet":
      return (
        <div className="h-4 w-4 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">W</div>
      )
    default:
      return (
        <div className="h-4 w-4 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">?</div>
      )
  }
}
