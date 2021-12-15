import { ItemMetadata } from "../Interface/table"

export const MetadataListaProducto: Array<ItemMetadata> = [
    { key: 1, label: "Código", name:"Codigo" },
    { key: 2, label: "Nombre", name:"Nombre" },
    { key: 3, label: "Estado", name:"Estado" },
    { key: 4, label: "Precio", name:"Precio" },
    { key: 5, label: "Stock", name:"Stock" },
    { key: 6, label: "Categoría", name:"cod_catg" }
]

export const MetadataListaProveedor: Array<ItemMetadata> = [
    { key: 1, label: "Código", name:"codigo" },
    { key: 2, label: "Nombre", name:"nombre" },
    { key: 3, label: "Descripción", name:"descripcion" }
]

export const MetadataListaCategoriaProducto: Array<ItemMetadata> = [
    { key: 1, label: "Id", name:"Id" },
    { key: 3, label: "Descripción", name:"descripcion" }
]