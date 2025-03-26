"use client"; // Required because `QueryClientProvider` is a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { FormProvider } from "@/context/FormContext";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <FormProvider>
                {children}
                <Toaster />
            </FormProvider>
        </QueryClientProvider>
    );
}
