import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "./contexts/api_context";
import { router } from "./routes";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<MantineProvider>
			<ApiProvider>
				<RouterProvider router={router} />
			</ApiProvider>
		</MantineProvider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>,
);
