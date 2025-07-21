import { useState } from "react";

export const useIcao24Filter = () => {
	const [selectedIcao24, setSelectedIcao24] = useState<string | null>(null);

	const clearFilter = () => setSelectedIcao24(null);

	return {
		selectedIcao24,
		setSelectedIcao24,
		clearFilter,
	};
};
