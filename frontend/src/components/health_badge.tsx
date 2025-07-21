import { useHealthCheck } from "@/hooks/useApi";
import { Badge } from "@mantine/core";
import { TbWifi, TbWifiOff } from "react-icons/tb";

export const HealthBadge = () => {
	const { isLoading, error } = useHealthCheck();

	if (isLoading) {
		return (
			<Badge variant="light" color="yellow" leftSection={<TbWifi size={12} />}>
				Checking...
			</Badge>
		);
	}

	if (error) {
		return (
			<Badge variant="light" color="red" leftSection={<TbWifiOff size={12} />}>
				Offline
			</Badge>
		);
	}

	return (
		<Badge variant="light" color="green" leftSection={<TbWifi size={12} />}>
			Online
		</Badge>
	);
};
