import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormProducto from './../modules/Producto/form';
import ListaProducto from './../modules/Producto/list';
import Dashboard from './../modules/Dashboard';

import FormProveedor from './../modules/Proveedor/form';
import ListaProveedor from './../modules/Proveedor/list';

import FormCategoriaProducto from './../modules/Categoria-Producto/form';
import ListaCategoriaProducto from './../modules/Categoria-Producto/list';


class PrivateRoutes extends React.Component<any, any>{

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/Producto/editar/:id" component={FormProducto} />
                    <Route path="/Producto/crear" component={FormProducto} />
                    <Route path="/Producto" component={ListaProducto} />

                    <Route path="/Proveedor/editar/:id" component={FormProveedor} />
                    <Route path="/Proveedor/crear" component={FormProveedor} />
                    <Route path="/Proveedor" component={ListaProveedor} />

                    <Route path="/Categoria-Producto/editar/:id" component={FormCategoriaProducto} />
                    <Route path="/Categoria-Producto/crear" component={FormCategoriaProducto} />
                    <Route path="/Categoria-Producto" component={ListaCategoriaProducto} />

                    <Route path="/" component={Dashboard} />
                </Switch>
            </div>
        )
    }
}
export default PrivateRoutes;