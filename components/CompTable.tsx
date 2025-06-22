import React, { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    TableSortLabel,
} from "@mui/material";

type SortDirection = "asc" | "desc";

interface Column<T> {
    key: keyof T;
    label: string;
}

interface CustomTableProps<T> {
    columns: Column<T>[];
    data: T[];
    showPagination?: boolean;
    enableSorting?: boolean;
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
}

function CompTable<T>({
    columns,
    data,
    showPagination = false,
    enableSorting = false,
    rowsPerPageOptions = [5, 10, 25],
    defaultRowsPerPage = 5,
}: CustomTableProps<T>) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T | null;
        direction: SortDirection;
    }>({ key: null, direction: "asc" });

    const handleSort = (key: keyof T) => {
        const isAsc = sortConfig.key === key && sortConfig.direction === "asc";
        setSortConfig({ key, direction: isAsc ? "desc" : "asc" });
    };

    const sortedData = useMemo(() => {
        if (!enableSorting || !sortConfig.key) return data;
        return [...data].sort((a, b) => {
            const valA = a[sortConfig.key!];
            const valB = b[sortConfig.key!];
            if (typeof valA === "string" && typeof valB === "string") {
                return sortConfig.direction === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }
            if (typeof valA === "number" && typeof valB === "number") {
                return sortConfig.direction === "asc" ? valA - valB : valB - valA;
            }
            return 0;
        });
    }, [data, enableSorting, sortConfig]);

    const paginatedData = showPagination
        ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : sortedData;

    return (
        <Paper className="overflow-x-auto">
            <TableContainer>
                <Table>
                    <TableHead className="bg-gray-100 border">
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.key as string} align="center">
                                    {enableSorting ? (
                                        <TableSortLabel
                                            active={sortConfig.key === col.key}
                                            direction={sortConfig.direction}
                                            onClick={() => handleSort(col.key)}
                                        >
                                            {col.label}
                                        </TableSortLabel>
                                    ) : (
                                        <p className="text-base font-semibold">{col.label}</p>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col) => (
                                    <TableCell key={col.key as string} align="center">
                                        {row[col.key] as React.ReactNode}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {showPagination && (
                <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />
            )}
        </Paper>
    );
}

export default CompTable;