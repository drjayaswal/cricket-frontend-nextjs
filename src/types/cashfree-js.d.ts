declare module "@cashfreepayments/cashfree-js" {
    export function load(options: {
        mode: "sandbox" | "production";
    }): Promise<{
        checkout: (config: {
            paymentSessionId: string;
            redirectTarget?: "_blank" | "_self" | "_modal";
        }) => Promise<{
            error?: string;
            paymentDetails?: {
                order?: {
                    order_id: string;
                    order_status: string;
                };
            };
        }>;
    }>;
  }