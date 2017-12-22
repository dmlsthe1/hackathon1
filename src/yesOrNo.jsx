import React, { Component } from "react";

export default class YesOrNo extends Component {
    render(){
        return(
            <div>
                <h3>{this.props.yesOrNo.answer}</h3>
                <img src={this.props.yesOrNo.image} alt={`animated ${this.props.yesOrNo.answer}`}/>
            </div>
        );
    }
}