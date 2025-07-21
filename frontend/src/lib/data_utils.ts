import type { FlightData } from "@/types/api";

// Type definitions for better type safety
type NullableNumber = number | null | undefined;
type NullableBoolean = boolean | null | undefined;
type Coordinates = [number, number];

// Constants
const DEFAULT_COORDINATES: Coordinates = [48.8566, 2.3522]; // Paris coordinates
const MARKER_SAMPLE_RATIO = 5;

// Utility function to check if value is null or undefined
const isNullOrUndefined = <T>(
	value: T | null | undefined,
): value is null | undefined => {
	return value === null || value === undefined;
};

// Generic formatter with null/undefined handling
const formatWithUnit = (
	value: NullableNumber,
	unit: string,
	fallback: string = "N/A",
): string => {
	if (isNullOrUndefined(value)) return fallback;
	return `${value}${unit}`;
};

// Generic boolean formatter
const formatBooleanValue = (
	value: NullableBoolean,
	trueValue: string = "Yes",
	falseValue: string = "No",
	fallback: string = "N/A",
): string => {
	if (isNullOrUndefined(value)) return fallback;
	return value ? trueValue : falseValue;
};

// Date formatting utilities
export const formatTimestamp = (
	timestamp: number | null | undefined,
): string => {
	if (isNullOrUndefined(timestamp)) return "N/A";
	return new Date(timestamp * 1000).toLocaleString();
};

export const formatDate = (dateString: string | null | undefined): string => {
	if (isNullOrUndefined(dateString)) return "N/A";
	return new Date(dateString).toLocaleString();
};

// Measurement formatting utilities
export const formatAltitude = (altitude: number | null | undefined): string =>
	formatWithUnit(altitude, " ft");

export const formatVelocity = (velocity: number | null | undefined): string =>
	formatWithUnit(velocity, " m/s");

export const formatHeading = (heading: number | null | undefined): string =>
	formatWithUnit(heading, "°");

export const formatLatitude = (latitude: number | null | undefined): string =>
	formatWithUnit(latitude, "°");

export const formatLongitude = (longitude: number | null | undefined): string =>
	formatWithUnit(longitude, "°");

export const formatBoolean = (value: boolean | null | undefined): string =>
	formatBooleanValue(value);

// Flight data validation utilities
const hasValidCoordinates = (flight: FlightData): boolean => {
	return (
		!isNullOrUndefined(flight.latitude) && !isNullOrUndefined(flight.longitude)
	);
};

const getValidFlights = (flights: FlightData[]): FlightData[] => {
	return flights.filter(hasValidCoordinates);
};

// Map calculation utilities
const calculateBounds = (
	coordinates: Coordinates[],
): { min: Coordinates; max: Coordinates } => {
	const lats = coordinates.map(([lat]) => lat);
	const lngs = coordinates.map(([, lng]) => lng);

	return {
		min: [Math.min(...lats), Math.min(...lngs)],
		max: [Math.max(...lats), Math.max(...lngs)],
	};
};

export const calculateMapCenter = (flights: FlightData[]): [number, number] => {
	if (flights.length === 0) return DEFAULT_COORDINATES;

	const validFlights = getValidFlights(flights);
	if (validFlights.length === 0) return DEFAULT_COORDINATES;

	const coordinates = validFlights.map(
		(f) => [f.latitude!, f.longitude!] as Coordinates,
	);
	const bounds = calculateBounds(coordinates);

	return [
		(bounds.min[0] + bounds.max[0]) / 2,
		(bounds.min[1] + bounds.max[1]) / 2,
	];
};

export const getFlightPathPoints = (
	flights: FlightData[],
): [number, number][] => {
	return getValidFlights(flights).map(
		(f) => [f.latitude!, f.longitude!] as [number, number],
	);
};

// Marker display logic
export const shouldShowMarker = (
	index: number,
	totalFlights: number,
): boolean => {
	const isFirstOrLast = index === 0 || index === totalFlights - 1;
	const shouldSample =
		totalFlights > 10 &&
		index % Math.ceil(totalFlights / MARKER_SAMPLE_RATIO) === 0;

	return isFirstOrLast || shouldSample;
};

// Data normalization utility
export const normalizeData = <T>(data: T | T[] | null | undefined): T[] => {
	if (!data) return [];
	return Array.isArray(data) ? data : [data];
};
