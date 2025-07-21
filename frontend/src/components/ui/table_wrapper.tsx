import { Center, Pagination, Table } from "@mantine/core";
import type { ReactNode } from "react";

interface TableWrapperProps {
	children: ReactNode;
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export const TableWrapper = ({
	children,
	totalPages,
	currentPage,
	onPageChange,
}: TableWrapperProps) => {
	return (
		<>
			<Table>{children}</Table>
			<Center mt="md">
				<Pagination
					total={totalPages}
					value={currentPage}
					onChange={onPageChange}
				/>
			</Center>
		</>
	);
};
