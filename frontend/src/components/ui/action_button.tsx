import { Button } from "@mantine/core";

interface ActionButtonProps {
	onClick: () => void;
	label?: string;
	variant?: "subtle" | "light" | "filled" | "outline";
	size?: "xs" | "sm" | "md" | "lg";
}

export const ActionButton = ({
	onClick,
	label = "View Details",
	variant = "subtle",
	size = "xs",
}: ActionButtonProps) => {
	return (
		<Button variant={variant} size={size} onClick={onClick}>
			{label}
		</Button>
	);
};
