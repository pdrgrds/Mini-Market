import * as ActionType from "./../../constant";

const initialState = {
    data: { }
};

const ROptions = (state = initialState, action: any) => {
    switch(action.type) {
        case ActionType.LISTA_PRODUCTOS_REDUCER_ADD: return {
            ...state,
            lista: action.payload
        }
        case ActionType.PRODUCTO_GET_REDUCER_ADD: return {
            ...state,
            data: action.payload
        }
        default: return state;
    }
}

export default ROptions;  