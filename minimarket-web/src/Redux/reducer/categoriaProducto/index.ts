import * as ActionType from "./../../constant";

const initialState = {
    data: { }
};

const RCategoriaProducto = (state = initialState, action: any) => {
    switch(action.type) {
        case ActionType.LISTA_CATEGORIAPRODUCTO_REDUCER_ADD: return {
            ...state,
            lista: action.payload
        }
        case ActionType.CATEGORIAPRODUCTO_GET_REDUCER_ADD: return {
            ...state,
            data: action.payload
        }
        default: return state;
    }
}

export default RCategoriaProducto;  