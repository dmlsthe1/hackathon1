import React, { Component } from "react";
import InnerShowtimes from "./innerShowtime.jsx";
import GeolocationHOC from "./geolocation.jsx";
import axios from "axios";

export default class Showtimes extends Component {
  constructor(props){
    super(props);
    this.state = {
      showtimesKeys: Object.keys(this.props.movieObject.showtimes),
      coords: null
    }
    this.setCoordinates = this.setCoordinates.bind(this);
  }

  setCoordinates(lat, lng) {
    this.setState({coords: {lat: lat, lng: lng}});
  }

  componentWillMount(){
    this.state.showtimesKeys.map(keyTheater => {
      let encKeyTheater = encodeURI(keyTheater);
      axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.799811,%20-117.247657&radius=10000&type=movie_theater&keyword=${encKeyTheater}&key=AIzaSyBHQCbrnxTUiD8R53sCZ-SzR1M5OACf1-w`)
      .then((response)=>{
          console.log(response.data);
          let index;
          response.data.results.map((result, i) => {
            if (result.name == keyTheater){
              index = i;
            }
          })
          this.setState({
              [keyTheater]: response.data.results[index].geometry.location,
          })
          console.log(this.state)
      }).catch(err =>{
        console.log(err);
      })
    })
  }

  render(){

      if (!this.state.coords) {
        return <GeolocationHOC getCoordinates={this.setCoordinates}/>
      }

      return (
          <div>
            <h6><a href={this.props.movieObject.officialUrl}>{this.props.movieObject.shortDescription}</a></h6>
            {this.state.showtimesKeys.map((keyTheater, i) => 
                <InnerShowtimes key={i} index={i} keyName={keyTheater} keyTheater={this.props.movieObject.showtimes[keyTheater]}/>
            )}
          </div>
      );
  }
}