import React, { Component } from 'react';
import './../../assets/styles/login.scss';

class TemplateLogin extends Component<any,any> {
    constructor(props:any){
        super(props);
    }

    render(){
        return(
            <div className="container__Login"> 
                <div>
                    <div className="content__formulario">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default TemplateLogin;