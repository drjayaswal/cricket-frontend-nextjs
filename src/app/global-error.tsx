"use client";

import Link from "next/link";
import { MoveLeft, TriangleAlert } from "lucide-react";

// import { siteConfig } from "@/config/site";
// import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error }: Props) {
  return (
    <div className="fixed inset-0 z-50 grid h-screen place-items-center bg-[#f2f2f2]">
      <div className="space-y-4 rounded-[2rem] border-dashed border-black bg-white p-4 sm:border md:p-8 md:py-12">
        {/* <Image */}
        {/*     src="/icon-512.png" */}
        {/*     alt={siteConfig.name} */}
        {/*     width={200} */}
        {/*     height={200} */}
        {/* /> */}

        <hr />

        <div className="flex items-center gap-2">
          <TriangleAlert className="size-8 text-orange-400" />

          <h1 className="font-cabin text-3xl font-semibold md:text-4xl">
            Something unexpected happened!
          </h1>
        </div>
        <p className="font-openSans max-w-2xl">
          {error.message || "An error occurred. Please try again."}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex text-blue-500 underline-offset-4 transition hover:text-blue-600 hover:underline"
          >
            <MoveLeft className="mr-2" />
            Go back
          </Link>

          {/* <Button variant="outline" onClick={reset}> */}
          {/*     <RotateCw className="mr-2 size-4" /> */}
          {/*     Try again */}
          {/* </Button> */}
        </div>
      </div>
    </div>
  );
}

