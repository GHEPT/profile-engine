export type TableAlignment =
    | "left"
    | "center"
    | "right";

export interface TableColumn {
    header: string;

    align?: TableAlignment;

    width?: string;
}

export interface TableRow {
    cells: Array<string | number | boolean | null | undefined>;
}

export interface TableProps {
    columns: TableColumn[];

    rows: TableRow[];
}

export class Table {
    constructor(
        private readonly props: TableProps
    ) { }

    render(): string {
        this.validate();

        const lines: string[] = [];

        lines.push(this.renderHeader());
        lines.push(this.renderSeparator());

        for (const row of this.props.rows) {
            lines.push(this.renderRow(row));
        }

        return lines.join("\n");
    }

    private renderHeader(): string {
        const headers = this.props.columns.map((column) =>
            this.escape(column.header)
        );

        return `| ${headers.join(" | ")} |`;
    }

    private renderSeparator(): string {
        const separators = this.props.columns.map((column) => {
            switch (column.align) {
                case "center":
                    return ":---:";

                case "right":
                    return "---:";

                default:
                    return ":---";
            }
        });

        return `| ${separators.join(" | ")} |`;
    }

    private renderRow(
        row: TableRow
    ): string {
        if (row.cells.length !== this.props.columns.length) {
            throw new Error(
                "Table row does not match column count."
            );
        }

        const values = row.cells.map((cell) =>
            this.escape(this.toString(cell))
        );

        return `| ${values.join(" | ")} |`;
    }

    private validate(): void {
        if (this.props.columns.length === 0) {
            throw new Error(
                "Table must contain at least one column."
            );
        }

        for (const column of this.props.columns) {
            if (!column.header.trim()) {
                throw new Error(
                    "Table column header cannot be empty."
                );
            }
        }
    }

    private toString(
        value: TableRow["cells"][number]
    ): string {
        if (value === null || value === undefined) {
            return "";
        }

        return String(value);
    }

    private escape(
        value: string
    ): string {
        return value
            .replace(/\|/g, "\\|")
            .replace(/\r\n/g, " ")
            .replace(/\r/g, " ")
            .replace(/\n/g, " ")
            .trim();
    }
}