import { useFlightHistory, useFlightsMeta } from "@/hooks/useApi";
import { useTableData } from "@/hooks/useTableData";
import { formatDate, formatTimestamp } from "@/lib/data_utils";
import type { FlightMeta } from "@/types/api";
import { Box, Table } from "@mantine/core";
import { useState } from "react";
import { Icao24Selector } from "./icao24_selector";
import { ActionButton } from "./ui/action_button";
import { ErrorState } from "./ui/error_state";
import { FlightDetailsModal } from "./ui/flight_details_modal";
import { LoadingState } from "./ui/loading_state";
import { SectionHeader } from "./ui/section_header";
import { TableWrapper } from "./ui/table_wrapper";

export const FlightsTable = () => {
	const [selectedIcao24, setSelectedIcao24] = useState<string | null>(null);
	const { data, isLoading, error } = useFlightsMeta(
		selectedIcao24 || undefined,
		1,
	);

	const {
		page,
		setPage,
		selectedItem: selectedFlight,
		setSelectedItem: setSelectedFlight,
		data: flights,
		totalPages,
	} = useTableData<FlightMeta>({ data, isLoading, error });

	const { data: flightHistory } = useFlightHistory(selectedFlight?._id || "");

	if (isLoading) {
		return (
			<LoadingState
				title="Loading flight metadata..."
				subtitle="Retrieving flight information"
			/>
		);
	}

	if (error) {
		return <ErrorState message="Error loading flights metadata" />;
	}

	const rows = flights.map((flight: FlightMeta) => (
		<Table.Tr key={flight._id}>
			<Table.Td>{flight.last_known_callsign}</Table.Td>
			<Table.Td>{flight._id}</Table.Td>
			<Table.Td>{formatTimestamp(flight.first_seen)}</Table.Td>
			<Table.Td>{formatDate(flight.last_seen)}</Table.Td>
			<Table.Td>{flight.origin_country}</Table.Td>
			<Table.Td>{flight.callsigns.join(", ")}</Table.Td>
			<Table.Td>
				<ActionButton onClick={() => setSelectedFlight(flight)} />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Box>
			<SectionHeader
				title="Flights Metadata"
				subtitle="Flight metadata with departure and arrival information"
			>
				<Icao24Selector
					collection="flights_meta"
					value={selectedIcao24}
					onChange={setSelectedIcao24}
					placeholder="Filter by ICAO24"
					label="Filter by aircraft"
				/>
			</SectionHeader>

			<TableWrapper
				totalPages={totalPages}
				currentPage={page}
				onPageChange={setPage}
			>
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
			</TableWrapper>

			<FlightDetailsModal
				opened={!!selectedFlight}
				onClose={() => setSelectedFlight(null)}
				flight={selectedFlight}
				flightHistory={flightHistory}
			/>
		</Box>
	);
};
