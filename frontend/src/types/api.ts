// Types pour les réponses de l'API basés sur les vraies données

// Type pour les données de vol (Live Map et Historical)
export interface FlightData {
	_id: string;
	icao24: string;
	callsign: string;
	latitude: number;
	longitude: number;
	baro_altitude: number;
	geo_altitude: number;
	velocity: number;
	heading: number;
	vertical_rate: number;
	on_ground: boolean;
	squawk: string;
	origin_country: string;
	position_source: number;
	time_position: number;
	last_contact: number;
	request_time: number;
	sensors: unknown;
	spi: boolean;
}

// Type pour les métadonnées de vols
export interface FlightMeta {
	_id: string;
	callsigns: string[];
	first_seen: number;
	last_seen: string;
	last_known_callsign: string;
	origin_country: string;
}

// Type pour les réponses paginées
export interface PaginatedResponse<T> {
	data: T[];
	total_pages: number;
	current_page: number;
	total_items: number;
	items_per_page: number;
}

// Types spécifiques pour chaque endpoint
export type LiveStateResponse = PaginatedResponse<FlightData>;
export type HistoricalStateResponse = PaginatedResponse<FlightData>;
export type FlightsMetaResponse = PaginatedResponse<FlightMeta>;
