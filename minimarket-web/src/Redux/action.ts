import * as Type from './constant';

export const AUSER_LOGIN_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.LOGIN_REDUCER_CALL, payload, resolve, reject});
export const AUSER_REGISTER_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.REGISTER_REDUCER_CALL, payload, resolve, reject});
export const ARegistrarSession = (values:any) => ({type:Type.REGISTER_SESSION_CALL, payload:values})
export const ACerrarSession = () => ({type:Type.CLOSE_SESSION_CALL})


export const ALISTA_PRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.LISTA_PRODUCTOS_REDUCER_CALL, payload, resolve, reject});
export const ALISTA_PRODUCTO_ADD = (payload:object) => ({type: Type.LISTA_PRODUCTOS_REDUCER_ADD, payload});

export const AGET_PRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PRODUCTO_GET_REDUCER_CALL, payload, resolve, reject});
export const AGET_CREATE_PRODUCTO_CALL = (resolve:Function, reject:Function) => ({type: Type.PRODUCTO_GET_CREATE_REDUCER_CALL, resolve, reject});
export const AGET_PRODUCTO_ADD = (payload:object) => ({type: Type.PRODUCTO_GET_REDUCER_ADD, payload});

export const AACTUALIZAR_PRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PRODUCTO_ACTUALIZAR_REDUCER_CALL, payload, resolve, reject});
export const ACREAR_PRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PRODUCTO_CREAR_REDUCER_CALL, payload, resolve, reject});
export const AELIMINAR_PRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PRODUCTO_ELIMINAR_REDUCER_CALL, payload, resolve, reject});



export const ALISTA_PROVEEDOR_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.LISTA_PROVEEDOR_REDUCER_CALL, payload, resolve, reject});
export const ALISTA_PROVEEDOR_ADD = (payload:object) => ({type: Type.LISTA_PROVEEDOR_REDUCER_ADD, payload});

export const AGET_PROVEEDOR_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PROVEEDOR_GET_REDUCER_CALL, payload, resolve, reject});
export const AGET_CREATE_PROVEEDOR_CALL = (resolve:Function, reject:Function) => ({type: Type.PROVEEDOR_GET_CREATE_REDUCER_CALL, resolve, reject});
export const AGET_PROVEEDOR_ADD = (payload:object) => ({type: Type.PROVEEDOR_GET_REDUCER_ADD, payload});

export const AACTUALIZAR_PROVEEDOR_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PROVEEDOR_ACTUALIZAR_REDUCER_CALL, payload, resolve, reject});
export const ACREAR_PROVEEDOR_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PROVEEDOR_CREAR_REDUCER_CALL, payload, resolve, reject});
export const AELIMINAR_PROVEEDOR_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.PROVEEDOR_ELIMINAR_REDUCER_CALL, payload, resolve, reject});



export const ALISTA_CATEGORIAPRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.LISTA_CATEGORIAPRODUCTO_REDUCER_CALL, payload, resolve, reject});
export const ALISTA_CATEGORIAPRODUCTO_ADD = (payload:object) => ({type: Type.LISTA_CATEGORIAPRODUCTO_REDUCER_ADD, payload});

export const AGET_CATEGORIAPRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.CATEGORIAPRODUCTO_GET_REDUCER_CALL, payload, resolve, reject});
export const AGET_CREATE_CATEGORIAPRODUCTO_CALL = (resolve:Function, reject:Function) => ({type: Type.CATEGORIAPRODUCTO_GET_CREATE_REDUCER_CALL, resolve, reject});
export const AGET_CATEGORIAPRODUCTO_ADD = (payload:object) => ({type: Type.CATEGORIAPRODUCTO_GET_REDUCER_ADD, payload});

export const AACTUALIZAR_CATEGORIAPRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.CATEGORIAPRODUCTO_ACTUALIZAR_REDUCER_CALL, payload, resolve, reject});
export const ACREAR_CATEGORIAPRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.CATEGORIAPRODUCTO_CREAR_REDUCER_CALL, payload, resolve, reject});
export const AELIMINAR_CATEGORIAPRODUCTO_CALL = (payload:object, resolve:Function, reject:Function) => ({type: Type.CATEGORIAPRODUCTO_ELIMINAR_REDUCER_CALL, payload, resolve, reject});
