import { TableSelectionMode } from "../types/table.selection-mode";

export interface TableConfig {
    lazy: boolean;
    paginator: boolean;
    rows: number;
    selectionMode: TableSelectionMode;
    dataKey: string;
}