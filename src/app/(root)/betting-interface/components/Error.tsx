import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Error = ({ message }: { message: string }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-transparent via-transparent to-sky-600/30 p-4">
        <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-white/70">
                    {message || "Unae to Fetch Match Data"}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex space-x-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </CardContent>
        </Card>
    </div>
);
