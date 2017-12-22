import React, { Component } from 'react';
// import logo from './logo.svg';
import warningImg from "./css/appropriate-audiences-warning.jpg";
import theaterPopcorn from "./css/theater-popcorn.jpg";
import filmPopcornAnimated from "./css/theater-popcorn-film-animated.jpg";
import theaterOutside from "./css/theater-outside-pic.jpg";
import './App.css';
import axios from "axios";
import MovieObject from "./movie-object.jsx";
import YesOrNo from "./yesOrNo.jsx";
import Demo from './geolocation.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputMovie: "",
      dayValue: 0,
      outputYesOrNo: "",
      selectedShowtimes: [],
      outputShowtimes: [
        {movieTitle: "Wonder Wheel", rootId: "14249992", theatreId: "5828", theatreName: "Town Square 14", boolean: false, showtimes: {"Town Square 14":["first", "second", "third"]}},
        {movieTitle: "Star Wars: The Last Jedi", rootId: "11597936", theatreId: "5828", theatreName: "Town Square 14", boolean: false, showtimes: ["first", "second", "third"]},
        {movieTitle: "Lady Bird", rootId: "14426291", theatreId: "5828", theatreName: "Town Square 14", boolean: false, showtimes: ["first", "second", "third"]}
      ],
    }
    this.handleClickShowtimes = this.handleClickShowtimes.bind(this);
    this.handleClickDecision = this.handleClickDecision.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickMovie = this.handleClickMovie.bind(this);
  }

  handleChange(e){
    let value = e.target.value;
    let id = e.target.id;
    this.setState({
      [id]: value,
    })
  }

  handleClickMovie(e){
    let index = parseInt(e.target.dataset.index, 10);
    const outputS = this.state.outputShowtimes.map((obj, i) => i === index ? {...obj, boolean: !obj.boolean} : {...obj, boolean: false});
    //outputS[index].boolean = !outputS[index].boolean;
    this.setState({
      outputShowtimes: outputS,
    })
  }

  handleClickDecision(e){
    axios.get("https://yesno.wtf/api")
    .then((response) => {
      this.setState({
        outputYesOrNo: response.data,
      })
    }).catch((err) => {
      console.log(err);
      let alertMessage = "I'm sorry but there was a problem. Please enter a valid Zip code and try again.";
      this.setState({
        outputYesOrNo: alertMessage,
      })
    })
  }

  handleClickShowtimes(e){
    let d = new Date();
    let dayValue = this.state.dayValue;
    let day = (d.getFullYear() + "-" + (parseInt(d.getMonth(), 10) + 1) + "-" + (parseInt(d.getDate(), 10) + parseInt(dayValue, 10)));
    let inputZip = this.state.inputZip;
    let valid = /^\d{5}$/.test(inputZip)
    if (!valid){
      return alert("Please enter valid 5 digit zip code");
    }
    axios.get(`http://data.tmsapi.com/v1.1/movies/showings?startDate=${day}&zip=${inputZip}&api_key=grymhebqmyywp9k2vfnrnsu4`)
    .then((response) => {  
        console.log(response.data);
        var theatreShowtimesArray = [];
        for (let i = 0; i < response.data.length; i++){
          
          let rootId = response.data[i].rootId;
          let movieTitle = response.data[i].title;
          let shortDescription = response.data[i].shortDescription;
          let officialUrl = response.data[i].officialUrl;
          let objectOfMovie = {
            movieTitle,
            rootId,
            shortDescription,
            officialUrl,
          };
          for (let j = 0; j < response.data[i].showtimes.length; j++){
            let theatreName = response.data[i].showtimes[j].theatre.name;
            let showtimes = response.data[i].showtimes[j].dateTime;
            if(!(objectOfMovie.hasOwnProperty("showtimes"))){
              objectOfMovie.boolean = false;
              objectOfMovie.showtimes = {};
            }
            if(!objectOfMovie.showtimes.hasOwnProperty(theatreName)){
              objectOfMovie.showtimes[theatreName] = [];
            }
            objectOfMovie.showtimes[theatreName].push(showtimes);
          }
          theatreShowtimesArray.push(objectOfMovie);
          console.log(objectOfMovie)
        }
        this.setState({
          outputShowtimes: theatreShowtimesArray,
        })
      }).catch(function(err){
        console.log(err);
        let alertMessage = "I'm sorry I couldn't make a decision. Please try again unless you already decided";
        this.setState({
          outputShowtimes: alertMessage,
        })
      })
      
  }

  render() {

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     var pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //   }
    // };

    return (
      <div className="App">
        <div className="jumbotron jumbotron-bg jumbotron-fluid App-header">
          <div className="container">
            <div className="row justify-content-around">
              <p className="h2 col-4 text-shadow neon">Movies playing near you</p>
              {/* <img src={warningImg} className="App-logo col-4" alt="warning for appriopriate audiences" /> */}
              <p className="h2 col-4 text-shadow neon">Watching one? I'll decide</p>
            </div>
          </div>
        </div>
        <div className="App-intro">

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src={warningImg} alt="First slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={theaterOutside} alt="Second slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={theaterPopcorn} alt="Third slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={filmPopcornAnimated} alt="Fourth slide" />
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>

          <form>
            <div className="form-row justify-content-center">
              <div className="form-group col-10 col-sm-3">
                <label htmlFor="inputZip"> Enter your local area zip code </label>
                <input id="inputZip" onChange={this.handleChange} type="number" placeholder="92109" className="form-control" />
              </div>
              <div className="form-group col-10 col-sm-3">
                <label htmlFor="dayValue"> Which day do you prefer to go </label>
                <select id="dayValue" onChange={this.handleChange} className="form-control">
                  <option value="0">Today</option>
                  <option value="1">Tomorrow</option>
                </select>
              </div>
            </div>
            <div className="form-row justify-content-center">  
              <div className="form-group col-10 col-sm-6">
                <button onClick={this.handleClickShowtimes} type="button" className="btn btn-primary form-control">Movie showtimes near me</button>
              </div>
            </div>
            <div className="form-row justify-content-center">
              <div className="form-group col-10 col-sm-6">
                <p className="h5">Can't decide if you really want to watch a movie or not?</p>
                <button onClick={this.handleClickDecision} type="button" className="btn btn-primary form-control">Click for yes or no</button>
              </div>
            </div>
          </form>
          {/* <Demo /> */}
          {this.state.outputYesOrNo && <YesOrNo yesOrNo={this.state.outputYesOrNo}/>}
          <MovieObject outputShowtimes={this.state.outputShowtimes} outputYesOrNo={this.state.outputYesOrNo} handleClickMovie={this.handleClickMovie} />
          
        </div>
      </div>
    );
  }
}

export default App;
