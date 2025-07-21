import {
	formatAltitude,
	formatBoolean,
	formatDate,
	formatHeading,
	formatLatitude,
	formatLongitude,
	formatTimestamp,
	formatVelocity,
} from "@/lib/data_utils";
import type { FlightData, FlightMeta } from "@/types/api";
import { Modal, Stack, Text } from "@mantine/core";
import { Tabs } from "../generics/tabs/tabs";
import { ModalMap } from "../modal_map";

interface FlightDetailsModalProps {
	opened: boolean;
	onClose: () => void;
	flight: FlightData | FlightMeta | null;
	flightHistory?: FlightData[];
	historyLoading?: boolean;
}

export const FlightDetailsModal = ({
	opened,
	onClose,
	flight,
	flightHistory = [],
	historyLoading = false,
}: FlightDetailsModalProps) => {
	if (!flight) return null;

	const isFlightData = "icao24" in flight;
	const flightData = isFlightData ? (flight as FlightData) : null;
	const flightMeta = !isFlightData ? (flight as FlightMeta) : null;

	const tabs = [
		{
			value: "details",
			label: "Details",
			content: (
				<Stack gap="sm">
					{flightData ? (
						// FlightData details
						<>
							<Text>
								<strong>Callsign:</strong> {flightData.callsign}
							</Text>
							<Text>
								<strong>ICAO24:</strong> {flightData.icao24}
							</Text>
							<Text>
								<strong>Timestamp:</strong>{" "}
								{formatTimestamp(flightData.time_position)}
							</Text>
							<Text>
								<strong>Latitude:</strong> {formatLatitude(flightData.latitude)}
							</Text>
							<Text>
								<strong>Longitude:</strong>{" "}
								{formatLongitude(flightData.longitude)}
							</Text>
							<Text>
								<strong>Baro Altitude:</strong>{" "}
								{formatAltitude(flightData.baro_altitude)}
							</Text>
							<Text>
								<strong>Geo Altitude:</strong>{" "}
								{formatAltitude(flightData.geo_altitude)}
							</Text>
							<Text>
								<strong>Velocity:</strong> {formatVelocity(flightData.velocity)}
							</Text>
							<Text>
								<strong>Heading:</strong> {formatHeading(flightData.heading)}
							</Text>
							<Text>
								<strong>Vertical Rate:</strong>{" "}
								{formatVelocity(flightData.vertical_rate)}
							</Text>
							<Text>
								<strong>On Ground:</strong>{" "}
								{formatBoolean(flightData.on_ground)}
							</Text>
							<Text>
								<strong>Squawk:</strong> {flightData.squawk}
							</Text>
							<Text>
								<strong>Origin Country:</strong> {flightData.origin_country}
							</Text>
							<Text>
								<strong>SPI:</strong> {formatBoolean(flightData.spi)}
							</Text>
						</>
					) : (
						// FlightMeta details
						<>
							<Text>
								<strong>Flight ID:</strong> {flightMeta!._id}
							</Text>
							<Text>
								<strong>Last Known Callsign:</strong>{" "}
								{flightMeta!.last_known_callsign}
							</Text>
							<Text>
								<strong>All Callsigns:</strong>{" "}
								{flightMeta!.callsigns.join(", ")}
							</Text>
							<Text>
								<strong>First Seen:</strong>{" "}
								{formatTimestamp(flightMeta!.first_seen)}
							</Text>
							<Text>
								<strong>Last Seen:</strong> {formatDate(flightMeta!.last_seen)}
							</Text>
							<Text>
								<strong>Origin Country:</strong> {flightMeta!.origin_country}
							</Text>
						</>
					)}
				</Stack>
			),
		},
		...(flightData
			? [
					{
						value: "position",
						label: "Current Position",
						content: <ModalMap flights={[flightData]} height={400} />,
					},
				]
			: []),
		{
			value: "trajectory",
			label: "Trajectory",
			content: historyLoading ? (
				<Stack gap="md" align="center" py="xl">
					<Text>Loading complete trajectory...</Text>
				</Stack>
			) : flightHistory && flightHistory.length > 0 ? (
				<Stack gap="md">
					<Text size="sm" c="dimmed">
						Trajectory of{" "}
						{isFlightData
							? flightData!.callsign
							: flightMeta!.last_known_callsign}{" "}
						({flightHistory.length} positions)
					</Text>
					<ModalMap flights={flightHistory} height={400} showMarkers />
				</Stack>
			) : (
				<Stack gap="md" align="center" py="xl">
					<Text c="dimmed">No trajectory available for this aircraft</Text>
				</Stack>
			),
		},
	];

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={isFlightData ? "Flight Details" : "Flight Metadata Details"}
			size="xl"
		>
			<Stack gap="lg">
				<Tabs tabs={tabs} />
			</Stack>
		</Modal>
	);
};
