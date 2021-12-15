import { all } from 'redux-saga/effects';
import * as userEffects from './effects/user/options';
import * as productoEffects from './effects/producto/index';
import * as proveedorEffects from './effects/proveedor/index';
import * as categoriaProductoEffects from './effects/categoriaProducto/index';

export function* rootSaga() {
  yield all([
    userEffects.WLogin(),
    userEffects.WRegister(),

    productoEffects.WLista(),
    productoEffects.WGet(),
    productoEffects.WGetCreate(),
    productoEffects.WCrear(),
    productoEffects.WActualizar(),

    proveedorEffects.WLista(),
    proveedorEffects.WGet(),
    proveedorEffects.WGetCreate(),
    proveedorEffects.WCrear(),
    proveedorEffects.WActualizar(),

    categoriaProductoEffects.WLista(),
    categoriaProductoEffects.WGet(),
    categoriaProductoEffects.WGetCreate(),
    categoriaProductoEffects.WCrear(),
    categoriaProductoEffects.WActualizar()
  ]);
};