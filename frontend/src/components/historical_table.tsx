import { useHistoricalState } from "@/hooks/useApi";
import type { FlightData } from "@/types/api";
import {
	Box,
	Button,
	Center,
	Modal,
	Pagination,
	Stack,
	Table,
	Text,
	Title,
} from "@mantine/core";
import { useState } from "react";

export const HistoricalTable = () => {
	const [page, setPage] = useState(1);
	const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
	const { data, isLoading, error } = useHistoricalState(undefined, page);

	if (isLoading) {
		return <Text>Loading historical data...</Text>;
	}

	if (error) {
		return <Text c="red">Error loading historical data</Text>;
	}

	const flights = data || [];
	const totalPages = 10; // TODO: Implement proper pagination when API supports it

	const rows = flights.map((flight: FlightData) => (
		<Table.Tr key={flight._id}>
			<Table.Td>{flight.callsign}</Table.Td>
			<Table.Td>{flight.icao24}</Table.Td>
			<Table.Td>
				{new Date(flight.time_position * 1000).toLocaleString()}
			</Table.Td>
			<Table.Td>{flight.baro_altitude} ft</Table.Td>
			<Table.Td>{flight.velocity} m/s</Table.Td>
			<Table.Td>
				<Button
					variant="subtle"
					size="xs"
					onClick={() => setSelectedFlight(flight)}
				>
					View Details
				</Button>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Box>
			<Title order={2} mb="lg">
				Historical Flight Data
			</Title>
			<Text c="dimmed" size="sm" mb="lg">
				Browse historical flight records with pagination
			</Text>

			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Callsign</Table.Th>
						<Table.Th>ICAO24</Table.Th>
						<Table.Th>Timestamp</Table.Th>
						<Table.Th>Altitude</Table.Th>
						<Table.Th>Velocity</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>

			<Center mt="md">
				<Pagination total={totalPages} value={page} onChange={setPage} />
			</Center>

			<Modal
				opened={!!selectedFlight}
				onClose={() => setSelectedFlight(null)}
				title="Flight Details"
				size="md"
			>
				{selectedFlight && (
					<Stack gap="sm">
						<Text>
							<strong>Callsign:</strong> {selectedFlight.callsign}
						</Text>
						<Text>
							<strong>ICAO24:</strong> {selectedFlight.icao24}
						</Text>
						<Text>
							<strong>Timestamp:</strong>{" "}
							{new Date(selectedFlight.time_position * 1000).toLocaleString()}
						</Text>
						<Text>
							<strong>Latitude:</strong> {selectedFlight.latitude}°
						</Text>
						<Text>
							<strong>Longitude:</strong> {selectedFlight.longitude}°
						</Text>
						<Text>
							<strong>Baro Altitude:</strong> {selectedFlight.baro_altitude} ft
						</Text>
						<Text>
							<strong>Geo Altitude:</strong> {selectedFlight.geo_altitude} ft
						</Text>
						<Text>
							<strong>Velocity:</strong> {selectedFlight.velocity} m/s
						</Text>
						<Text>
							<strong>Heading:</strong> {selectedFlight.heading}°
						</Text>
						<Text>
							<strong>Vertical Rate:</strong> {selectedFlight.vertical_rate} m/s
						</Text>
						<Text>
							<strong>On Ground:</strong>{" "}
							{selectedFlight.on_ground ? "Yes" : "No"}
						</Text>
						<Text>
							<strong>Squawk:</strong> {selectedFlight.squawk}
						</Text>
						<Text>
							<strong>Origin Country:</strong> {selectedFlight.origin_country}
						</Text>
						<Text>
							<strong>SPI:</strong> {selectedFlight.spi ? "Yes" : "No"}
						</Text>
					</Stack>
				)}
			</Modal>
		</Box>
	);
};
