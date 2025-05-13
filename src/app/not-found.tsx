import Link from "next/link";
import { MoveLeft } from "lucide-react";

// import { siteConfig } from "@/config/site";

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 z-50 grid h-screen place-items-center bg-background">
      <div className="space-y-4 rounded-[2rem] border-dashed border-black bg-secondary p-4 sm:border md:p-8 md:py-12">
        <div className="flex justify-center">
          {/* <Image */}
          {/*   src="/Images/logo.png" */}
          {/*   alt={siteConfig.name} */}
          {/*   width={200} */}
          {/*   height={200} */}
          {/*   className="object-contain" */}
          {/* /> */}
        </div>

        <hr className="text-white/20" />

        <h1 className="font-cabin text-white text-3xl font-semibold md:text-4xl">
          404 - Page Not Found
        </h1>
        <p className="font-openSans max-w-2xl text-gray-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex text-blue-500 underline-offset-4 transition hover:text-blue-600 hover:underline"
        >
          <MoveLeft className="mr-2" />
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
