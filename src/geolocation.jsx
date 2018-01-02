import React from 'react';
import {geolocated} from 'react-geolocated';
 
class Demo extends React.Component {
  componentWillMount() {
    const {isGeolocationAvailable, isGeolocationEnabled, coords} = this.props;

    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      this.props.getCoordinates(this.props.coords.latitude, this.props.coords.longitude);
      return null;
    }

    return 'Getting the location data';
  }

  render() {
    return null
  }
}
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);