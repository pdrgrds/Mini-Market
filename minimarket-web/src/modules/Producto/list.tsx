import React from 'react';
import ToggleMenuWrapper from './../../Components/Template/toggleMenuWrapper';
import Table from '../../Components/Global/table';
import { MetadataListaProducto } from './../../Constant/metadata';
import * as Actions from '../../Redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IProducto } from './../../Interface/model/producto';
import { withRouter } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

class ListaProducto extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.onInit();
    }

    onInit = () => {
        new Promise((resolve: Function, reject: Function) =>
            this.props.ALISTA_PRODUCTO_CALL(null, resolve, reject)
        ).then(() => {
            const { lista } = this.props;
            this.setState({ data: lista });
        })
            .catch((err) => {
                console.log(err);
            })
    }

    onEdit = (item: IProducto) => {
        console.log(item.Codigo);
        this.props.history.push(`/Producto/editar/${item.Codigo}`);
    }

    onCreate = () => {
        this.props.history.push(`/Producto/crear`);
    }

    onDelete = (item: IProducto) => {
        console.log(item.Codigo);
    }

    render() {
        const { data } = this.state;
        return (
            <ToggleMenuWrapper>
                <div className="content__global">
                    <div className="title"> <h1>Listado Productos</h1> </div>
                    <div className="form__breadcrum">
                        <a href="/"> Dashboard </a> <p> {`>`} </p>
                        <a href="#"> Lista Productos </a>
                    </div>
                    <div className="list__functions"> <Button variant="contained" onClick={this.onCreate} > <AddIcon/> Agregar </Button> </div>
                    <div className="content__table">
                        <Table
                            datasource={data}
                            metadata={MetadataListaProducto}
                            onCreate={this.onCreate}
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}
                            key={1}
                        />
                    </div>
                </div>
            </ToggleMenuWrapper>
        )
    }
}

const mapStateToProps = (state: any) => ({
    lista: state.producto.lista
})

const MapDispatchToProps = (dispatch: any) => {
    const { ALISTA_PRODUCTO_CALL } = Actions;
    return bindActionCreators({
        ALISTA_PRODUCTO_CALL
    }, dispatch)
}

export default connect(mapStateToProps, MapDispatchToProps)(withRouter(ListaProducto));