import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useApiStatus } from "./useApiStatus";

export const useLiveState = (icao24?: string, page: number = 1) => {
	const { isApiOnline } = useApiStatus();

	return useQuery({
		queryKey: ["liveState", icao24, page],
		queryFn: () => apiClient.getLiveState(icao24, page),
		refetchInterval: 5000, // Refresh every 5 seconds for live data
		enabled: isApiOnline, // Only run when API is online
	});
};

export const useHistoricalState = (icao24?: string, page: number = 1) => {
	const { isApiOnline } = useApiStatus();

	return useQuery({
		queryKey: ["historicalState", icao24, page],
		queryFn: () => apiClient.getHistoricalState(icao24, page),
		enabled: isApiOnline, // Only run when API is online
	});
};

export const useFlightHistory = (icao24: string) => {
	const { isApiOnline } = useApiStatus();

	return useQuery({
		queryKey: ["flightHistory", icao24],
		queryFn: () => apiClient.getFlightHistory(icao24),
		enabled: isApiOnline && !!icao24, // Only run when API is online and icao24 is provided
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useFlightsMeta = (icao24?: string, page: number = 1) => {
	const { isApiOnline } = useApiStatus();

	return useQuery({
		queryKey: ["flightsMeta", icao24, page],
		queryFn: () => apiClient.getFlightsMeta(icao24, page),
		enabled: isApiOnline, // Only run when API is online
	});
};

export const useStateList = (collection: string) => {
	const { isApiOnline } = useApiStatus();

	return useQuery({
		queryKey: ["stateList", collection],
		queryFn: () => apiClient.getStateList(collection),
		staleTime: 5 * 60 * 1000, // 5 minutes
		enabled: isApiOnline, // Only run when API is online
	});
};

export const useHealthCheck = () => {
	return useQuery({
		queryKey: ["health"],
		queryFn: () => apiClient.getHealth(),
		refetchInterval: 30000, // Check every 30 seconds
		retry: 3,
		retryDelay: 1000,
	});
};
