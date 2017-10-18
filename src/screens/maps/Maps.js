import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../style/centerstyle';
import { getMapsInfo, change, loadInitialMap } from './MapsActions';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {Spinner} from 'native-base';
const mapStateToProps = ({ MapsReducer }) => {
  return {
    mapTours: MapsReducer.mapTours,
    loading: MapsReducer.loadingDetail
  };
};
const lattitude=0.0;
const longitude = 0.0;
class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      initialPage: 0,
      lat: 0.0,
      lng:0.0,
      region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    };
    //this.props.loadInitialMap();
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBarStyle('dark-content', true);
    console.log("Maps constructor==");
    this.props.getMapsInfo(this.state.initialPage);
  }
  componentDidMount() {
    if (this.props.mapsTours !== undefined && this.props.mapsTours !== null && this.props.mapTours.length >0) {
      this.setState({region:{latitude: this.props.mapTours[0].stops[0].latitude,
         longitude: this.props.mapTours[0].stops[0].longitude,
  }}, ()=> this.onClickSubmit());
    }
   }
  static navigationOptions = {
    headerTitle:"MAPS",
    tabBarLabel: "Maps",
    tabBarIcon: () => <Icon size={24} name="map" color="#ffffff" />
  }
    componentWillReceiveProps(nextProps) {

      if (this.props.mapTours !== nextProps.mapTours ){
        this.setState({region:{latitude: this.props.mapTours[0].stops[0].latitude,
           longitude: this.props.mapTours[0].stops[0].longitude,
    }}, ()=> this.onClickSubmit());
      }
      ;
    }
    onClickSubmit(){
      console.log("MAPPPPPPPPPPPPPPP");
      var tours =[];
      if (this.props.mapTours.length >0 ) {
        for (var i = 0; i < this.props.mapTours.length; i++) {

          for (var j = 0; j < this.props.mapTours[i].stops.length; j++) {
            var obj={};

            obj.latitude = this.props.mapTours[i].stops[j].latitude;
            obj.longitude = this.props.mapTours[i].stops[j].longitude;
            tours.push(obj);
          }

        }
        console.log("New Array", tours);
        this.map.fitToCoordinates(tours, {
                   edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                   animated: true,
                   });
      }

    }
  render() {

    if (this.props.loading) {
      return (
        <Spinner color='#262626' style={{flex:1,alignSelf:"center",alignItems:"center"}}/>
      );
    }
    else {
      return (
        <MapView
        minZoomLevel={1}
        initialRegion={this.state.initialRegion}
        loadingEnabled={true}
        loadingIndicatorColor='#262626'
         style={ styles.map }
         ref={map => { this.map = map }}
         showsUserLocation = {true}
         zoomEnabled = {true}
         showsMyLocationButton = {true}
       >
       {
         this.props.mapTours.map(tourNew => (
           tourNew.stops.map( stop => (
             <MapView.Marker
             coordinate={{longitude: stop.longitude,latitude: stop.latitude }}
             title={stop.stop_title}
             description={stop.stop_description}
         />
           ))
         ))
      }
       </MapView>
      );
    }

  }
}

export default connect(mapStateToProps, { getMapsInfo, change, loadInitialMap})(Maps);
