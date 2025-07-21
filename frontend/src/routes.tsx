import { FlightsTable } from "@/components/flights_table";
import { HistoricalTable } from "@/components/historical_table";
import { LiveMap } from "@/components/live_map";
import { DefaultLayout } from "@/layouts/default_layout";
import {
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
	component: DefaultLayout,
});

const liveRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: LiveMap,
});

const historicalRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/historical",
	component: HistoricalTable,
});

const flightsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/flights",
	component: FlightsTable,
});

const routeTree = rootRoute.addChildren([
	liveRoute,
	historicalRoute,
	flightsRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
