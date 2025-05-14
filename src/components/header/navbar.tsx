"use client";

import { Button } from "@/components/ui/button";
import { NAVLINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  return (
    <>
      <div
        className={cn(
          "max-w-screen w-full mx-auto bg-background/60 border-b border-gray-800 backdrop-blur-sm px-5 flex justify-between items-center transition-normal duration-500"
        )}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={"/"}
              className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text"
            >
              CrickStock11
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {NAVLINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "text-gray-400 hover:text-white transition-colors duration-200",
                  usePathname() == link.href && "text-purple-400"
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          <Link href="/user-profile">
            <div className="flex items-center gap-3 border-2 border-accent rounded-full overflow-hidden p-1 cursor-pointer">
              <Button className="h-8 w-8 flex justify-center items-center rounded-full cursor-pointer">
                {true ? (
                  <User className="scale-150 text-accent" />
                ) : (
                  <Image
                    src={"globe.svg"}
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                )}
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
