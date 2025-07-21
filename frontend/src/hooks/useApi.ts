import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useLiveState = (icao24?: string, page: number = 1) => {
	return useQuery({
		queryKey: ["liveState", icao24, page],
		queryFn: () => apiClient.getLiveState(icao24, page),
		refetchInterval: 5000, // Refresh every 5 seconds for live data
	});
};

export const useHistoricalState = (icao24?: string, page: number = 1) => {
	return useQuery({
		queryKey: ["historicalState", icao24, page],
		queryFn: () => apiClient.getHistoricalState(icao24, page),
	});
};

export const useFlightsMeta = (icao24?: string, page: number = 1) => {
	return useQuery({
		queryKey: ["flightsMeta", icao24, page],
		queryFn: () => apiClient.getFlightsMeta(icao24, page),
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
