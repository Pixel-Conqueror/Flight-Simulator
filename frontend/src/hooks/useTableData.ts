import { normalizeData } from "@/lib/data_utils";
import { useState } from "react";

interface UseTableDataProps<T> {
	data: T | T[] | null | undefined;
	isLoading: boolean;
	error: unknown;
}

export const useTableData = <T>({
	data,
	isLoading,
	error,
}: UseTableDataProps<T>) => {
	const [page, setPage] = useState(1);
	const [selectedItem, setSelectedItem] = useState<T | null>(null);

	const normalizedData = normalizeData(data);
	const totalPages = 10; // TODO: Récupérer depuis l'API

	return {
		page,
		setPage,
		selectedItem,
		setSelectedItem,
		data: normalizedData,
		isLoading,
		error,
		totalPages,
	};
};
