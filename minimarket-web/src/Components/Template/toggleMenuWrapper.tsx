import React from 'react';
import Header from './../Global/header';
import Menu from './../Global/menu';
import './../../assets/styles/toggleMenuWrapper.scss';

class ToggleMenuWrapper extends React.Component<any,any> {
    constructor(props:any){
        super(props);
    }

    render(){
        return(
            <div className="toggleMenuWrapper">
                <Menu />
                <div className="content">
                    <Header />
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ToggleMenuWrapper;