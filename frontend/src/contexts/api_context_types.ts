import { createContext } from "react";

export interface ApiContextType {
	isApiOnline: boolean;
	isChecking: boolean;
	error: Error | null;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);
