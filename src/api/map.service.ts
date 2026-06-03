import { useQuery } from "@tanstack/react-query";
import apiClient from "./api-client";
import type { LocationResult } from "@/types/map.type";

export const API_PATH_MAP = "https://nominatim.openstreetmap.org";

export function useSearchLocation(params: string) {
    return useQuery<LocationResult[]>({
        queryKey: ["SearchLocation", params],
        queryFn: async () => {
            const response = await apiClient.get<LocationResult[]>(`${API_PATH_MAP}/search?format=json&q=${encodeURIComponent(params)}&limit=5`);
            return response.data;
        },
        enabled: !!params,
    });
}
