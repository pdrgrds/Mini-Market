import React from 'react';
import TemplateRegister from '../../Components/Template/login';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Actions from '../../Redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref, ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Register extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            usuario: {
                correo: '',
                nombre: '',
                apellido: '',
                fechaNac: '',
                password: ''
            },
        }
    }

    onChange = (data: any) => {
        this.setState((state: any) => ({
            ...state,
            usuario: {
                ...state.usuario,
                ...data
            }
        }))
    }
    
    onSubmit = () => {
        const { usuario } = this.state;
        new Promise((resolve: Function, reject: Function) =>
            this.props.AUSER_REGISTER_CALL(usuario, resolve, reject)
        )
        .then(() => {
            window.location.href = "/login"
        })
        .catch((message) => this.setState({error:`${message}`}))
    }

    render(){
        const { error, usuario } = this.state;
        return(
            <TemplateRegister>
                <h1>MARKET</h1>
                <hr /> <br />
                { error && <Alert severity="warning"> {error} </Alert> }
                <TextField
                    label="Correo"
                    type="email"
                    value={usuario.correo}
                    onChange={(e) => this.onChange({ correo: e.target.value })}
                />
                <TextField
                    label="Nombre"
                    value={usuario.nombre}
                    onChange={(e) => this.onChange({ nombre: e.target.value })}
                />
                <TextField
                    label="Apellido"
                    value={usuario.apellido}
                    onChange={(e) => this.onChange({ apellido: e.target.value })}
                />
                <TextField
                    label="Fecha de Nacimiento"
                    type="date"
                    value={usuario.fechaNac}
                    onChange={(e) => this.onChange({ fechaNac: e.target.value })}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={usuario.password}
                    onChange={(e) => this.onChange({ password: e.target.value })}
                />
                <Button variant="contained" onClick={this.onSubmit}>Register</Button>
                <p>¿Ya tienes cuenta? presione <a href="/login">aquí</a> </p>
            </TemplateRegister>
        )
    }
}

const MapDispatchToProps = (dispatch: any) => {
    const { AUSER_REGISTER_CALL } = Actions;
    return bindActionCreators({
        AUSER_REGISTER_CALL
    }, dispatch)
}

export default connect(null, MapDispatchToProps)(Register);