import { useFlightsMeta } from "@/hooks/useApi";
import type { FlightMeta } from "@/types/api";
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

export const FlightsTable = () => {
	const [page, setPage] = useState(1);
	const [selectedFlight, setSelectedFlight] = useState<FlightMeta | null>(null);
	const { data, isLoading, error } = useFlightsMeta(undefined, page);

	if (isLoading) {
		return <Text>Loading flights metadata...</Text>;
	}

	if (error) {
		return <Text c="red">Error loading flights metadata</Text>;
	}

	const flights = data || [];
	const totalPages = 10; // TODO: Implement proper pagination when API supports it

	const rows = flights.map((flight: FlightMeta) => (
		<Table.Tr key={flight._id}>
			<Table.Td>{flight.last_known_callsign}</Table.Td>
			<Table.Td>{flight._id}</Table.Td>
			<Table.Td>{new Date(flight.first_seen * 1000).toLocaleString()}</Table.Td>
			<Table.Td>{new Date(flight.last_seen).toLocaleString()}</Table.Td>
			<Table.Td>{flight.origin_country}</Table.Td>
			<Table.Td>{flight.callsigns.join(", ")}</Table.Td>
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
				Flights Metadata
			</Title>
			<Text c="dimmed" size="sm" mb="lg">
				Flight metadata with departure and arrival information
			</Text>

			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Callsign</Table.Th>
						<Table.Th>Flight ID</Table.Th>
						<Table.Th>First Seen</Table.Th>
						<Table.Th>Last Seen</Table.Th>
						<Table.Th>Country</Table.Th>
						<Table.Th>All Callsigns</Table.Th>
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
				title="Flight Metadata Details"
				size="md"
			>
				{selectedFlight && (
					<Stack gap="sm">
						<Text>
							<strong>Flight ID:</strong> {selectedFlight._id}
						</Text>
						<Text>
							<strong>Last Known Callsign:</strong>{" "}
							{selectedFlight.last_known_callsign}
						</Text>
						<Text>
							<strong>All Callsigns:</strong>{" "}
							{selectedFlight.callsigns.join(", ")}
						</Text>
						<Text>
							<strong>First Seen:</strong>{" "}
							{new Date(selectedFlight.first_seen * 1000).toLocaleString()}
						</Text>
						<Text>
							<strong>Last Seen:</strong>{" "}
							{new Date(selectedFlight.last_seen).toLocaleString()}
						</Text>
						<Text>
							<strong>Origin Country:</strong> {selectedFlight.origin_country}
						</Text>
					</Stack>
				)}
			</Modal>
		</Box>
	);
};
