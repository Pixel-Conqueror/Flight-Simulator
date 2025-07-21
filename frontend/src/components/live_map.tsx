import { useLiveState } from "@/hooks/useApi";
import { normalizeData } from "@/lib/data_utils";
import "@/styles/leaflet-overrides.css";
import type { FlightData } from "@/types/api";
import { Flex, List } from "@mantine/core";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icao24Selector } from "./icao24_selector";
import { createPlaneIcon } from "./plane_icon";
import { ErrorState } from "./ui/error_state";
import { LoadingState } from "./ui/loading_state";
import { SectionHeader } from "./ui/section_header";

const PARIS_COORDINATES = [48.8566, 2.3522] as [number, number];

export const LiveMap = () => {
	const [selectedIcao24, setSelectedIcao24] = useState<string | null>(null);
	const { data, isLoading, error } = useLiveState(
		selectedIcao24 || undefined,
		1,
	);

	if (isLoading) {
		return (
			<LoadingState
				title="Loading real-time flight data..."
				subtitle="Retrieving current aircraft positions"
			/>
		);
	}

	if (error) {
		return <ErrorState message="Error loading live flight data" />;
	}

	const flights = normalizeData(data);

	return (
		<>
			<SectionHeader
				title="Live Flight Tracking"
				subtitle="Real-time flight positions on the map"
			>
				<Icao24Selector
					collection="live_state"
					value={selectedIcao24}
					onChange={setSelectedIcao24}
					placeholder="Filter by ICAO24"
					label="Filter by aircraft"
				/>
			</SectionHeader>

			<Flex h="calc(100vh - 190px)" w="100%">
				<MapContainer
					center={PARIS_COORDINATES}
					zoom={6}
					style={{ width: "100%", flex: 1 }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{flights.map((flight: FlightData) => {
						const planeIcon = createPlaneIcon(flight.heading);

						return (
							<Marker
								key={flight._id}
								position={[flight.latitude, flight.longitude]}
								icon={planeIcon}
							>
								<Popup>
									<List w="200px">
										<List.Item>ICAO24: {flight.icao24}</List.Item>
										<List.Item>Callsign: {flight.callsign}</List.Item>
										<List.Item>Altitude: {flight.baro_altitude} ft</List.Item>
										<List.Item>Velocity: {flight.velocity} m/s</List.Item>
										<List.Item>Heading: {flight.heading}°</List.Item>
										<List.Item>Country: {flight.origin_country}</List.Item>
										<List.Item>Squawk: {flight.squawk}</List.Item>
									</List>
								</Popup>
							</Marker>
						);
					})}
				</MapContainer>
			</Flex>
		</>
	);
};
