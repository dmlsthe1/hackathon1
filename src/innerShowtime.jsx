import React, { Component } from "react";

export default class InnerShowtimes extends Component {
    
    render(){
        return (
            <table className="table">
                <thead>
                <tr>
                    <th key={this.props.index} className="h5"><strong>{`${this.props.keyName}`}</strong></th>
                </tr>
                </thead>
                <tbody>
                    {this.props.keyTheater.map((showtime, index) => 
                        <tr key={index}>
                            <td key={index} className="text-center">{showtime}</td>
                        </tr>)}
                </tbody>
            </table>
        )
    }
}