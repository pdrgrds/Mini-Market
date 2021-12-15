import React from 'react';
import ToggleMenuWrapper from './../../Components/Template/toggleMenuWrapper';
import { item01 } from '../../Interface/dashboard';
import { Template01, ActionAreaCard } from './items';
import './index.scss';

const dataHeader:Array<item01> = [
    { id: 1, nombre: 'Producto', descripcion: 'Para crear o editar un Producto, presione aqui!', image: 'https://astelus.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg', href:"/producto" },
    { id: 2, nombre: 'modulo02', descripcion: 'pequeña descripcion para el modulo 02', image: 'https://astelus.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg', href:"" },
    { id: 3, nombre: 'modulo03', descripcion: 'pequeña descripcion para el modulo 03', image: 'https://astelus.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg', href:"" },
    { id: 4, nombre: 'modulo04', descripcion: 'pequeña descripcion para el modulo 04', image: 'https://astelus.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg', href:"" }
]

class PrivateRoutes extends React.Component<any, any>{

    render() {
        return (
            <ToggleMenuWrapper>
                <div className="container__dashboard">
                    <div className="content__header">
                        { dataHeader.map((item:item01) => <ActionAreaCard {...item}/>) }
                    </div>
                </div>
            </ToggleMenuWrapper>
        )
    }
}

export default PrivateRoutes;