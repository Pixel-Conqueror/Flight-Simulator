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

	// Flight History - Récupère tout l'historique d'un avion spécifique
	getFlightHistory: async (icao24: string): Promise<FlightData[]> => {
		const response = await fetch(
			`http://localhost:5001/api/historical_state?icao24=${icao24}&limit=100`,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch flight history");
		}
		return response.json();
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

	// State List - Récupère la liste des ICAO24 disponibles
	getStateList: async (collection: string): Promise<string[]> => {
		const response = await fetch(
			`http://localhost:5001/api/state_list?collection=${collection}`,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch state list");
		}
		return response.json();
	},

	// Health Check
	getHealth: async (): Promise<{ status: string }> => {
		const response = await fetch("http://localhost:5001/health");
		if (!response.ok) {
			throw new Error("Health check failed");
		}
		return response.json();
	},
};
