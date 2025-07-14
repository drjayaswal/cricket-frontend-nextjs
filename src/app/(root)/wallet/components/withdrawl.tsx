import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function WithdrawModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        accountNumber: "",
        accountName: "",
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const toastID = toast.loading("Sending Withdrawl Request...")
        setTimeout(() => {
            toast.success("Withdrawl Request Send");
            toast.dismiss(toastID)
        }, 1500);
        console.log(formData);
        handleClose();
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                className="bg-orange-500/50 hover:bg-orange-600 text-white font-semibold px-6 py-2"
                disabled
            >
                Withdraw
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className=" bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                        <h2 className="text-2xl font-bold mb-6">
                            Withdraw Money
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter Amount"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="accountName"
                                    value={formData.accountName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Account Name"
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="accountNumber"
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Account Number"
                                />
                            </div>


                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 transition cursor-pointer hover:bg-white hover:text-gray-800 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}