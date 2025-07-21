import { Box, Group, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";

interface SectionHeaderProps {
	title: string;
	subtitle: string;
	children?: ReactNode;
}

export const SectionHeader = ({
	title,
	subtitle,
	children,
}: SectionHeaderProps) => {
	return (
		<Group justify="space-between" align="flex-end" mb="lg">
			<Box>
				<Title order={2}>{title}</Title>
				<Text c="dimmed" size="sm">
					{subtitle}
				</Text>
			</Box>
			{children}
		</Group>
	);
};
