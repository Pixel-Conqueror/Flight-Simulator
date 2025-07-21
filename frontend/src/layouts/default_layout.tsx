import { HealthBadge } from "@/components/health_badge";
import {
	AppShell,
	Button,
	Container,
	Group,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { TbHistory, TbMap, TbPlane } from "react-icons/tb";

export function DefaultLayout() {
	const location = useLocation();
	const currentPath = location.pathname;

	const navItems = [
		{ path: "/", label: "Live Map", icon: TbMap },
		{ path: "/historical", label: "Historical Data", icon: TbHistory },
		{ path: "/flights", label: "Flights Metadata", icon: TbPlane },
	];

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 250, breakpoint: "sm" }}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" justify="space-between" px="md">
					<Title order={1} size="h3">
						Flight Simulator Dashboard
					</Title>
					<Group>
						<HealthBadge />
						<Text size="sm" c="dimmed">
							Real-time flight tracking system
						</Text>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">
				<AppShell.Section>
					<Text size="lg" fw={600} mb="lg">
						Navigation
					</Text>
				</AppShell.Section>

				<AppShell.Section grow>
					<Stack gap="xs">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = currentPath === item.path;

							return (
								<Button
									key={item.path}
									component={Link}
									to={item.path}
									variant={isActive ? "filled" : "subtle"}
									leftSection={<Icon size={16} />}
									fullWidth
									justify="flex-start"
									size="md"
								>
									{item.label}
								</Button>
							);
						})}
					</Stack>
				</AppShell.Section>

				<AppShell.Section>
					<Text size="xs" c="dimmed" ta="center">
						Flight Simulator v1.0
					</Text>
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main>
				<Container size="xl">
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
