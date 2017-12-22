import React, { Component } from "react";

export default class InnerShowtimes extends Component {
    
    render(){
        return (
            <div>
                <h5 key={this.props.index} className="h5">{`${this.props.keyName}`}</h5>
                  {this.props.keyTheater.map((showtime, index) => 
                  <p key={index}>{showtime}</p>)}
            </div>
        )
    }
}