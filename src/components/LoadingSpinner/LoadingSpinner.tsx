import { useLoading } from "./useLoading";

export default function LoadingSpinner() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 transition-opacity">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
        </div>
    );
};