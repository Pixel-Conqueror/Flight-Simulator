import { Text } from "@mantine/core";

interface ErrorStateProps {
	message?: string;
}

export const ErrorState = ({
	message = "An error occurred",
}: ErrorStateProps) => {
	return <Text c="red">{message}</Text>;
};
