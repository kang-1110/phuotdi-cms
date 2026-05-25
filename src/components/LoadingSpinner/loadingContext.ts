import { createContext } from "react";

interface LoadingContextType {
    isLoading: boolean;
    incrementLoading: () => void;
    decrementLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);