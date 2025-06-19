import ContactForm from "@/components/form/contact-form";
import { MapPin, Phone, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CricStock11",
  description:
    "Get in touch with our team for support, feedback, or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen p-10 text-white bg-background">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:gap-20 md:grid-cols-2 items-start">

            {/* Left Side - Contact Info */}
            <div>
              <p className="text-sm sm:text-base text-accent-light mb-2">How can we help you?</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-base sm:text-lg text-gray-300 mb-8">
                We're here to help and answer any questions you might have.
                We look forward to hearing from you!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 text-accent-light" />
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    flat no- 734 silver crown apartments
                    <br />
                    Vaishali nagar, Jaipur 302021
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-accent-light" />
                  <a
                    href="tel:+917877804889"
                    className="text-gray-300 hover:text-accent-light transition-colors text-sm sm:text-base"
                  >
                    +91 7877804889
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-accent-light" />
                  <a
                    href="mailto:contact@cricstock11.com"
                    className="text-gray-300 hover:text-accent-light transition-colors text-sm sm:text-base"
                  >
                    contact@cricstock11.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="rounded-2xl shadow-lg p-2 sm:p-8">
              <h2 className="text-5xl font-semibold text-accent-light">Send us a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
