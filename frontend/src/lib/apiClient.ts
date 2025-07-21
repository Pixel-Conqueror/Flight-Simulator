import type { FlightData, FlightMeta } from "@/types/api";
import { api } from "./api";

// Client API typé
export const apiClient = {
	// Live State
	getLiveState: async (
		icao24?: string,
		page: number = 1,
	): Promise<FlightData[]> => {
		const response = await api.apiLiveStateApiLiveStateGet(
			icao24 || undefined,
			page,
		);
		return response as FlightData[];
	},

	// Historical State
	getHistoricalState: async (
		icao24?: string,
		page: number = 1,
	): Promise<FlightData[]> => {
		const response = await api.apiHistoricalStateApiHistoricalStateGet(
			icao24 || undefined,
			page,
		);
		return response as FlightData[];
	},

	// Flights Meta
	getFlightsMeta: async (
		icao24?: string,
		page: number = 1,
	): Promise<FlightMeta[]> => {
		const response = await api.apiFlightsMetaApiFlightsMetaGet(
			icao24 || undefined,
			page,
		);
		return response as FlightMeta[];
	},

	// Health Check
	getHealth: async (): Promise<{ status: string }> => {
		const response = await fetch("http://localhost:8000/health");
		if (!response.ok) {
			throw new Error("Health check failed");
		}
		return response.json();
	},
};
