"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AadharForm } from "./aadhar-form"
import { PanForm } from "./pan-form"
import { Shield, FileCheck, AlertCircle, CreditCard, UserCheck } from "lucide-react"

export default function KYCPage() {
  const [activeTab, setActiveTab] = useState("aadhar")

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="container mx-auto flex max-w-6xl flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">KYC Verification</h1>
          <p className="text-muted-foreground">Complete your identity verification to access all features</p>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="border-border/40 bg-card/60 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-emerald-400" />
                <CardTitle className="text-2xl text-emerald-400">Secure Verification</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border-2 border-yellow-600 bg-card/30 p-4 animate-pulse">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Important Information</h4>
                      <p className="text-sm text-muted-foreground">
                        Please ensure all details match your official documents exactly. Incorrect information may lead
                        to verification failure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-950 rounded-lg p-6 min-h-[500px]">
                  <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab} 
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger 
                        value="aadhar" 
                        className={`flex items-center border-2 border-transparent rounded-none rounded-tl-full rounded-bl-full  justify-center gap-2 py-3 transition-all duration-200 ${
                          activeTab === "aadhar" 
                            ? "border-2 border-gray-600/80 text-white font-medium" 
                            : "hover:bg-gray-800"
                        }`}
                      >
                        <UserCheck className={`h-5 w-5 ${activeTab === "aadhar" ? "text-white" : "text-gray-400"}`} />
                        <span>Aadhar Verification</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="pan" 
                        className={`flex items-center border-2 border-transparent rounded-none rounded-tr-full rounded-br-full justify-center gap-2 py-3 transition-all duration-200 ${
                          activeTab === "pan" 
                            ? "border-2 border-gray-600/80 text-white font-medium" 
                            : "hover:bg-gray-800"
                        }`}
                      >
                        <CreditCard className={`h-5 w-5 ${activeTab === "pan" ? "text-white" : "text-gray-400"}`} />
                        <span>PAN Verification</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="bg-background p-6 rounded-lg min-h-[400px]">
                      <TabsContent value="aadhar" className="mt-0 transition-opacity duration-300">
                        <div className="space-y-2 mb-4">
                          <h3 className="text-xl font-medium text-white">Aadhar Verification</h3>
                        </div>
                        <AadharForm />
                      </TabsContent>
                      
                      <TabsContent value="pan" className="mt-0 transition-opacity duration-300">
                        <div className="space-y-2 mb-4">
                          <h3 className="text-xl font-medium text-white">PAN Verification</h3>
                        </div>
                        <PanForm />
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/40 pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileCheck className="h-4 w-4" />
                <span>Your data is encrypted and securely stored</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}