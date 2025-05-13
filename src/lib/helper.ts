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
