import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner, Thumbnail,CardItem, Card, List, ListItem } from 'native-base';
import { ScrollView, View, Dimensions, PixelRatio, TextInput, TouchableOpacity, AsyncStorage, Alert, Image, StatusBar, Platform } from "react-native";

import { styles } from '../../style/centerstyle'
import { Actions } from 'react-native-router-flux';

import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { profile }  from './ProfileActions';
import { getProfileDetails, logout } from './ProfileActions';
const window = Dimensions.get('window');

const mapStateToProps = ({ProfileReducer}) => {
 return {
    profile:ProfileReducer.profileResponse,
    isLoading: ProfileReducer.loadingDetail,
  }
}
class ProfileScreen extends Component {
  constructor(){
     super()

     this.state = {
       email: '',
       firstName: '',
       lastName: '',
       avatarSource: null,
       isLoading: false,
       isAvatarLoading: true,
     };
     try {
       const value = AsyncStorage.getItem('user_id',(err, result) => {
           console.log('UserID', result);
           this.props.getProfileDetails(result);
         });
     } catch (error) {
       // Error retrieving data
       console.log("Error getting Token",error);
     }
     try {
       const value = AsyncStorage.getItem('user_token',(err, result) => {
           console.log('USERTOKEN', result);
         });
     } catch (error) {
       // Error retrieving data
       console.log("Error getting Token",error);
     }
  }
  componentWillReceiveProps(nextProps) {
    console.log("DATA==",nextProps,nextProps.profile.email);
  }
  componentDidUpdate () {
  if (this.props.profile!=null && this.props.profile.email!=null && this.state.email.length !== this.props.profile.email.length) {
    this.setState({
      email: this.props.profile.email,
      firstName: this.props.profile.first_name,
      lastName: this.props.profile.last_name
    })
  }
}
  static navigationOptions = {
     headerTitle:"PROFILE",
     tabBarVisible: false
  }
  onLogoutPress(){
    Alert.alert(
  'Logout',
  'Are you sure you want to logout?',
  [
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => this.props.logout()},
  ],
  { cancelable: false }
)
  }
  componentWillUnmount(){
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBarStyle('dark-content', true);
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    if (this.props.isLoading) {
      return (
        <Spinner color='#262626' style={{flex:1,alignSelf:"center",alignItems:"center"}}/>
      );
    }
    return(
      <Container style={{backgroundColor:'#F1F2FB',flex: 1, marginTop:50, height: '100%', position: 'relative', overflow: 'hidden', width: window.width}}>

          <Image source={require('../images/cover.png')} style={{width: window.width, position:'absolute'}}/>

        <Spinner color='#262626' animating={this.state.isAvatarLoading} style={{alignSelf: "center", alignItems: "center",position: 'absolute'}} />
          <Thumbnail large source={{uri: this.props.profile.profile_picture}} style={{ alignSelf: 'center', marginTop: 90 }}   onLoadEnd={() => this.setState({ isAvatarLoading: false }) }
            onLoadStart={()=> console.log('Load Started') }
            onLoad={() => this.setState({ isAvatarLoading: false }) } />
            <TouchableOpacity style={{backgroundColor:'transparent', height:50, marginLeft:10, justifyContent: 'center',alignItems: 'center'}}>
              <Text style={{fontSize: 20, color:(Platform.OS === 'ios')?'white':'blue'}}>{this.state.firstName} {this.state.lastName}</Text>
            </TouchableOpacity>
        <View style={{ backgroundColor:'#fff',marginTop: 50}}>
            <TouchableOpacity style={{backgroundColor:'#fff', height:50, marginLeft:10, justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={{backgroundColor:'#F1F2FB',height:1}}></View>
            <TouchableOpacity style={{backgroundColor:'#fff', marginLeft:10, height:50,justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Following</Text>
            </TouchableOpacity>
              <View style={{backgroundColor:'#F1F2FB',height:1}}></View>
            <TouchableOpacity style={{backgroundColor:'#fff',marginLeft:10,height:50,justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Followers</Text>
            </TouchableOpacity>
              <View style={{backgroundColor:'#F1F2FB',height:1}}></View>
        </View>
        <TouchableOpacity style={{backgroundColor:'#fff',marginTop:30,alignItems:'center',height:50}} onPress={()=> this.onLogoutPress()}>
          <Text style={{alignSelf:'center',alignItems:'center',color:'red',fontSize: 18,marginTop:10}}>Log Out</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}
export default connect(mapStateToProps,{getProfileDetails, logout})(ProfileScreen);
