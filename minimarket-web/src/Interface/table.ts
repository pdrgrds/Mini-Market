export interface ItemMetadata {
    key: number,
    label: string,
    name: string
}

export interface ItemDataSource {
    key: number,
    value: string | number | null,
    function: Function | null
}

export interface ITable {
    metadata: Array<ItemMetadata>,
    datasource: Array<any>,
    onCreate: Function,
    onDelete: Function,
    onEdit: Function
}