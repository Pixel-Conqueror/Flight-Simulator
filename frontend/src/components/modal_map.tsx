import {
	calculateMapCenter,
	formatAltitude,
	formatHeading,
	formatTimestamp,
	formatVelocity,
	getFlightPathPoints,
	shouldShowMarker,
} from "@/lib/data_utils";
import "@/styles/leaflet-overrides.css";
import type { FlightData } from "@/types/api";
import { Box, Stack, Text } from "@mantine/core";
import "leaflet/dist/leaflet.css";
import {
	MapContainer,
	Marker,
	Polyline,
	Popup,
	TileLayer,
} from "react-leaflet";
import { createPlaneIcon } from "./plane_icon";

interface ModalMapProps {
	flights: FlightData[];
	height?: number;
	showMarkers?: boolean;
}

export const ModalMap = ({
	flights,
	height = 300,
	showMarkers = true,
}: ModalMapProps) => {
	if (flights.length === 0) {
		return (
			<Box
				h={height}
				w="100%"
				style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
			>
				<Stack justify="center" align="center" h="100%">
					<Text c="dimmed" size="sm">
						No position available
					</Text>
				</Stack>
			</Box>
		);
	}

	const center = calculateMapCenter(flights);
	const pathPoints = getFlightPathPoints(flights);

	return (
		<Box
			h={height}
			w="100%"
			style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
		>
			<MapContainer
				center={center}
				zoom={8}
				style={{ height: "100%", width: "100%" }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				{pathPoints.length > 1 && (
					<Polyline
						positions={pathPoints}
						color="blue"
						weight={3}
						opacity={0.7}
					/>
				)}

				{showMarkers &&
					flights.map((flight, index) => {
						if (!shouldShowMarker(index, flights.length)) return null;

						const planeIcon = createPlaneIcon(flight.heading);

						return (
							<Marker
								key={`${flight._id}-${index}`}
								position={[flight.latitude, flight.longitude]}
								icon={planeIcon}
							>
								<Popup>
									<Stack gap="xs">
										<Text fw={700}>{flight.callsign}</Text>
										<Text size="sm">ICAO24: {flight.icao24}</Text>
										<Text size="sm">
											Altitude: {formatAltitude(flight.baro_altitude)}
										</Text>
										<Text size="sm">
											Velocity: {formatVelocity(flight.velocity)}
										</Text>
										<Text size="sm">
											Heading: {formatHeading(flight.heading)}
										</Text>
										<Text size="sm">
											Timestamp: {formatTimestamp(flight.time_position)}
										</Text>
										{index === 0 && (
											<Text size="sm" c="green">
												🟢 Departure
											</Text>
										)}
										{index === flights.length - 1 && (
											<Text size="sm" c="red">
												🔴 Arrival
											</Text>
										)}
									</Stack>
								</Popup>
							</Marker>
						);
					})}
			</MapContainer>
		</Box>
	);
};
