import * as ActionType from "./../../constant";

const reducerSesion = (state={}, action:any) => {
    switch(action.type){
        case ActionType.REGISTER_SESSION_CALL: return action.payload;
        case ActionType.CLOSE_SESSION_CALL: return null;
        default: return  state;
    }
}

export default reducerSesion;  