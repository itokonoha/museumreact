import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import { Container, Content, Form, Item, StyleProvider, Input, Label, Button, Text, Spinner, Thumbnail,CardItem, Card, List, ListItem } from 'native-base';
import { ScrollView, Linking, View, Modal, Dimensions, PixelRatio, TextInput, TouchableOpacity, AsyncStorage, Alert, Image, StatusBar, Platform } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../style/centerstyle'
import { Actions } from 'react-native-router-flux';

import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { profile }  from './MoreActions';
import { getMore } from './MoreActions';
const window = Dimensions.get('window');

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';


const mapStateToProps = ({MoreReducer}) => {
 return {
    more: MoreReducer.moreResponse.more,
    isLoading: MoreReducer.loadingDetail,
  }
}

class More extends Component {
  static navigationOptions ={ 
    headerTitle:"MENU",
    tabBarLabel: "More",
    tabBarIcon: () => <Icon size={24} name="menu" color="#ffffff" />
  };

  constructor(){
     super()

     this.state = {
       avatarSource: null,
       isLoading: false,
       modalVisible: false,
       activeOption: {}
     };
  }

  componentWillMount() {
    this.props.getMore();
  }

  componentWillUnmount(){
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBarStyle('dark-content', false);
  }

  capitalizeFirst(inputString) {
    if (inputString){
      inputString = inputString.replace(inputString[0],inputString[0].toUpperCase())

      if (inputString.indexOf(' ') !== -1){
        inputString = inputString.replace(inputString[(inputString.indexOf(' ') + 1)], inputString[(inputString.indexOf(' ') + 1)].toUpperCase());
      }
      return inputString;
    }
  };

  handlePound(inputString) {
    if (inputString){
      inputString = inputString.replace('#', '\n')
      return inputString;
    }
  };

  handleLink = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  };

  renderListItems(rowData) {
    if (rowData.external) {
      return (
        <ListItem style={{margin: 0, padding: 10}} onPress={() => this.handleLink(rowData.value)}>
          <Text>{this.capitalizeFirst(rowData.key)}</Text>
        </ListItem>
      );
    } else  {
      return (
        <ListItem style={{margin: 0, padding: 10}} onPress={() => { this.setState({ modalVisible: true, activeOption: rowData })}}>
          <Text>{this.capitalizeFirst(rowData.key)}</Text>
        </ListItem>
      );
    }
  };

  render() {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBarStyle('dark-content', false);

    if (this.props.isLoading) {
      return (
        <Spinner color='#262626' style={{flex:1,alignSelf:"center",alignItems:"center"}}/>
      );
    } else{
      return(
        <StyleProvider style={getTheme(platform)}>
          <View style={{flexDirection: "column", flex: 1}}>
            <Modal animationType={"fade"} transparent={false} visible={this.state.modalVisible} style={{flexDirection: "column", flex: 1}}>
              <View style={{marginTop: 30, flex:.07, borderBottomWidth: 1, borderColor: '#eee', paddingLeft: 20, paddingRight: 20}}>
                <Text style={{color:"black",fontSize:18}}>{this.capitalizeFirst(this.state.activeOption.key)}</Text>
              </View>
              <View  style={{flex:.93, marginBottom: 82, paddingBottom: 30, paddingTop: 10, borderBottomWidth: 1, borderColor: '#eee'}}>
                <Content style={{paddingLeft: 20, paddingRight: 20}}>
                  <Text style={{color:"black",fontSize:18}}>{this.handlePound(this.state.activeOption.value)}</Text>
                </Content>
              </View>
              <TouchableOpacity style={{position:"absolute", alignSelf: 'center', width: 45, height: 45, padding: 5, bottom: 20, borderRadius: 50, backgroundColor: '#262626', margin: 'auto', display: 'flex', alignItems: 'center'}} onPress={() => { this.setState({ modalVisible: false, activeOption: {}})}}>
                <Icon size={32} name='close' color={"#ffffff"} />
              </TouchableOpacity>
            </Modal>
            <Container style={{backgroundColor:'#F1F2FB',flex: 1, marginTop: 63, height: '100%', position: 'relative', overflow: 'hidden', width: window.width}}>
              <List
                dataArray={this.props.more}
                renderRow={(data) => this.renderListItems(data)}
              />
            </Container>
          </View>
        </StyleProvider>
      );
    }
  }
}
export default connect(mapStateToProps,{getMore})(More);
