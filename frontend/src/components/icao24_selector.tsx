import { useStateList } from "@/hooks/useApi";
import { Group, Select, Text } from "@mantine/core";

interface Icao24SelectorProps {
	collection: string;
	value: string | null;
	onChange: (value: string | null) => void;
	placeholder?: string;
	label?: string;
}

export const Icao24Selector = ({
	collection,
	value,
	onChange,
	placeholder = "Select an ICAO24",
	label = "ICAO24",
}: Icao24SelectorProps) => {
	const { data: icao24List, isLoading, error } = useStateList(collection);

	const options =
		icao24List?.map((icao24) => ({
			value: icao24,
			label: icao24,
		})) || [];

	return (
		<Group>
			<Select
				label={label}
				placeholder={placeholder}
				data={options}
				value={value}
				onChange={onChange}
				searchable
				clearable
				error={error ? "Error loading data" : undefined}
				style={{ minWidth: 200 }}
				disabled={isLoading}
			/>
			{value && (
				<Text size="sm" c="dimmed" mt={28}>
					Filtered by: {value}
				</Text>
			)}
		</Group>
	);
};
