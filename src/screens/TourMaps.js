import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../style/centerstyle'
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'

export default class TourMaps extends Component {
  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
    this.state = {
      lastLat: null,
      lastLong: null,
    }
  }

  static navigationOptions = {
    headerTitle:"MAPS",
    tabBarLabel: "Maps",
    tabBarIcon: () => <Icon size={24} name="map" color="#ffffff" />
  }
  handleGetDirections = (lat,lng) => {
    const data = {
       source: {
        latitude: this.state.lastLat,
        longitude: this.state.lastLong
      },
      destination: {
        latitude: lat,
        longitude: lng
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }

    getDirections(data)
  }
  componentWillUnmount(){
   navigator.geolocation.clearWatch(this.watchID);
 }
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
        alert(position.coords.latitude);
       this.setState({lastLat:position.coords.latitude,lastLong:position.coords.longitude})
     });
   }
  render() {
    return (
      <MapView
        style={ styles.map }
        region={{
         latitude: this.props.stops[0].latitude,
         longitude: this.props.stops[0].longitude,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,

       }}
       showsUserLocation = {true}
       zoomEnabled = {true}
       showsMyLocationButton = {true}
      >
        {
          this.props.stops.map( stop => (
            <MapView.Marker onCalloutPress={ () =>this.handleGetDirections(stop.latitude,stop.longitude)} coordinate={{longitude: stop.longitude,latitude: stop.latitude }} title={stop.stop_title} description={stop.stop_description}/>
          ))
        }
     </MapView>
    );
  }
}
