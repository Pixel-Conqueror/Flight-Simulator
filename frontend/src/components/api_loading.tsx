import { useApiStatus } from "@/hooks/useApiStatus";
import { Alert, Box, Loader, Stack, Text } from "@mantine/core";
import { TbWifiOff } from "react-icons/tb";

interface ApiLoadingProps {
	children: React.ReactNode;
}

export const ApiLoading = ({ children }: ApiLoadingProps) => {
	const { isApiOnline, isChecking, error } = useApiStatus();

	if (isChecking) {
		return (
			<Box ta="center" py="xl">
				<Stack gap="md" align="center">
					<Loader size="lg" />
					<Text size="lg" fw={500}>
						Checking API connection...
					</Text>
					<Text size="sm" c="dimmed">
						Attempting to connect to http://localhost:8000
					</Text>
				</Stack>
			</Box>
		);
	}

	if (!isApiOnline) {
		return (
			<Box ta="center" py="xl">
				<Stack gap="md" align="center">
					<TbWifiOff size={48} color="red" />
					<Text size="lg" fw={500} c="red">
						API Offline
					</Text>
					<Alert
						icon={<TbWifiOff size={16} />}
						title="Unable to connect to API"
						color="red"
						variant="light"
						style={{ maxWidth: 400 }}
					>
						<Text size="sm">
							The application cannot connect to the API at
							http://localhost:8000. Please check that the backend server is
							running.
						</Text>
						{error && (
							<Text size="xs" c="dimmed" mt="xs">
								Error: {error.message}
							</Text>
						)}
					</Alert>
				</Stack>
			</Box>
		);
	}

	return <>{children}</>;
};
