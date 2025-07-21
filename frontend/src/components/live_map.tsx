import { useLiveState } from "@/hooks/useApi";
import type { FlightData } from "@/types/api";
import { Box, Stack, Text, Title } from "@mantine/core";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { createPlaneIcon } from "./plane_icon";

export const LiveMap = () => {
	const { data, isLoading, error } = useLiveState(undefined, 1);
	console.log(data);

	if (isLoading) {
		return <Text>Loading live flight data...</Text>;
	}

	if (error) {
		return <Text c="red">Error loading live flight data</Text>;
	}

	const flights = data || [];

	return (
		<Box>
			<Title order={2} mb="lg">
				Live Flight Tracking
			</Title>
			<Text c="dimmed" size="sm" mb="lg">
				Real-time flight positions on the map
			</Text>

			<Box h={500} w="100%">
				<MapContainer
					center={[48.8566, 2.3522]} // Paris coordinates
					zoom={6}
					style={{ height: "100%", width: "100%" }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{flights.map((flight: FlightData) => {
						// Créer une icône d'avion orientée selon le cap de l'avion
						const planeIcon = createPlaneIcon(flight.heading);

						return (
							<Marker
								key={flight._id}
								position={[flight.latitude, flight.longitude]}
								icon={planeIcon}
							>
								<Popup>
									<Stack gap="xs">
										<Text fw={700}>{flight.callsign}</Text>
										<Text size="sm">ICAO24: {flight.icao24}</Text>
										<Text size="sm">Altitude: {flight.baro_altitude} ft</Text>
										<Text size="sm">Velocity: {flight.velocity} m/s</Text>
										<Text size="sm">Heading: {flight.heading}°</Text>
										<Text size="sm">Country: {flight.origin_country}</Text>
										<Text size="sm">Squawk: {flight.squawk}</Text>
									</Stack>
								</Popup>
							</Marker>
						);
					})}
				</MapContainer>
			</Box>
		</Box>
	);
};
