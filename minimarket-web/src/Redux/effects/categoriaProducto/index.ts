import { takeLatest, call, put } from 'redux-saga/effects';
import * as ActionType from './../../constant';
import * as Action from './../../action';
import * as ServicioCategoriaProducto from './../../servicio/categoriaProducto';

function* ELista(action:any):any {
    try{
        const data = yield call(ServicioCategoriaProducto.ServicioLista);
        yield put(Action.ALISTA_CATEGORIAPRODUCTO_ADD(data));
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EGet(action:any):any {
    try {
        const onlyOne = yield call(ServicioCategoriaProducto.ServicioGet, action.payload);
        const data = { data:onlyOne };
        yield put(Action.AGET_CATEGORIAPRODUCTO_ADD(data));
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
        yield call(ServicioCategoriaProducto.ServicioAgregar, action.payload);
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EActualizar(action:any):any {
    try{
        yield call(ServicioCategoriaProducto.ServicioActualizar, action.payload);
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

function* EEliminar(action:any):any {
    try{
        const data = yield call(ServicioCategoriaProducto.ServicioLista);
        yield put(Action.ALISTA_CATEGORIAPRODUCTO_ADD(data));
        action.resolve();
    }
    catch(error){
        action.reject(error);
    }
}

export function* WLista():any { return yield takeLatest( ActionType.LISTA_CATEGORIAPRODUCTO_REDUCER_CALL, ELista); }
export function* WGet():any { return yield takeLatest( ActionType.CATEGORIAPRODUCTO_GET_REDUCER_CALL, EGet); }
export function* WGetCreate():any { return yield takeLatest( ActionType.CATEGORIAPRODUCTO_GET_CREATE_REDUCER_CALL, EGetCreate); }
export function* WCrear():any { return yield takeLatest( ActionType.CATEGORIAPRODUCTO_CREAR_REDUCER_CALL, ECrear); }
export function* WActualizar():any { return yield takeLatest( ActionType.CATEGORIAPRODUCTO_ACTUALIZAR_REDUCER_CALL, EActualizar); }