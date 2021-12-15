import { bd, autenticacion, Collection, Doc, SetDoc, Query, Where, GetDocs, UpdateDoc, AddDoc } from './firebase';

export const ServicioLista = async () => {
    const categoriaProductoCol = Collection(bd, "CategoriaProductos");
    const categoriaProductoSnapshot = await GetDocs(categoriaProductoCol);
    const categoriaProductoLista = categoriaProductoSnapshot.docs.map((doc:any) => doc.data());
    return categoriaProductoLista;
}

export const ServicioGet = async (Id:number) => { 
    const q = Query(Collection(bd, "CategoriaProductos"), Where("Id", "==", Id));
    let data:any = {};
    const querySnapshot = await GetDocs(q);
    querySnapshot.forEach((doc:any) => {
        data.uid = doc.id;
        data = {...data, ...doc.data()};
    });

    return data;
}

export const ServicioAgregar = (data:any) => 
    AddDoc(Collection(bd, "CategoriaProductos"), data)
    .then((res:any) => res)
    .catch((err:any) => err)

export const ServicioActualizar = (data:any) => 
    UpdateDoc(Doc(bd, "CategoriaProductos", data.uid), data)
    .then((res:any) => res)
    .catch((err:any) => err)