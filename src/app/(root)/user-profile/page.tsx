import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  LogOut,
  Shield,
  UserCircle,
  FileText,
  ChevronRight,
  Users,
  Plus,
  ArrowDownToLine,
  Phone,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Card */}
        <Card className="border-none rounded-xl shadow-md bg-[#1e1e1e] overflow-hidden">
          <div className="h-12 bg-gradient-to-r from-[#2a2a2a] to-[#333333]"></div>
          <CardContent className="pt-0 p-6 -mt-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-4 border-[#1e1e1e] shadow-md">
                <AvatarFallback className="bg-[#333333] text-gray-300 text-xl">
                  US
                </AvatarFallback>
                <AvatarImage src="/diverse-group.png" />
              </Avatar>
              <div className="flex-1 pt-4">
                <h2 className="text-xl font-medium text-gray-100">
                  User Profile
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Phone className="h-3 w-3" />
                  <span>+919549098255</span>
                  <Badge
                    variant="outline"
                    className="ml-1 text-xs bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] border-[#444444] cursor-pointer"
                  >
                    Verify
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Card */}
        <Card className="border-none rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#333333] to-[#222222] p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-normal text-gray-400">
                  Wallet Balance
                </p>
                <h3 className="text-3xl font-medium text-white mt-1">₹0</h3>
              </div>
              <Button className="bg-[#f5f5f5] text-[#121212] hover:bg-white shadow-md">
                <Plus className="mr-2 h-4 w-4" />
                Add Money
              </Button>
            </div>
          </div>
        </Card>

        {/* Account Section */}
        <Card className="border-none rounded-xl shadow-md bg-[#1e1e1e] overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-[#2a2a2a]">
            <CardTitle className="text-base font-medium text-gray-100">
              My Account
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div
              className={`
        flex items-center justify-between px-6 py-4 hover:bg-[#252525] cursor-pointer transition-colors
        ${false ? "text-red-400 hover:text-red-300" : ""}
        ${true ? "border-b border-[#2a2a2a]" : ""}
      `}
            >
              <div className="flex items-center gap-4">
                <div className={`${false ? "text-red-400" : "text-gray-400"}`}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      false ? "text-red-400" : "text-gray-200"
                    }`}
                  >
                    Terms and Conditions
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Read our terms of service
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        {/* Legality Section */}
        <Card className="border-none rounded-xl shadow-md bg-[#1e1e1e] overflow-hidden">
          <CardHeader className="px-6 py-4 border-b border-[#2a2a2a]">
            <CardTitle className="text-base font-medium text-gray-100">
              Legality & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div
              className={`
        flex items-center justify-between px-6 py-4 hover:bg-[#252525] cursor-pointer transition-colors
        ${false ? "text-red-400 hover:text-red-300" : ""}
        ${true ? "border-b border-[#2a2a2a]" : ""}
      `}
            >
              <div className="flex items-center gap-4">
                <div className={`${false ? "text-red-400" : "text-gray-400"}`}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      false ? "text-red-400" : "text-gray-200"
                    }`}
                  >
                    Terms and Conditions
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Read our terms of service
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
