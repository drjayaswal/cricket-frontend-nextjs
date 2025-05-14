import jsPDF from "jspdf"
import { NextRequest } from "next/server";
import { useUserStore } from "@/store/user"; // adjust path

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";

  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors: string[] = [];
  if (!minLength) errors.push("at least 8 characters");
  if (!hasUpperCase) errors.push("an uppercase letter");
  if (!hasLowerCase) errors.push("a lowercase letter");
  if (!hasNumber) errors.push("a number");
  if (!hasSpecialChar) errors.push("a special character");

  return errors.length > 0
    ? `Password must contain ${errors.join(", ")}`
    : "";
};

export const validatePhone = (phone: string): string => {
  if (!phone) return "Phone number is required";

  const trimmedPhone = phone.replace(/\s+/g, "");

  if (trimmedPhone.startsWith("+91")) {
    const actualNumber = trimmedPhone.slice(3);
    if (!/^\d{10}$/.test(actualNumber)) {
      return "Phone number must be exactly 10 digits after +91";
    }
  } else {
    if (!/^\d{10}$/.test(trimmedPhone)) {
      return "Phone number must be exactly 10 digits";
    }
  }

  return "";
};

export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");

  // If it starts with 91 and is 12 digits long, keep the last 10 digits
  const tenDigitNumber = digits.length >= 10 ? digits.slice(-10) : digits;

  return `+91${tenDigitNumber}`;
};

interface Section {
  id: string
  title: string
  content: string
}

export const generateTermsPDF = (sections: Section[]) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Add title
  doc.setFontSize(20)
  doc.setTextColor(40, 40, 40)
  doc.text("Terms and Conditions", 20, 20)

  // Add date
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Last updated: ${new Date().toLocaleDateString()}`, 20, 30)

  let yPosition = 40

  // Add each section
  sections.forEach((section) => {
    // Add section title
    doc.setFontSize(14)
    doc.setTextColor(40, 40, 40)
    doc.text(section.title, 20, yPosition)
    yPosition += 10

    // Add section content
    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)

    // Split content into lines to fit page width
    const textLines = doc.splitTextToSize(section.content, 170)

    // Check if we need a new page
    if (yPosition + textLines.length * 5 > 280) {
      doc.addPage()
      yPosition = 20
    }

    doc.text(textLines, 20, yPosition)
    yPosition += textLines.length * 5 + 15

    // Add some space between sections
    if (yPosition > 280) {
      doc.addPage()
      yPosition = 20
    }
  })

  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(
      `© ${new Date().getFullYear()} Your Company Name. All rights reserved. | Page ${i} of ${pageCount}`,
      20,
      285,
    )
  }

  // Save the PDF
  doc.save("terms-and-conditions.pdf")
}


export const isAuthenticated = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;
  return !!token;
};


export const setUserIntoGlobalStore = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.user) {
        // Map MongoDB user data to User type
        const mappedUser = {
          name: data.user.name,
          mobile: data.user.mobile,
          isVerified: data.user.isVerified,
          password: "", // We don't store password in frontend
          isAdmin: data.user.isAdmin,
          role: data.user.role,
          lastSeen: new Date(data.user.lastSeen),
          amount: data.user.amount,
          transactions: data.user.transactions || [],
          portfolio: data.user.portfolio || [],
          teamPortfolio: data.user.teamPortfolio || [],
          // Optional fields
          ...(data.user.googleId && { googleId: data.user.googleId }),
          ...(data.user.email && { email: data.user.email }),
          ...(data.user.profileImage && { profileImage: data.user.profileImage }),
          ...(data.user.referralCode && { referralCode: data.user.referralCode }),
          ...(data.user.referredBy && { referredBy: data.user.referredBy }),
        };

        useUserStore.getState().setUser(mappedUser);
        console.log("✅ User set in store:", mappedUser);
        console.log("User data set into global store:", useUserStore.getState());
      }
    }
  } catch (e) {
    console.error("Error setting user into global store", e);
  }
};
