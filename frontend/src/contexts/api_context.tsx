import { useHealthCheck } from "@/hooks/useApi";
import type { ReactNode } from "react";
import { ApiContext, type ApiContextType } from "./api_context_types";

interface ApiProviderProps {
	children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
	const { data, isLoading, error } = useHealthCheck();

	const value: ApiContextType = {
		isApiOnline: !isLoading && !error && data !== undefined,
		isChecking: isLoading,
		error: error as Error | null,
	};

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
