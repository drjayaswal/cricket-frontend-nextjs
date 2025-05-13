import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NAVLINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className={cn("max-w-screen w-full mx-auto bg-background/60 border-b border-gray-800 backdrop-blur-sm px-5 flex justify-between items-center transition-normal duration-500")}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={"/"}
              className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 text-transparent bg-clip-text">
              Crickstock11
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {
              NAVLINKS.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.title}
                </Link>
              ))
            }

          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-400 hover:text-white"
            ></Button>
            <Avatar className="h-9 w-9 border-2 border-purple-500">
              <AvatarImage
                src="/placeholder.svg?height=36&width=36"
                alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div >
    </>
  );
}

export default Navbar;
