import React from 'react';
import ToggleMenuWrapper from './../../Components/Template/toggleMenuWrapper';
import Table from '../../Components/Global/table';
import { MetadataListaCategoriaProducto } from './../../Constant/metadata';
import * as Actions from '../../Redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ICategoriaProveedor from './../../Interface/model/categoria';
import { withRouter } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

class ListaCategoriaProducto extends React.Component<any, any>{
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
            this.props.ALISTA_CATEGORIAPRODUCTO_CALL(null, resolve, reject)
        ).then(() => {
            const { lista } = this.props;
            this.setState({ data: lista });
        })
            .catch((err) => {
                console.log(err);
            })
    }

    onEdit = (item: ICategoriaProveedor) => {
        console.log(item.Id);
        this.props.history.push(`/Categoria-Producto/editar/${item.Id}`);
    }

    onCreate = () => {
        this.props.history.push(`/Categoria-Producto/crear`);
    }

    onDelete = (item: ICategoriaProveedor) => {
        console.log(item.Id);
    }

    render() {
        const { data } = this.state;
        return (
            <ToggleMenuWrapper>
                <div className="content__global">
                    <div className="title"> <h1>Listado Categoria Producto</h1> </div>
                    <div className="form__breadcrum">
                        <a href="/"> Dashboard </a> <p> {`>`} </p>
                        <a href="#"> Lista Categoria Producto </a>
                    </div>
                    <div className="list__functions"> <Button variant="contained" onClick={this.onCreate} > <AddIcon/> Agregar </Button> </div>
                    <div className="content__table">
                        <Table
                            datasource={data}
                            metadata={MetadataListaCategoriaProducto}
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
    lista: state.categoriaProducto.lista
})

const MapDispatchToProps = (dispatch: any) => {
    const { ALISTA_CATEGORIAPRODUCTO_CALL } = Actions;
    return bindActionCreators({
        ALISTA_CATEGORIAPRODUCTO_CALL
    }, dispatch)
}

export default connect(mapStateToProps, MapDispatchToProps)(withRouter(ListaCategoriaProducto));