import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './../modules/Options/Login';
import Register from './../modules/Options/Register';
import Dashboard from './privateRoutes';
import { PrivateRoute } from './validatedRoutes';
import { autenticacion } from './../Redux/servicio/firebase';
import * as Action from '../Redux/action';
import { connect } from 'react-redux';

class Master extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount(){
        this.props.validateAuth();
    }

    render() {
        console.log(this.props.usuario);
        const { usuario } = this.props;
        return (
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                { 
                    usuario !== {} ? 
                        usuario == null ? 
                            <Redirect to="/login"/> :
                        <PrivateRoute path="/" component={Dashboard} /> 
                    : <div>LOading</div> 
                }
                <Redirect from="/" exact to="/" />
            </Switch>
        );
    }
}

const mapStateToProps = (state: any) => ({
        usuario: state.user.session
})

const mapDispatchToProps = (dispatch: any) => {
    const { ARegistrarSession, ACerrarSession } = Action;
    return ({

        validateAuth: () => {
            autenticacion.onAuthStateChanged((usuario: any) => {
                if (usuario) {
                    dispatch(ARegistrarSession(usuario));
                    console.log(usuario);
                } else {
                    console.log('No existe sessión');
                    dispatch(ACerrarSession());
                }
            })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Master);