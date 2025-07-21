import { ApiContext } from "@/contexts/api_context_types";
import { useContext } from "react";

export const useApiStatus = () => {
	const context = useContext(ApiContext);
	if (context === undefined) {
		throw new Error("useApiStatus must be used within an ApiProvider");
	}
	return context;
};
