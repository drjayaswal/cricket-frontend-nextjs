"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
export function AadharForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    aadharNumber: "",
    dateOfBirth: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [showAadhar, setShowAadhar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar number must be exactly 12 digits.";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    }
    if (!formData.address || formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    toast.success("Aadhar Submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block mb-1">Holder's Name</label>
          <input
            type="text"
            required
            name="fullName"
            placeholder="Enter Full Name"
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className="w-full bg-gray-800 text-white p-2 rounded"
            value={formData.dateOfBirth}
            required
            onChange={handleChange}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-1">Aadhar Number</label>
        <div className="relative">
          <input
            type="number"
            name="aadharNumber"
            placeholder="Enter 12-digit Aadhar number"
            className="w-full bg-gray-800 text-white p-2 pl-3 rounded outline-none focus:border-0"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
          />
        </div>
        {errors.aadharNumber && (
          <p className="text-red-500 text-sm">{errors.aadharNumber}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 border-2 border-accent hover:bg-accent hover:text-white p-2 rounded"
      >
        Submit Aadhar Verification
      </button>
    </form>
  );
}
