import { LoaderCircle } from "lucide-react";

export default function GlobalLoading() {
  return (
    <main className="bg-background fixed inset-0 z-50 grid h-screen w-full cursor-wait place-items-center">
      <div className="space-y-3 flex flex-col items-center justify-center">
        <LoaderCircle className="size-10 inline-block animate-spin" />
        <span className="text-3xl font-medium text-gray-800">
          Please Wait
        </span>
      </div>
    </main>
  );
}


