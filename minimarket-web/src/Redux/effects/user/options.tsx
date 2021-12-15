import { takeLatest, call, put } from 'redux-saga/effects';
import * as ActionType from './../../constant';
import * as ServicioUser from './../../servicio/user'; 

function* ELogin(action:any):any {
    try{

        const data = (yield call(ServicioUser.ServicioLogin, action.payload));
        const { user: { accessToken } } = data;
        localStorage.setItem('token', accessToken);

        action.resolve();
    }
    catch(error){
        action.reject();
    }
}

function* ERegister(action:any):any {
    try{
        const data = (yield call(ServicioUser.ServicioRegistrar, action.payload));
        const { user: { uid } } = data;
        const registro = {uid, data: action.payload};
        delete registro.data.password;
        yield call(ServicioUser.ServicioRegistrarCollection, registro);
        action.resolve();
    }
    catch(error){
        const err:any = error;
        action.reject(err?.message);
    }
}



export function* WLogin():any { return yield takeLatest( ActionType.LOGIN_REDUCER_CALL, ELogin); }
export function* WRegister():any { return yield takeLatest( ActionType.REGISTER_REDUCER_CALL, ERegister); }