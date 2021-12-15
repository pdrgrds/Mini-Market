import { takeLatest, call, put } from 'redux-saga/effects';
import * as ActionType from './../../constant';
import * as Action from './../../action';
import * as ServicioProveedor from './../../servicio/proveedor';

function* ELista(action:any):any {
    try{
        const data = yield call(ServicioProveedor.ServicioLista);
        yield put(Action.ALISTA_PROVEEDOR_ADD(data));
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EGet(action:any):any {
    try {
        const onlyOne = yield call(ServicioProveedor.ServicioGet, action.payload);
        const data = { data:onlyOne };
        yield put(Action.AGET_PROVEEDOR_ADD(data));
        action.resolve();
    } catch(err){
        console.log(err);
    }
}

function* EGetCreate(action:any):any {
    try {
        action.resolve();
    } catch(err){
        console.log(err);
    }
}

function* ECrear(action:any):any {
    try{
        yield call(ServicioProveedor.ServicioAgregar, action.payload);
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EActualizar(action:any):any {
    try{
        yield call(ServicioProveedor.ServicioActualizar, action.payload);
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EEliminar(action:any):any {
    try{
        const data = yield call(ServicioProveedor.ServicioLista);
        yield put(Action.ALISTA_PROVEEDOR_ADD(data));
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

export function* WLista():any { return yield takeLatest( ActionType.LISTA_PROVEEDOR_REDUCER_CALL, ELista); }
export function* WGet():any { return yield takeLatest( ActionType.PROVEEDOR_GET_REDUCER_CALL, EGet); }
export function* WGetCreate():any { return yield takeLatest( ActionType.PROVEEDOR_GET_CREATE_REDUCER_CALL, EGetCreate); }
export function* WCrear():any { return yield takeLatest( ActionType.PROVEEDOR_CREAR_REDUCER_CALL, ECrear); }
export function* WActualizar():any { return yield takeLatest( ActionType.PROVEEDOR_ACTUALIZAR_REDUCER_CALL, EActualizar); }