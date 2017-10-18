import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, StyleProvider, List, ListItem, Thumbnail, Spinner, Button } from 'native-base';
import { View, Text, Image, Dimensions, FlatList, StatusBar, AsyncStorage, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { getAudioTours, change, loadMoreApi, getPurchasedTours, loadPurchased, loadInitial } from './AudioTourActions';
import { styles } from '../../style/centerstyle';
const window = Dimensions.get('window');

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';

const mapStateToProps = ({ AudioTourReducer, LoginReducer, SignUpReducer, RouterReducer }) => {
  return {
    audioTours: AudioTourReducer.audioTours,
    isLoading: AudioTourReducer.loading,
    auth: SignUpReducer.auth,
    authLogin: LoginReducer.login,
    loadMore: AudioTourReducer.loadMoreApi,
    purchasedTours: AudioTourReducer.purchasedTours,
    signUpResponse: SignUpReducer.userData,
    loginResponse: LoginReducer.loginResponse,
    isImageLoading: false,
    initialPage: AudioTourReducer.initialPage,
    isPurchasedLoadedOnce: AudioTourReducer.isPurchasedLoadedOnce,
    tabs: RouterReducer.tabs
  };
};

class Audio extends Component {

  constructor(props) {
    super(props);
    //this.props.loadInitial();
    console.log(this.props.tabs);
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBarStyle('dark-content', true);

    this.state = {
      page: 1,
      refreshing: false,
      initialPage: 0,
    };

  }
componentDidMount(){
  if ((this.props.purchasedTours === null || this.props.purchasedTours.length === 0) ) {
    //  this.setState({ initialPage: 1 });
      try {
        const value = AsyncStorage.getItem('user_token',(err, result) => {

            //this.props.loadPurchased();
            if (result !== null && result !== undefined && result !== '') {
            //  this.props.loadInitial();
                console.log("Purchases");
              console.log("TOKEN",result);
              this.props.getPurchasedTours(result);
            }

          });
      } catch (error) {
      }

  }
  if(this.props.audioTours === null || this.props.audioTours.length === 0)
  {
    console.log("Tours");
    //this.props.loadInitial();
    this.props.getAudioTours(this.state.page);
  }
}
  componentWillReceiveProps(nextProps) {
    if (nextProps.tabs !== this.props.tabs) {
      alert("Tabs"+nextProps.tabs);
      console.log(nextProps.tabs);
    }
    if (this.props.auth !== nextProps.auth || this.props.authLogin !== nextProps.authLogin) {
        try {
          const value = AsyncStorage.getItem('user_token',(err, result) => {

                if (result !== null && result !== undefined && result !== '') {
                    this.props.loadPurchased();
                    this.props.getPurchasedTours(result);
            }
            });
        } catch (error) {
          // Error retrieving data
        }
    }

  }
  onTabChange(index) {
    if (index === 1) {
      if (this.props.auth || this.props.authLogin ) {
         if ((this.props.purchasedTours === null || this.props.purchasedTours.length === 0) && this.props.isPurchasedLoadedOnce === true ){
          alert("No Purchased tours yet.")
        }
      }else {
        Actions.loginscreen();
      }
    }

  }

  onLoadMore(){
    if (this.props.audioTours[0].current_page < this.props.audioTours[0].total_pages ) {
      this.setState({ page: this.state.page + 1 });
      this.props.loadMoreApi();
      this.props.getAudioTours(this.state.page);
    }
  }

  renderFooter = () => {
    if (this.props.loadMore === true){
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
          }}
        >
          <Spinner
            color='#262626'
            style={{flex: 1, alignSelf: 'center', alignItems: 'center' }} />
        </View>
      );
    }
    else {
      return null;
    }
    };

      _keyExtractor = (item, index) => item.id;

  render() {

    if (this.props.isLoading) {
      return (
            <Spinner
              color='#262626'
              style={{flex: 1, alignSelf: 'center', alignItems: 'center' }}
            />
      );
    } else {
      return (

            <Tabs  style={{marginTop: 60}} onChangeTab={(obj) => this.onTabChange(obj.i)}  >
              <Tab textStyle={{color: '#262626'}} heading="ALL" activeTabStyle={{borderRightWidth: 1, borderColor: '#ddd'}}>
                <View style={{backgroundColor: '#EAE9F0'}}>
                      <FlatList
                        ListFooterComponent={this.renderFooter}
                        onEndReached={() => this.onLoadMore()}
                        onEndReachedThreshold={10}
                        data={this.props.audioTours}
                        keyExtractor={this._keyExtractor}

                        renderItem={({ item }) =>
                          <View style={{flexDirection: 'row',flex: 1,backgroundColor: 'rgba(255, 255, 255, 0.87)'}}>
                            <ListItem
                              style={{flexDirection:'column'}}
                              onPress={() => Actions.audioTourDetail({ tourId: item.id,title: item.title })}
                            >
                              <View
                                style={{ flexDirection: 'row', width: window.width }}
                              >
                              <Spinner color='#262626' animating={this.state.isImageLoading} style={{alignSelf: "center", alignItems: "center",position: 'absolute', }} />
                                <Thumbnail  style={{alignSelf:'flex-start'}} size={80} source={{uri:item.cover_image_url}}
                                  onLoadEnd={() => this.setState({isImageLoading:false})}
                                  onLoadStart={()=> this.setState({isImageLoading:true})}
                                  onLoad={() => this.setState({isImageLoading:false})}/>
                                <View style={{flexDirection:'column',paddingLeft:20,flex:0.8}}>
                                  <Text  style={{alignSelf:'flex-start'}}>{item.title}</Text>
                                  <View style={{flex:0.3,flexDirection:'row'}}>
                                    <StarRating
                                      disabled={true}
                                      starSize={20}
                                      maxStars={5}
                                      rating={item.review_count}
                                      starColor="#ffa500"
                                    />
                                  </View>
                                  {
                                                 parseFloat(item.single_credit_amount) === 0 ?
                                                   <Text style={{ marginTop: 10 }}>Free</Text>
                                                     :
                                                   <Text style={{ marginTop: 10 }}>{'$'+item.single_credit_amount}</Text>
                                  }
                                </View>
                              </View>
                            </ListItem>
                          </View>
                      } />
                </View>
              </Tab>
              <Tab heading="PURCHASED" textStyle={{color: '#262626'}} activeTabStyle={{borderLeftWidth: 1, borderColor: '#ddd'}}>

                <View style={{ backgroundColor: '#EAE9F0' }}>
                  { ( (this.props.authLogin !== undefined || this.props.auth !== undefined ) && this.props.authLogin === true || this.props.auth === true )?
                      <FlatList
                          onEndReachedThreshold={100}
                          data={this.props.purchasedTours}
                          keyExtractor={item => item.id}
                          renderItem={({ item }) =>
                          <View   style={{flexDirection:'row',flex:1,backgroundColor:'rgba(255, 255, 255, 0.87)'}}>
                            <ListItem style={{flexDirection:'column'}} onPress={() => Actions.purchaseCoverPage({ data: item, tourId: item.id, title:item.tour.title  })}>
                              <View style={{ flexDirection: 'row', width: window.width }}>
                                <Spinner color='#262626' animating={this.state.isImageLoading} style={{alignSelf: "center", alignItems: "center",position: 'absolute'}} />
                                <Thumbnail  style={{alignSelf:'flex-start'}} size={80} source={{uri:item.tour.cover_image_url}}
                                onLoadEnd={() => this.setState({isImageLoading:false})}
                                onLoadStart={()=> this.setState({isImageLoading:true})}
                                onLoad={() => this.setState({isImageLoading:false})} />
                                <View style={{flexDirection:'column',paddingLeft:20,flex:0.8}}>
                                  <Text  style={{alignSelf:'flex-start'}}>{item.tour.title}</Text>
                                  <View style={{flex:0.3,flexDirection:'row'}}>
                                    <StarRating
                                      disabled={true}
                                      starSize={20}
                                      maxStars={5}
                                      rating={item.tour.review_count}
                                      starColor="orange"
                                    />
                                  </View>
                                  {
                                   parseFloat(item.tour.single_credit_amount) === 0 ?
                                     <Text style={{ marginTop: 10 }}>Free</Text>
                                       :
                                     <Text style={{ marginTop: 10 }}>{'$'+item.tour.single_credit_amount}</Text>
                                  }
                                </View>
                              </View>
                            </ListItem>
                          </View>
                        } />
                    :

                      <View style={{ marginTop:50}}>
                        <Text style={{margin: 10, fontSize: 15, textAlign: 'center'}}> Please Login to Purchase tours</Text>
                        <Button style={{alignSelf: 'center', margin: 10}} info onPress={() => Actions.loginscreen()}>
                          <Text style={{color: '#fff'}}> Login </Text>
                        </Button>
                      </View>

                }
                </View>
              </Tab>
            </Tabs>

      );
    }
  }
}

export default connect(mapStateToProps, { getAudioTours, change, loadMoreApi, getPurchasedTours, loadPurchased, loadInitial})(Audio);
