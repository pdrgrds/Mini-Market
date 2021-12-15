import React from 'react';
import TemplateLogin from '../../Components/Template/login';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Actions from '../../Redux/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref, ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Login extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            usuario: {
                correo: '',
                password: ''
            },
            error: null
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
            this.props.AUSER_LOGIN_CALL(usuario, resolve, reject)
        )
        .then(() => {
            window.location.href = "/"
        })
        .catch(() => this.setState({error:'Contraseña o Correo incorrecto'}))
    }

    render() {
        const { usuario, error } = this.state;
        return (
            <TemplateLogin>
                <h1>MARKET</h1>
                <hr /> <br />
                { error && <Alert severity="warning"> {error} </Alert> }
                <TextField
                    label="Correo"
                    type="email"
                    value={usuario.correo}
                    onChange={(e) => this.onChange({ correo: e.target.value })}
                    required
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={usuario.password}
                    onChange={(e) => this.onChange({ password: e.target.value })}
                />
                <Button variant="contained" onClick={this.onSubmit}>Login</Button>
                <p>¿No tienes cuenta? presione <a href="/register">aquí</a> </p>
            </TemplateLogin>
        )
    }
}

const MapDispatchToProps = (dispatch: any) => {
    const { AUSER_LOGIN_CALL } = Actions;
    return bindActionCreators({
        AUSER_LOGIN_CALL
    }, dispatch)
}

export default connect(null, MapDispatchToProps)(Login);