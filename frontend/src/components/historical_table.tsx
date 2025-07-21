import { useFlightHistory, useHistoricalState } from "@/hooks/useApi";
import { useTableData } from "@/hooks/useTableData";
import {
	formatAltitude,
	formatTimestamp,
	formatVelocity,
} from "@/lib/data_utils";
import type { FlightData } from "@/types/api";
import { Box, Table } from "@mantine/core";
import { useState } from "react";
import { Icao24Selector } from "./icao24_selector";
import { ActionButton } from "./ui/action_button";
import { ErrorState } from "./ui/error_state";
import { FlightDetailsModal } from "./ui/flight_details_modal";
import { LoadingState } from "./ui/loading_state";
import { SectionHeader } from "./ui/section_header";
import { TableWrapper } from "./ui/table_wrapper";

export const HistoricalTable = () => {
	const [selectedIcao24, setSelectedIcao24] = useState<string | null>(null);
	const { data, isLoading, error } = useHistoricalState(
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
	} = useTableData<FlightData>({ data, isLoading, error });

	const { data: flightHistory, isLoading: historyLoading } = useFlightHistory(
		selectedFlight?.icao24 || "",
	);

	if (isLoading) {
		return (
			<LoadingState
				title="Loading historical data..."
				subtitle="Retrieving flight records"
			/>
		);
	}

	if (error) {
		return <ErrorState message="Error loading historical data" />;
	}

	const rows = flights.map((flight: FlightData) => (
		<Table.Tr key={flight._id}>
			<Table.Td>{flight.callsign}</Table.Td>
			<Table.Td>{flight.icao24}</Table.Td>
			<Table.Td>{formatTimestamp(flight.time_position)}</Table.Td>
			<Table.Td>{formatAltitude(flight.baro_altitude)}</Table.Td>
			<Table.Td>{formatVelocity(flight.velocity)}</Table.Td>
			<Table.Td>
				<ActionButton onClick={() => setSelectedFlight(flight)} />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Box>
			<SectionHeader
				title="Historical Flight Data"
				subtitle="Browse historical flight records with pagination"
			>
				<Icao24Selector
					collection="historical_state"
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
						<Table.Th>ICAO24</Table.Th>
						<Table.Th>Timestamp</Table.Th>
						<Table.Th>Altitude</Table.Th>
						<Table.Th>Velocity</Table.Th>
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
				historyLoading={historyLoading}
			/>
		</Box>
	);
};
