import React from 'react';
import ToggleMenuWrapper from './../../Components/Template/toggleMenuWrapper';
import Table from '../../Components/Global/table';
import { MetadataListaProveedor } from './../../Constant/metadata';
import * as Actions from '../../Redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IProveedor from './../../Interface/model/proveedor';
import { withRouter } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

class ListaProveedor extends React.Component<any, any>{
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
            this.props.ALISTA_PROVEEDOR_CALL(null, resolve, reject)
        ).then(() => {
            const { lista } = this.props;
            this.setState({ data: lista });
        })
            .catch((err) => {
                console.log(err);
            })
    }

    onEdit = (item: IProveedor) => {
        console.log(item.codigo);
        this.props.history.push(`/Proveedor/editar/${item.codigo}`);
    }

    onCreate = () => {
        this.props.history.push(`/Proveedor/crear`);
    }

    onDelete = (item: IProveedor) => {
        console.log(item.codigo);
    }

    render() {
        const { data } = this.state;
        return (
            <ToggleMenuWrapper>
                <div className="content__global">
                    <div className="title"> <h1>Listado Proveedor</h1> </div>
                    <div className="form__breadcrum">
                        <a href="/"> Dashboard </a> <p> {`>`} </p>
                        <a href="#"> Lista Proveedor </a>
                    </div>
                    <div className="list__functions"> <Button variant="contained" onClick={this.onCreate} > <AddIcon/> Agregar </Button> </div>
                    <div className="content__table">
                        <Table
                            datasource={data}
                            metadata={MetadataListaProveedor}
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
    lista: state.proveedor.lista
})

const MapDispatchToProps = (dispatch: any) => {
    const { ALISTA_PROVEEDOR_CALL } = Actions;
    return bindActionCreators({
        ALISTA_PROVEEDOR_CALL
    }, dispatch)
}

export default connect(mapStateToProps, MapDispatchToProps)(withRouter(ListaProveedor));