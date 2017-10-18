import React, { Component } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Image, StatusBar, TouchableOpacity, Modal, Dimensions, AsyncStorage} from 'react-native';
import { Card, ListItem ,SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Footer ,FooterTab ,Badge,Text,Button,Spinner,List,Content,Thumbnail, Container} from 'native-base';
import StarRating from 'react-native-star-rating';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { getAudioTourDetail, change, loadNew, buyFreeTour, showLoading, stopLoading } from './AudioTourDetailActions';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

const window = Dimensions.get('window');

const mapStateToProps = ({AudioTourDetailReducer,LoginReducer,SignUpReducer}) => {
  return {
    audioTourDetail:AudioTourDetailReducer.tourDetail,
    isLoading:AudioTourDetailReducer.loadingDetail,
    title:AudioTourDetailReducer.tourDetail.title,
    auth:SignUpReducer.auth,
    authLogin:LoginReducer.login,
    signUpResponse: SignUpReducer.userData,
    loginResponse: LoginReducer.loginResponse,
    showPurchaseLoading: AudioTourDetailReducer.showPurchaseLoading,
  };
}

class AudioTourDetail extends Component {

  constructor(props){
    super(props);

    this.state = {
      modalCoverPicVisible: false,
      modelReadMoreVisible: false,
      showPurchaseLoading: false,
      isImageLoading: false,
    }
    this.props.loadNew();
    if (this.props.auth === true || this.props.authLogin === true) {
      try {
        const value = AsyncStorage.getItem('user_token',(err, result) => {
            this.props.getAudioTourDetail(this.props.tourId,'?user_token='+result);
          });
      } catch (error) {
      }
    }else {
      this.props.getAudioTourDetail(this.props.tourId,"");
    }

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.authLogin === false &&  nextProps.authLogin === true) {
            try {
              const value = AsyncStorage.getItem('user_token',(err, result) => {
                  this.props.getAudioTourDetail(this.props.tourId,'?user_token='+result);
                });
            } catch (error) {
              // Error retrieving data
            }
    }
    if (this.props.tourId !== nextProps.tourId) {
        if (this.props.auth === true || this.props.authLogin === true) {
          try {
            const value = AsyncStorage.getItem('user_token',(err, result) => {s
                this.props.getAudioTourDetail(this.props.tourId,'?user_token='+result);
              });
          } catch (error) {
            // Error retrieving data
          }
        }else {
          this.props.getAudioTourDetail(this.props.tourId,"");
        }
    }

  }
  componentWillUnmount(){
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBarStyle('dark-content', true);
  }
  onBuyPress(){
      if (this.props.auth || this.props.authLogin) {
        // this.setState({showPurchaseLoading: true})
        // this.props.showLoading();
        if (parseFloat(this.props.audioTourDetail.single_credit_amount) === 0 ) {
          try {
            const value = AsyncStorage.getItem('user_token',(err, result) => {
                this.props.buyFreeTour(this.props.tourId,result);
            });
          } catch (error) {
            // Error retrieving data
          }
        }else {
          alert("In_app Purchase is under development.")
        }

      } else {
          Actions.loginscreen();
      }
  }

  renderListItems() {
    let images=[];

    images.push(this.props.audioTourDetail.cover_image_url);

    for(let i=0;i<this.props.audioTourDetail.stops.length;i++) {
      images.push(this.props.audioTourDetail.stops[i].stop.cover_photo_url);
    }

    if(images.length > 0) {
      return images.map((data, index) => {
        let isImagedLoaded = true;
        return (
          <View key={index}>
            <Spinner color='#262626' animating={isImagedLoaded} style={{alignSelf: "center", alignItems: "center",position: 'absolute', marginTop: window.height/2-20 }} />
            <Image style={{height:window.height}} source={{uri:data}} onLoadEnd={() => isImagedLoaded = false }
              onLoad={() => isImagedLoaded = false }/>
          </View>
        );
      });
    }
  }
  _renderDotIndicator() {
    if (this.props.audioTourDetail !==null && this.props.audioTourDetail.stops !==null ) {
      return <PagerDotIndicator pageCount={this.props.audioTourDetail.stops.length+1} />;
    } else {
      return <PagerDotIndicator pageCount={1} />;
    }

  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (this.props.isLoading) {
      return (
        <Spinner color='#262626' style={{position: 'relative', flex:1,alignSelf:"center",alignItems:"center"}}/>
      );
    } else {
      return (
        <View style={{flex: 1, flexDirection: 'column', marginTop: 63, marginBottom: 50}}>
          <Modal animationType={"none"} transparent={true} visible={this.state.showPurchaseLoading} onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={{marginTop: 0, flex:1}} >
             <Spinner animating={this.state.showPurchaseLoading} color='#262626' style={{flex:1,alignSelf:"center",alignItems:"center"}}/>
            </View>
          </Modal>
          <Modal animationType={"none"} transparent={false} visible={this.state.modalCoverPicVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={{marginTop: 0}}>
              <View>
                <IndicatorViewPager style={{height:window.height-30}} indicator={this._renderDotIndicator()}>
                  {this.renderListItems()}
                </IndicatorViewPager>
                <TouchableOpacity style={{position:"absolute", alignSelf: 'center', width: 45, height: 45, padding: 5, top: 30, right: 10, borderRadius: 50, backgroundColor: '#262626', margin: 'auto', display: 'flex', alignItems: 'center'}} onPress={() => {this.setState({modalCoverPicVisible:false})}}>
                  <Icon size={32} name='close' color={'#ffffff'} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal animationType={"fade"} transparent={false} visible={this.state.modelReadMoreVisible} style={{flexDirection: "column", flex: 1}}>
            <View style={{marginTop: 30, flex:.07, borderBottomWidth: 1, borderColor: '#eee', paddingLeft: 20, paddingRight: 20}}>
              <Text style={{color:"black",fontSize:18}}>{this.props.audioTourDetail.title}</Text>
            </View>
            <View  style={{flex:.93, marginBottom: 82, paddingBottom: 30, borderBottomWidth: 1, borderColor: '#eee'}}>
              <Content style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>
                <Text style={{color:"black",fontSize: 18}}>{this.props.audioTourDetail.description}</Text>
              </Content>
            </View>
            <TouchableOpacity style={{position: "absolute", alignSelf: 'center', width: 45, height: 45, padding: 5, bottom: 20, borderRadius: 50, backgroundColor: '#262626', margin: 'auto', display: 'flex', alignItems: 'center'}}  onPress={() => {this.setState({modelReadMoreVisible:false})}}>
              <Icon size={32} name='close' color={'#ffffff'} />
            </TouchableOpacity>
          </Modal>

          <Container style={{flex:9}}>
            <View style={{backgroundColor: '#262626', position: 'relative', height: 200}}>
              <View style={{margin: 10, backgroundColor: 'rgba(255,255,255,0.15)', borderTopLeftRadius: 2, borderTopRightRadius: 2, position: 'absolute', top: 0, left: 30, right: 30, height: 5}}></View>
              <View style={{margin: 10, backgroundColor: 'rgba(255,255,255,0.3)', borderTopLeftRadius: 4, borderTopRightRadius: 4, position: 'absolute', top: 5, left: 20, right: 20, height: 5}}></View>
              <View style={{margin: 10, backgroundColor: 'rgba(255,255,255,0.5)', borderTopLeftRadius: 6, borderTopRightRadius: 6, position: 'absolute', top: 10, left: 10, right: 10, bottom: 20}}></View>
              <View style={{borderWidth: 5, borderColor: '#fff', margin: 10, backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: 20, left: 0, right: 0, shadowColor:'#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity:0.3, shadowRadius:30}}>
                <TouchableOpacity onPress={() => {this.setState({modalCoverPicVisible:true})}}>
                <Spinner color='#262626' animating={true} style={{alignSelf: "center", alignItems: "center",position: 'absolute',marginTop: 100}} />
                 <Image style={{height:200}} source={{uri:this.props.audioTourDetail.cover_image_url}} />
                  </TouchableOpacity>
                 <View style={{backgroundColor:'#262626',position:'absolute',right:10,top:10,borderRadius:10,padding:15,paddingTop:5,paddingBottom:5}}>
                    {
                      parseFloat(this.props.audioTourDetail.single_credit_amount) === 0 ?
                        <Text style={{color:'#ffffff',fontSize:12}}>FREE</Text>
                      :
                        <Text style={{color:'#ffffff',fontSize:12}}>${this.props.audioTourDetail.single_credit_amount}</Text>
                    }
                 </View>
                 <View style={{flexDirection:'row', backgroundColor: 'transparent', paddingLeft: 10, paddingRight :10, marginTop: 10, marginBottom: 10, position: 'absolute', left: 5, top: 5}}>
                    <StarRating
                      disabled={true}
                      starSize={20}
                      maxStars={5}
                      rating={this.props.audioTourDetail.review_count}
                      starColor="#ffa500"
                    />
                 </View>
              </View>
            </View>
            <View style={{padding:10, marginTop: 40, backgroundColor: 'transparent'}}>
               <Text style={{fontSize:16, marginTop:5, textAlign: 'center'}}>{this.props.audioTourDetail.title}</Text>
            </View>
            <View style={{paddingLeft: 10, paddingRight: 10, backgroundColor: 'transparent'}}>
               <Text numberOfLines={1} ellipsizeMode='tail' style={{lineHeight:15, fontSize: 12, textAlign: 'center'}}>
                {this.props.audioTourDetail.description}
              </Text>
              <TouchableOpacity  onPress={() => {this.setState({modelReadMoreVisible:true})}}>
                <Text style={{color:'#3f51b5', marginTop:5, fontSize: 12, marginBottom: 10, textAlign: 'center'}}>READ MORE</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding:10, paddingTop:0, flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', backgroundColor: 'transparent'}}>
              <Text style={{paddingRight:10,paddingTop:5}}>STOPS</Text>
              <Badge style={{backgroundColor: 'black', height: 25, width: 'auto'}}>
                 <Text style={{color: '#ffffff',fontSize: 10}}>{this.props.audioTourDetail.stops.length}</Text>
              </Badge>
            </View>
            <Content>
            <List style={{ marginBottom: 50, paddingLeft: 10, paddingRight: 10, backgroundColor: 'transparent'}} dataArray={this.props.audioTourDetail.stops}
              renderRow={(item) =>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5, marginTop: 5, padding: 15, display: 'flex', backgroundColor: '#fafafa', shadowColor:'#000', shadowOffset: { width: 0, height: 0.2 }, shadowOpacity: 0.2, shadowRadius: 4, alignItems: 'center' }}>
                <Spinner color='#262626' animating={this.state.isImageLoading} style={{alignSelf: "center", alignItems: "center",position: 'absolute',left: 20 }} />
                <Image
                 small source={{uri:item.stop.cover_photo_url}} style={{borderRadius: 8, height: 60, width: 60, marginRight: 15}}
                 onLoadEnd={() => this.setState({ isImageLoading: false}) }
                 onLoadEnd={() => this.setState({ isImageLoading: false}) }
                 onLoadStart={() => this.setState({ isImageLoading: true}) }
                />
                <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <Text style={{fontWeight: '500', paddingTop: 4, paddingBottom: 4, fontSize: 14}} numberOfLines={2}>{item.stop.stop_title}</Text>
                  <Text style={{fontWeight: '500', paddingTop: 4, paddingBottom: 4, fontSize: 10}} numberOfLines={1}>{item.stop.stop_description}</Text>
                </View>
              </View>
            }>
            </List>
            </Content>
          </Container>
          <View style={{ margin:10, flex:.1}}>

            {
              (this.props.audioTourDetail.orderExists != null && this.props.audioTourDetail.orderExists ==true)?
                <Button full success style={{backgroundColor: '#ef6c00', borderRadius: 20}} onPress={() => Actions.purchaseTourDetail({ tourId: this.props.audioTourDetail.orderID })}>
                  <Text>Take Tour</Text>
                </Button>
              :
                <Button full success style={{backgroundColor: '#ef6c00', borderRadius: 20}} onPress={()=>this.onBuyPress()}>
                  {
                    (this.props.auth==true || this.props.authLogin==true)?
                      <Text>Purchase Tour</Text>
                    :
                      <Text>Login to Purchase Tour</Text>
                  }
                </Button>
            }
          </View>
        </View>
      )
    }
  }
}

export default connect(mapStateToProps, { getAudioTourDetail, change, loadNew, buyFreeTour, showLoading, stopLoading })(AudioTourDetail);
