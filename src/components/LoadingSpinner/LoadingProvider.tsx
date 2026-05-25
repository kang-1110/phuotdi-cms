import { type ReactNode, useState } from "react";
import { LoadingContext } from "./loadingContext";

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loadingCount, setLoadingCount] = useState<number>(0);

  const isLoading = loadingCount > 0;

  const incrementLoading = () => setLoadingCount(prev => prev + 1);
  const decrementLoading = () => setLoadingCount(prev => Math.max(0, prev - 1));

  return (
    <LoadingContext.Provider value={{ isLoading, incrementLoading, decrementLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

