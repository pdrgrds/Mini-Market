import { takeLatest, call, put } from 'redux-saga/effects';
import * as ActionType from './../../constant';
import * as Action from './../../action';
import * as ServicioProducto from './../../servicio/producto'; 
import * as ServicioCategoriaProducto from './../../servicio/categoriaProducto'; 
import * as ServicioProveedor from './../../servicio/proveedor';

function* ELista(action:any):any {
    try{
        const data = yield call(ServicioProducto.ServicioLista);
        yield put(Action.ALISTA_PRODUCTO_ADD(data));
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EGet(action:any):any {
    try {
        const onlyOne = yield call(ServicioProducto.ServicioGet, action.payload);
        const categoria = yield call(ServicioCategoriaProducto.ServicioLista);
        const proveedor = yield call(ServicioProveedor.ServicioLista);
        const data = {
            data:onlyOne,
            categoria,
            proveedor
        };
        yield put(Action.AGET_PRODUCTO_ADD(data));
        action.resolve();
    } catch(err){
        console.log(err);
    }
}

function* EGetCreate(action:any):any {
    try {
        const categoria = yield call(ServicioCategoriaProducto.ServicioLista);
        const proveedor = yield call(ServicioProveedor.ServicioLista);
        const data = {
            categoria,
            proveedor
        };
        yield put(Action.AGET_PRODUCTO_ADD(data));
        action.resolve();
    } catch(err){
        console.log(err);
    }
}

function* ECrear(action:any):any {
    try{
        yield call(ServicioProducto.ServicioAgregar, action.payload);
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EActualizar(action:any):any {
    try{
        yield call(ServicioProducto.ServicioActualizar, action.payload);
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EEliminar(action:any):any {
    try{
        const data = yield call(ServicioProducto.ServicioLista);
        yield put(Action.ALISTA_PRODUCTO_ADD(data));
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

export function* WLista():any { return yield takeLatest( ActionType.LISTA_PRODUCTOS_REDUCER_CALL, ELista); }
export function* WGet():any { return yield takeLatest( ActionType.PRODUCTO_GET_REDUCER_CALL, EGet); }
export function* WGetCreate():any { return yield takeLatest( ActionType.PRODUCTO_GET_CREATE_REDUCER_CALL, EGetCreate); }
export function* WCrear():any { return yield takeLatest( ActionType.PRODUCTO_CREAR_REDUCER_CALL, ECrear); }
export function* WActualizar():any { return yield takeLatest( ActionType.PRODUCTO_ACTUALIZAR_REDUCER_CALL, EActualizar); }