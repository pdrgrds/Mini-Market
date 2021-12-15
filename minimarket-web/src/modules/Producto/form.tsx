import React from 'react';
import ToggleMenuWrapper from './../../Components/Template/toggleMenuWrapper';
import * as Actions from '../../Redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { IProducto } from './../../Interface/model/producto';
import IProveedor from './../../Interface/model/proveedor';
import ICategoria from './../../Interface/model/categoria';
import Loading from '../../Components/Global/loading';
import './../../assets/styles/form.scss';

class ListaProducto extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            data: {
                Codigo: '',
                Nombre: '',
                Descripcion: '',
                Precio: '',
                cod_prov: '',
                cod_catg: '',
                Estado: 'A',
                Stock: 100
            },
            categoria: [],
            proveedor: [],
            isEdit: false,
            title: '',
            loading: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) this.onInitEdit(id);
        else this.onInitCreate();
    }

    onInitEdit = (id: string) => {
        this.setState({ title: 'Editar Producto', isEdit: true, loading: true });
        new Promise((resolve: Function, reject: Function) =>
            this.props.AGET_PRODUCTO_CALL(id, resolve, reject)
        ).then(() => {
            const { data: { data, categoria, proveedor } } = this.props;
            this.setState({ data, categoria, proveedor, loading: false });
            console.log(data);
        }).catch(() => {
            this.setState({ loading: false });
        })
    }

    onInitCreate = () => {
        this.setState({ title: 'Crear Producto', isEdit: false, loading: true })
        new Promise((resolve: Function, reject: Function) =>
            this.props.AGET_CREATE_PRODUCTO_CALL(resolve, reject)
        ).then(() => {
            const { data: { categoria, proveedor } } = this.props;
            this.setState({ categoria, proveedor, loading: false });
        }).catch(() => {
            this.setState({ loading: false });
        })
    }

    onChange = (data: object) => {
        this.setState((state: any) => ({
            ...state,
            data: {
                ...state.data,
                ...data
            }
        }))
    }

    renderForm = () => {
        const data: IProducto = this.state.data;
        const listaCategoria: Array<ICategoria> = this.state.categoria;
        const listaProveedor: Array<IProveedor> = this.state.proveedor;
        return (
            <>
                <div className="row">
                    <div>
                        <TextField
                            label="Codigo"
                            variant="filled"
                            value={data.Codigo}
                            onChange={(e) => this.onChange({ Codigo: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Nombre"
                            variant="filled"
                            value={data.Nombre}
                            onChange={(e) => this.onChange({ Nombre: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div>
                        <TextField
                            label="Descripcion"
                            variant="filled"
                            value={data.Descripcion}
                            onChange={(e) => this.onChange({ Descripcion: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Precio"
                            variant="filled"
                            value={data.Precio}
                            onChange={(e) => this.onChange({ Precio: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div>
                        <TextField
                            select
                            label="Codigo Proveedor"
                            variant="filled"
                            value={data.cod_prov}
                            onChange={(e) => this.onChange({ cod_prov: e.target.value })}
                        >
                            <MenuItem value="">Seleccione</MenuItem>
                            {listaProveedor?.map((item) => <MenuItem key={item.codigo} value={item.codigo}>{item.nombre}</MenuItem>)}
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            select
                            label="Codigo Categoría"
                            variant="filled"
                            value={data.cod_catg}
                            onChange={(e) => this.onChange({ cod_catg: e.target.value })}
                        >
                            <MenuItem value="">Seleccione</MenuItem>
                            {listaCategoria?.map((item) => <MenuItem key={item.Id} value={item.Id}>{item.descripcion}</MenuItem>)}
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <TextField
                            label="Stock"
                            variant="filled"
                            value={data.Stock}
                            onChange={(e) => this.onChange({ Stock: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            select
                            label="Estado"
                            variant="filled"
                            value={data.Estado}
                            onChange={(e) => this.onChange({ Estado: e })}
                        >
                            <MenuItem value={'A'}>Activo</MenuItem>
                            <MenuItem value={'E'}>Eliminado</MenuItem>
                        </TextField>
                    </div>
                </div>
            </>
        )
    }

    renderButton = () => {

        return (
            <div className="Buttons">
                <div className="cancel">
                    <Button onClick={this.onCancel} variant="contained">Cancelar</Button>
                </div>
                <div className="save">
                    <Button onClick={this.onSubmit} variant="contained">Guardar</Button>
                </div>
            </div>
        )
    }

    onCancel = () => {
        this.props.history.push(`/Producto`);
    }

    onSubmit = () => {
        this.state.isEdit ? this.handleEdit() : this.handleCreate();
    }

    /*-CRUD-*/


    handleEdit = () => {
        this.setState({ loading: true });
        new Promise((resolve: Function, reject: Function) =>
            this.props.AACTUALIZAR_PRODUCTO_CALL(this.state.data, resolve, reject)
        ).then(() => {
            this.setState({ loading: false });
            this.props.history.push(`/Producto`);
        }).catch((err) => {
            console.log(err)
            this.setState({ loading: false });
        })
    }

    handleCreate = () => {
        this.setState({ loading: true });
        new Promise((resolve: Function, reject: Function) =>
            this.props.ACREAR_PRODUCTO_CALL(this.state.data, resolve, reject)
        ).then(() => {
            this.setState({ loading: false });
            this.props.history.push(`/Producto`);
        }).catch((err) => {
            this.setState({ loading: false });
            console.log(err);
        })
    }

    /*------*/


    render() {
        const { title } = this.state;
        return (
            <ToggleMenuWrapper>
                <div className="content__global">
                    <div className="title"> <h1>{title}</h1> </div>
                    <div className="form__breadcrum">
                        <a href="/"> Dashboard </a> <p> {`>`} </p>
                        <a href="/Producto"> Lista Productos </a> <p> {`>`} </p>
                        <a href=""> Producto </a>
                    </div>

                    <div className="form__content">
                        {this.renderForm()}
                        {this.renderButton()}
                    </div>
                    <Loading {...{ open: this.state.loading }} />
                </div>
            </ToggleMenuWrapper>
        )
    }
}

const mapStateToProps = (state: any) => ({
    data: state.producto.data
})

const MapDispatchToProps = (dispatch: any) => {
    const { AGET_PRODUCTO_CALL, ACREAR_PRODUCTO_CALL,
        AACTUALIZAR_PRODUCTO_CALL, AGET_CREATE_PRODUCTO_CALL } = Actions;
    return bindActionCreators({
        AGET_PRODUCTO_CALL,
        ACREAR_PRODUCTO_CALL,
        AACTUALIZAR_PRODUCTO_CALL,
        AGET_CREATE_PRODUCTO_CALL
    }, dispatch)
}

export default connect(mapStateToProps, MapDispatchToProps)(ListaProducto);