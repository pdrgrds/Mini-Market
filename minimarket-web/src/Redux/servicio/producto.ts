import { bd, autenticacion, Collection, Doc, SetDoc, Query, Where, GetDocs, UpdateDoc, AddDoc } from './firebase';

export const ServicioLista = async () => {
    const productoCol = Collection(bd, "Productos");
    const productoSnapshot = await GetDocs(productoCol); 
    const productoLista = productoSnapshot.docs.map((doc:any) => doc.data()); 
    return productoLista;
}

export const ServicioGet = async (codigo:string) => { 
    const q = Query(Collection(bd, "Productos"), Where("Codigo", "==", codigo));
    let data:any = {};
    const querySnapshot = await GetDocs(q);
    querySnapshot.forEach((doc:any) => {
        data.uid = doc.id;
        data = {...data, ...doc.data()};
    });

    return data;
}

export const ServicioAgregar = (data:any) => 
    AddDoc(Collection(bd, "Productos"), data)
    .then((res:any) => res)
    .catch((err:any) => err)

export const ServicioActualizar = (data:any) => 
    UpdateDoc(Doc(bd, "Productos", data.uid), data)
    .then((res:any) => res)
    .catch((err:any) => err)