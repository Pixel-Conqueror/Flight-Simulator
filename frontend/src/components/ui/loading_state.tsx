import { Box, Loader, Stack, Text } from "@mantine/core";

interface LoadingStateProps {
	title?: string;
	subtitle?: string;
	size?: "sm" | "md" | "lg";
}

export const LoadingState = ({
	title = "Loading...",
	subtitle = "Please wait",
	size = "lg",
}: LoadingStateProps) => {
	return (
		<Box ta="center" py="xl">
			<Stack gap="md" align="center">
				<Loader size={size} />
				<Text size="lg" fw={500}>
					{title}
				</Text>
				<Text size="sm" c="dimmed">
					{subtitle}
				</Text>
			</Stack>
		</Box>
	);
};
