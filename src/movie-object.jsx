import React, { Component } from "react";
import Showtimes from "./showtimes.jsx";

export default class MovieObject extends Component{
    
    render(){
        let exists = false;
        let theatreShowtimesArray;
        let instructions = "";
        if(this.props.outputShowtimes){
            theatreShowtimesArray = this.props.outputShowtimes;
            exists = true;
            instructions = "Click on the movie you want to watch";
        }

        return (
            <div id="movieObject">
              <h2><b><em>{instructions}</em></b></h2>
              {exists && theatreShowtimesArray.map((movie, index) => 
                <div key={index}>
                    <h3 data-index={index} onClick={this.props.handleClickMovie}>{movie.movieTitle}</h3>
                    {movie.boolean && <Showtimes movieObject={movie}  />}
                </div>
              )}
            </div>
        );
    }
}