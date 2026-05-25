import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SetupAxiosSpinnerInterceptors } from "./api/api-client.ts";
import App from "./app/App.tsx";
import { LoadingProvider } from "./components/LoadingSpinner/LoadingProvider.tsx";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.tsx";
// import { Toaster } from "./components/ui/sonner.tsx";
// import { DialogProvider } from "./hooks/useDialog/DialogProvider.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 5000,
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <SetupAxiosSpinnerInterceptors />
        <LoadingSpinner />
        {/* <DialogProvider> */}
          <App />
        {/* </DialogProvider> */}
      </LoadingProvider>
      {/* <Toaster /> */}
    </QueryClientProvider>
  </StrictMode>
);
