import React, { Component } from 'react';
import { Image, TouchableHighlight, StatusBar, Dimensions, Platform, Modal, TouchableOpacity, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardItem, Button, StyleProvider, Thumbnail, Text, List, ListItem, View, Spinner, Content } from 'native-base';
import { Avatar } from 'react-native-elements';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { showUser, resetvalues, loading } from './HomeActions';
const { InAppUtils } = NativeModules
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
const InAppBilling = require("react-native-billing");
const window = Dimensions.get('window');
const mapStateToProps = ({ HomeReducer }) => {
  return {
    homeScreenData: HomeReducer.homeScreenData,
    isLoading: HomeReducer.load,
    data: HomeReducer.data,
    modalVisible: false,
  };
};
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isThubmnailLoading: true,
      isCoverImageLoading: true,
      dataSource: [],
      isLoading: true,
      json: {},
      modalVisible: false
    };
    //this.props.showUser();
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBarStyle('dark-content', true);
  }
  // Or in ES6: com.us.airforce.testbuyall
componentWillMount() {

    if (Platform.OS === 'ios' ) {
      var products = [
     'com.us.airforce.testbuyall',
    ];
    InAppUtils.loadProducts(products, (error, products) => {
     //update store here.
    console.log("IN APP",error,products);
    });
  }
}
componentDidMount(){
this.props.showUser();
}
// componentWillUnmount(){
//  navigator.geolocation.clearWatch(this.watchID);
// }
// componentDidMount() {
//   this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
//
//     console.log("t---",lastPosition);
//    //alert(lastPosition.coords.latitude,lastPosition.coords.longitude)
//    //console.log("LocationUpdate",lastPosition);
//  },
//  (error) => console.log(error),
//  {enableHighAccuracy: true, timeout: 0, maximumAge: 100, enableHighAccuracy:true,distanceFilter:0});
//  // this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
//  //    alert(lastPosition.coords.latitude,lastPosition.coords.longitude)
//  //  });
//  }
  renderListItems(rowData) {
    return (
      <ListItem key={rowData.id} style={{width: 80, minWidth: '25%', margin: 0, padding: 0}}>
        <View style={{position: 'relative', left: -15, display: 'flex', flexDirection: 'column',  margin: 0, padding: 0, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={() => Actions.audioTourDetail({ tourId: rowData.id,title: rowData.title })} activeOpacity={0.7}>
            <Image
              style={{width: 80, height: 80}}
             source={{ uri: rowData.cover_image_url }}
            />
          </TouchableOpacity>
          <Text numberOfLines={2} style={{ fontSize: 10, color: '#262626'}}>{rowData.title.toUpperCase()}</Text>
          {
            parseFloat(rowData.single_credit_amount) === 0 ?
              <Text style={{ fontSize: 12, color: '#262626'}}>Free</Text>
                :
              <Text style={{ fontSize: 12, color: '#262626'}}>{'$'}{rowData.single_credit_amount}</Text>
          }
        </View>
      </ListItem>
    );
  }

  renderInformation(rowData) {
    return <h1>Welcome back!</h1>;
  }

  onBuyAllTourPress(){
    var productIdentifier = 'com.us.airforce.testbuyall';
    if (Platform.OS === 'ios' ) {
      InAppUtils.purchaseProduct('com.us.airforce.testbuyall', (error, response) => {
         // NOTE for v3.0: User can cancel the payment which will be available as error object here.
         if(response && response.productIdentifier) {
            alert('Purchase Successful'+ 'Your Transaction ID is ' + response.transactionIdentifier);
         }
         else {
          // alert(error);
           console.log(error);
         }
      });
    }else {
          InAppBilling.open()
    .then(() => InAppBilling.purchase('com.us.airforce.testbuyall'))
    .then((details) => {
      alert("You purchased: "+details)
      return InAppBilling.close()
    })
    .catch((err) => {
      console.log(err);
    });
    }
  }
  render() {
    const { homeScreenData } = this.props;
    if (this.props.isLoading) {
      return (
        <Spinner color='#262626' style={{ flex: 1, alignSelf: "center", alignItems: "center" }} />
      );
    }
     else {
      return (
        <StyleProvider style={getTheme(platform)}>
          <View style={{flexDirection: "column", flex: 1}}>
            <Modal animationType={"fade"} transparent={false} visible={this.state.modalVisible} style={{flexDirection: "column", flex: 1}}>
              <View style={{marginTop: 30, flex:.07, borderBottomWidth: 1, borderColor: '#eee', paddingLeft: 20, paddingRight: 20}}>
                <Text style={{color:"black",fontSize:18}} >{homeScreenData.title}</Text>
              </View>
              <View  style={{flex:.93, marginBottom: 82, paddingBottom: 30, borderBottomWidth: 1, borderColor: '#eee'}}>
                <Content style={{paddingLeft: 20, paddingRight: 20}}>
                  <Text style={{color:"black",fontSize:18}} >{homeScreenData.description}</Text>
                </Content>
              </View>
              <TouchableOpacity style={{position:"absolute", alignSelf: 'center', width: 45, height: 45, padding: 5, bottom: 20, borderRadius: 50, backgroundColor: '#262626', margin: 'auto', display: 'flex', alignItems: 'center'}} onPress={() => { this.setState({ modalVisible: false })}}>
                <Icon size={32} name='close' color={"#ffffff"} />
              </TouchableOpacity>
            </Modal>
            <View style={{flex: 1, marginTop: 40, position: 'relative'}}>
              {
                (homeScreenData.fullscreen) ? (
                    <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                      <Image
                        onLoadEnd={() => this.setState({isCoverImageLoading:false})}
                        onLoadStart={()=>console.log("Started")}
                        onLoad={() => this.setState({isCoverImageLoading:false})}
                        style={{height: window.height, justifyContent: 'center',
                          alignItems: "center",
                          alignSelf: "stretch" }}
                        source={{ uri: homeScreenData.cover_image }}>
                      </Image>
                    </View>
                ) : (
                  <View style={{position: 'absolute', top: 0, height: 250, left: 0, right: 0}}>
                    <Image
                      onLoadEnd={() => this.setState({isCoverImageLoading:false})}
                      onLoadStart={()=>console.log("Started")}
                      onLoad={() => this.setState({isCoverImageLoading:false})}
                      style={{height: 250, justifyContent: 'center',
                        alignItems: "center",
                        alignSelf: "stretch" }}
                      source={{ uri: homeScreenData.cover_image }}>
                    </Image>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', bottom: 0, top: 0, left: 0, right: 0}}>
                    </View>
                  </View>
                )
              }
              {
                (homeScreenData.showinfo) ? (
                  <View style={{backgroundColor: 'transparent', position: 'relative', top: 0, paddingTop: 130, paddingBottom: 30, left: 0, right: 0}}>
                    <Text style={{color:'#fff', fontSize: 16, fontWeight: 'bold', marginTop: 5, marginLeft: 15, marginBottom: 5, marginRight: 15}}>{homeScreenData.title}</Text>
                    {
                      (homeScreenData.description != null) ? <Text numberOfLines={1} style={{color:'#fff', marginTop: 5, marginLeft: 15, marginBottom: 5, marginRight: 15, fontSize: 14}}>{homeScreenData.description.substring(0, 80)}...</Text> : <Text style={{color:'#262626', marginTop: 5, marginLeft: 15, marginBottom: 5, marginRight: 15, fontSize: 14}}>No Description</Text>
                    }
                    <View style={{position: 'relative', margin: 5, marginLeft: 15, borderRadius: 50, backgroundColor: '#fff', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 15, width: 95}}>
                      <TouchableOpacity onPress={() => { this.setState({ modalVisible: true })}}>
                        <Text style={{color:'#262626', fontSize: 12}}>READ MORE</Text>
                      </TouchableOpacity>
                    </View>
                 </View>
                ) : (
                  <View style={{minHeight: 220}}></View>
                )
              }
              <Spinner color='#262626' animating={this.state.isCoverImageLoading} style={{alignSelf: "center", alignItems: "center", position: 'absolute'}}/>
                {
                  (homeScreenData.showinfo) ? (
                    <View></View>
                  ) : (
                    <TouchableOpacity style={{position: 'absolute', bottom: 55, right: 10, backgroundColor: 'transparent'}} onPress={() => {this.setState({ modalVisible: true })}}>
                      <Icon size={32} name='help' color={"#262626"} />
                    </TouchableOpacity>
                  )
                }
                {
                  (homeScreenData.tours.length > 1) ? (
                    <Button success style={{position: 'relative', marginLeft: 'auto', marginRight: 'auto', margin: 10, backgroundColor: '#262626', borderRadius: 0}} onPress={()=>this.onBuyAllTourPress()}>
                      <Text style={{fontWeight: 'bold'}}>BUY ALL TOURS</Text>
                    </Button>
                  ) : (
                    <View></View>
                  )
                }
                {
                  (homeScreenData.features.length > 0) ? (
                    <View>
                      <View style={{marginLeft: 10, backgroundColor: 'transparent'}}>
                        <Text style={{ color: 'black', fontSize: 18, paddingTop: 5, paddingBottom: 5}}>Featured Tours</Text>
                      </View>
                      <View style={{width: window.width, margin: 0, paddingLeft: 10, position: 'relative'}}>
                        <List
                          horizontal={ true}
                          dataArray={homeScreenData.features}
                          renderRow={(data) => this.renderListItems(data)}
                        />
                      </View>
                    </View>
                  ) : (
                    <View></View>
                  )
                }
                {
                  (homeScreenData.toptour) ? (
                    <Button info full style={{display: 'flex', flexDirection: 'row', padding: 20, height: 60}} onPress={() => Actions.audioTourDetail({ tourId: homeScreenData.toptour.id, title: homeScreenData.toptour.title })}>
                      <Icon size={32} name='exit-to-app' color={"#ffffff"} style={{marginRight: 20}}/>
                      <View style={{display: 'flex', flexDirection: 'column', flex: 1}} >
                        <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{homeScreenData.toptour.title}</Text>

                                            {
                        parseFloat(homeScreenData.toptour.single_credit_amount) === 0 ?
                         <Text style={{color: '#fff', fontSize: 12}}>FREE</Text>
                           :
                         <Text style={{color:'#ffffff',fontSize:12}}>${homeScreenData.toptour.single_credit_amount}</Text>
                        }
                      </View>
                    </Button>
                  ) : (
                    <View></View>
                  )
                }
            </View>
          </View>
        </StyleProvider>
      );
    }
  }

}
export default connect(mapStateToProps, { showUser, resetvalues, loading })(Home);
