import { combineReducers } from 'redux';
import user from './user';
import producto from './producto';
import proveedor from './proveedor';
import categoriaProducto from './categoriaProducto';

const appReducer = combineReducers({
    user,
    producto,
    proveedor,
    categoriaProducto
});

export default appReducer;