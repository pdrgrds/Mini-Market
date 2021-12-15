import React from 'react';
import ToggleMenuWrapper from './../../Components/Template/toggleMenuWrapper';
import * as Actions from '../../Redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IProveedor from './../../Interface/model/proveedor';
import Loading from '../../Components/Global/loading';
import './../../assets/styles/form.scss';

class FormProveedor extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            data: {
                codigo: '',
                nombre: '',
                descripcion: ''
            },
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
        this.setState({ title: 'Editar Proveedor', isEdit: true, loading: true });
        new Promise((resolve: Function, reject: Function) =>
            this.props.AGET_PROVEEDOR_CALL(id, resolve, reject)
        ).then(() => {
            const { data: { data } } = this.props;
            this.setState({ data, loading: false });
            console.log(data);
        }).catch(() => {
            this.setState({ loading: false });
        })
    }

    onInitCreate = () => {
        this.setState({ title: 'Crear Proveedor', isEdit: false, loading: true })
        new Promise((resolve: Function, reject: Function) =>
            this.props.AGET_CREATE_PRODUCTO_CALL(resolve, reject)
        ).then(() => {
            //const { data: { categoria, proveedor } } = this.props;
            //this.setState({ categoria, proveedor, loading: false });
            this.setState({loading: false})
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
        const data: IProveedor = this.state.data;
        return (
            <>
                <div className="row">
                    <div>
                        <TextField
                            label="Codigo"
                            variant="filled"
                            value={data.codigo}
                            onChange={(e) => this.onChange({ codigo: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            label="Nombre"
                            variant="filled"
                            value={data.nombre}
                            onChange={(e) => this.onChange({ nombre: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div>
                        <TextField
                            label="Descripcion"
                            variant="filled"
                            value={data.descripcion}
                            onChange={(e) => this.onChange({ descripcion: e.target.value })}
                            required
                        />
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
        this.props.history.push(`/Proveedor`);
    }

    onSubmit = () => {
        this.state.isEdit ? this.handleEdit() : this.handleCreate();
    }

    /*-CRUD-*/


    handleEdit = () => {
        this.setState({ loading: true });
        new Promise((resolve: Function, reject: Function) =>
            this.props.AACTUALIZAR_PROVEEDOR_CALL(this.state.data, resolve, reject)
        ).then(() => {
            this.setState({ loading: false });
            this.props.history.push(`/Proveedor`);
        }).catch((err) => {
            console.log(err)
            this.setState({ loading: false });
        })
    }

    handleCreate = () => {
        this.setState({ loading: true });
        new Promise((resolve: Function, reject: Function) =>
            this.props.ACREAR_PROVEEDOR_CALL(this.state.data, resolve, reject)
        ).then(() => {
            this.setState({ loading: false });
            this.props.history.push(`/Proveedor`);
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
                        <a href="/Proveedor"> Lista Proveedor </a> <p> {`>`} </p>
                        <a href=""> Proveedor </a>
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
    data: state.proveedor.data
})

const MapDispatchToProps = (dispatch: any) => {
    const { AGET_PROVEEDOR_CALL, ACREAR_PROVEEDOR_CALL,
        AACTUALIZAR_PROVEEDOR_CALL, AGET_CREATE_PROVEEDOR_CALL } = Actions;
    return bindActionCreators({
        AGET_PROVEEDOR_CALL,
        ACREAR_PROVEEDOR_CALL,
        AACTUALIZAR_PROVEEDOR_CALL,
        AGET_CREATE_PROVEEDOR_CALL
    }, dispatch)
}

export default connect(mapStateToProps, MapDispatchToProps)(FormProveedor);