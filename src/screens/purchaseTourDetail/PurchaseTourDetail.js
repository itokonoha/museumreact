import React, { Component } from 'react';
import {
  Actions,
} from 'react-native-router-flux';
import { View, Image, TouchableOpacity, Dimensions, StatusBar, AsyncStorage, DeviceEventEmitter, Modal, NativeModules } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button, Spinner, Content, List, ListItem } from 'native-base';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { getPurchaseTourDetail, change, loadNew } from './PurchaseTourDetailActions';
import RNAudioStreamer from 'react-native-audio-streamer';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import { styles } from '../../style/centerstyle';
const { ReactNativeAudioStreaming } = NativeModules;
import RNFS from 'react-native-fs';

// Possibles states
const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only
/* todo
  gradiant purple position absolute - transition from transparent to purple in bottom have of image.
  add read more button, open window
  make buttons look like mockup
  list item stops and the top part shouldn't scroll
  make buttons work
*/

const window = Dimensions.get('window');

const mapStateToProps = ({PurchaseTourDetailReducer}) => {
  return {
    purchaseTourDetail: PurchaseTourDetailReducer.tourDetail,
    isLoading: PurchaseTourDetailReducer.loadingDetail,
  }
}

class PurchaseTourDetail extends Component {
  constructor(props) {
    super(props);

    StatusBar.setBarStyle('dark-content', false);
    StatusBar.setBarStyle('light-content', true);

    this.state = {
      trackTitle: '',
      activeStop: null,
      trackUrl: '',
      playIconName: 'play-circle-filled',
      playerStatus: '',
      modalPlayerVisible: false,
      currentCount: 0,
      modalReadMoreVisible: false,
      modalCoverPicVisible: false,
      status: STOPPED,
      isDownloading: false,
    };
    const tourId = this.props.tourId;
        try {
          const value = AsyncStorage.getItem('user_token',(err, result) => {
              this.props.getPurchaseTourDetail(tourId, result);
            });
        } catch (error) {
          // Error retrieving data
          console.log("Error getting Token",error);
        }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tourId !== nextProps.tourId) {
      this.props.loadNew();
      this.props.getPurchaseTourDetail(nextProps.tourId);
    }
  }
  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener(
        'AudioBridgeEvent', (evt) => {
            // We just want meta update for song name
            if (evt.status === METADATA_UPDATED && evt.key === 'StreamTitle') {
                this.setState({song: evt.value});
            } else if (evt.status != METADATA_UPDATED) {
                this.setState(evt);
            }
        }
    );

    ReactNativeAudioStreaming.getStatus((error, status) => {
        console.log(status);
        (error) ? console.log(error) : this.setState(status)

    });
      this.watchID = navigator.geolocation.watchPosition((lastPosition) => {

        console.log("t---",lastPosition);
        alert('New Location='+lastPosition.coords.latitude+lastPosition.coords.longitude );
       //alert(lastPosition.coords.latitude,lastPosition.coords.longitude)
       //console.log("LocationUpdate",lastPosition);
     },
     (error) => console.log(error),
     {enableHighAccuracy: true, timeout: 0, maximumAge: 100, enableHighAccuracy:true, distanceFilter:0 });
  }
  componentWillUnmount(){
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBarStyle('dark-content', true);
    ReactNativeAudioStreaming.stop();
    navigator.geolocation.clearWatch(this.watchID);
  }

  onNextClick() {
    if (this.state.currentCount < this.props.purchaseTourDetail.tour.stops.length-1) {
      ReactNativeAudioStreaming.stop();
      var position = this.state.currentCount;
      position = position+1;
      this.setState({ playerStatus: 'newSound', currentCount: this.state.currentCount + 1 });
      var updatedSound = this.props.purchaseTourDetail.tour.stops[position].assets[0].attachment_url;
      this.setState({ trackUrl: this.props.purchaseTourDetail.tour.stops[position].assets[0].attachment_url,
        activeStop: this.props.purchaseTourDetail.tour.stops[position] });
        ReactNativeAudioStreaming.play(updatedSound, {showIniOSMediaCenter: true, showInAndroidNotifications: true});

      }
  }

  onPreviousClick() {
    if (this.state.currentCount > 0) {
      ReactNativeAudioStreaming.stop();
      var position = this.state.currentCount;
      position = position-1;
      var updatedSound = this.props.purchaseTourDetail.tour.stops[position].assets[0].attachment_url;
      this.setState({ playerStatus: 'newSound', currentCount: this.state.currentCount - 1 });
      this.setState({ trackUrl: this.props.purchaseTourDetail.tour.stops[position].assets[0].attachment_url,
        activeStop: this.props.purchaseTourDetail.tour.stops[position] }
      );
      ReactNativeAudioStreaming.play(updatedSound, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
    }
  }

  onPlayClick(data,position) {
    ReactNativeAudioStreaming.stop();
    this.setState({
      trackTitle: data.assets[0].attachment_file_name,
      activeStop: data,
      currentCount: position,
      trackUrl: data.assets[0].attachment_url,
      playIconName: 'play-circle-filled',
      playerStatus: 'newSound' });
      ReactNativeAudioStreaming.play(data.assets[0].attachment_url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
  }

  onInfoClick(data,position) {
    ReactNativeAudioStreaming.stop();
    this.setState({
      trackTitle: null,
      activeStop: data,
      currentCount: position,
      trackUrl: null,
      playIconName: 'play-circle-filled',
      playerStatus: 'newSound'
    });
  }

  onStopClick(data,position) {
    this.setState({ playerStatus: 'newSound' });
    ReactNativeAudioStreaming.stop();
    this.setState({
      trackTitle: data.assets[0].attachment_file_name,
      activeStop: data,
      currentCount: position,
      trackUrl: data.assets[0].attachment_url,
      playIconName: 'play-circle-filled',
      playerStatus: 'newSound' });
            console.log('PLAY,Count',this.state.currentCount);
  }

  _statusChanged(status) {
    if (status === PLAYING) {
      this.setState({ playIconName: 'pause-circle-filled', playerStatus: status });
    }
    if (status === STOPPED) {
      this.setState({ playIconName: 'play-circle-filled', playerStatus: status });
    }
    if (status === STREAMING) {
      //console.log('this.state.playerStatus', 'newSound');
      this.setState({ playIconName: 'play-circle-filled', playerStatus: 'newSound' });
    }
    else if (status === PAUSED ) {
      this.setState({ playIconName: 'play-circle-filled', playerStatus: status });
    }
  }

  onUpArrowClick() {
    this.setState({ modalPlayerVisible: true });
  }

  onCrossClick() {
    this.setState({ modalPlayerVisible: false });
  }

  playsound() {
    switch (this.state.status) {
           case PLAYING:
           case STREAMING:

               ReactNativeAudioStreaming.pause();
               break;
           case PAUSED:

               ReactNativeAudioStreaming.resume();
               break;
           case STOPPED:
           case ERROR:

               ReactNativeAudioStreaming.play(this.state.trackUrl, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
               break;
           case BUFFERING:
               ReactNativeAudioStreaming.stop();
               break;
       }
  }

  onDownloadPress() {
    for (var i = 0; i < this.props.purchaseTourDetail.tour.stops.length; i++) {
      var path = RNFS.DocumentDirectoryPath + '/'+this.props.purchaseTourDetail.tour.stops[i].assets[0].attachment_file_name;
      this.setState({ isDownloading: true })
      RNFS.downloadFile({
        fromUrl: this.props.purchaseTourDetail.tour.stops[i].assets[0].attachment_url,
        toFile: path,
      }).promise.then((r) => {
        console.log('Download',r)
        this.setState({ isDownloading: false })
      });
    }
  }
  renderListItems() {
    if (this.props.purchaseTourDetail.tour.stops.length > 0){
      return this.props.purchaseTourDetail.tour.stops.map((data, index) => {
        return(
          <ListItem style={{ marginBottom: 5, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#ffffff', flex: 0.1 }} >
              {index + 1 + '.'}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{ fontWeight: '500', color: '#ffffff', flex: 0.8 }} >
              { data.stop_title }
            </Text>
            {
              (data.assets.length > 0) ?
                <View>
                  {
                    (this.state.trackUrl === data.assets[0].attachment_url && (this.state.status === STREAMING || this.state.status === PLAYING ))?
                      <TouchableOpacity onPress={() => this.onStopClick(data, index)}>
                        <Icon
                          style={{ flex: 0.1 }}
                          size={30}
                          name='stop'
                          color='#2196f3'
                        />
                      </TouchableOpacity>
                    :
                      <TouchableOpacity onPress={() => this.onPlayClick(data, index)}>
                        <Icon
                          style={{ flex: 0.1 }}
                          size={30}
                          name='play-circle-outline'
                          color='#2196f3'
                        />
                      </TouchableOpacity>
                  }
                </View>
              :
                <TouchableOpacity  onPress={() => this.onInfoClick(data, index)}>
                  <Icon
                    style={{ flex: 0.1 }}
                    size={30}
                    name='info'
                    color='#2196f3'
                  />
                </TouchableOpacity>
            }
          </ListItem>
        );
      });
    }
    else {
      return (
        <ListItem>
          <Text>No stops</Text>
        </ListItem>
      );
    }
  }

  renderCoverImages(){
    let images=[];

    images.push(this.props.purchaseTourDetail.tour.cover_image_url);

    for(let i=0;i<this.props.purchaseTourDetail.tour.stops.length;i++) {
      images.push(this.props.purchaseTourDetail.tour.stops[i].cover_photo_url);
    }

    if(images.length > 0) {
      return images.map((data, index) => {
        let isImagedLoaded = true;
        return (
          <View key={index}>
            <Spinner color='#262626' animating={isImagedLoaded} style={{alignSelf: "center", alignItems: "center",position: 'absolute', marginTop: window.height/2-20 }} />
            <Image style={{height: 600}} source={{uri: data }}   onLoadEnd={() => isImagedLoaded = false }
              onLoadStart={()=>console.log('Load Started')}
              onLoad={() => isImagedLoaded = false }/>
          </View>
        );
      });
    }
  }
  _renderDotIndicator() {
    if (this.props.purchaseTourDetail !==null && this.props.purchaseTourDetail.tour.stops !==null ) {
      return <PagerDotIndicator pageCount={this.props.purchaseTourDetail.tour.stops.length+1} />;
    } else {
      return <PagerDotIndicator pageCount={1} />;
    }
  }
  render() {
    let icon = null;
    let playerIcon = null;
       switch (this.state.status) {
           case PLAYING:
           case STREAMING:
               icon = <Icon
                        style={{ flex: 0.1, paddingLeft: 10, marginTop: 10 }}
                        size={30}
                        color='#2196f3'
                        name={'pause-circle-filled'}
                      />;
              playerIcon = <Icon
                             size={50}
                             color='#fff'
                             name={'pause-circle-filled'}
                             onPress={() => this.playsound()}
                           />;
               break;
           case PAUSED:
           case STOPPED:
           case ERROR:
               icon = <Icon
                        style={{ flex: 0.1, paddingLeft: 10, marginTop: 10 }}
                        size={30}
                        color='#2196f3'
                        name={'play-circle-filled'}
                      />;
              playerIcon = <Icon
                            size={50}
                            color='#fff'
                            name={'play-circle-filled'}
                            onPress={() => this.playsound()}
                           />;
               break;
           case BUFFERING:
           case BUFFERING_START:
           case START_PREPARING:
               icon = <Spinner
                        color='#2196f3'
                        animating={true}
                        style={{height: 30}}
                      />;
               playerIcon = <Spinner
                              color='#fff'
                              animating={true}
                              style={{height: 30}}
                            />;
               break;
       }

    if (this.props.isLoading) {
      return (
        <Spinner color='#262626' style={{flex:1,alignSelf:"center",alignItems:"center"}}/>
      );
    } else {
      return (
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#262626' }}>
          <Modal animationType={"none"} transparent={false} visible={this.state.modalCoverPicVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
            <View style={{marginTop: 22}}>
              <View>
                <IndicatorViewPager style={{height:600}} indicator={this._renderDotIndicator()}>
                  {this.renderCoverImages()}
                </IndicatorViewPager>
                <TouchableOpacity style={{position:"absolute", alignSelf: 'center', width: 45, height: 45, padding: 5, bottom: 20, borderRadius: 50, backgroundColor: '#262626', margin: 'auto', display: 'flex', alignItems: 'center'}} onPress={() => {this.setState({modalCoverPicVisible:false})}}>
                  <Icon size={32} name='close' color={'#ffffff'} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal animationType={"slide"} transparent={false} visible={this.state.modalPlayerVisible} onRequestClose={() => {alert("Modal has been closed.")}}>
            {this.state.activeStop &&
              <View style={{flex: 1, flexDirection: 'column', position: 'relative', backgroundColor: '#fff', width: window.width, overflow: 'hidden', height: window.height }}>
                <View style={{ flex: 0.1, position: 'relative', zIndex: 10}}>
                  <Icon2 size={40} name='chevron-down' color='#ffffff' onPress={() => this.onCrossClick()} style={{backgroundColor: 'transparent', marginLeft: 'auto', position: 'absolute', top: 25, right: 15}} />
                </View>
                <View style={{ flex: 0.4, position: 'relative', backgroundColor: '#fff' }}>
                  <View style={{backgroundColor: '#262626', transform: [{ rotate: '5deg'}], position: 'absolute', top: -100, height: 250, width: '120%', left: -20}}></View>
                  <View style={{margin: 10, backgroundColor: 'rgba(255,255,255,0.3)', borderTopLeftRadius: 4, borderTopRightRadius: 4, position: 'absolute', top: 0, left: 40, right: 40, height: 5}}></View>
                  <View style={{margin: 10, backgroundColor: 'rgba(255,255,255,0.5)', height: 215, borderTopLeftRadius: 6, borderTopRightRadius: 6, position: 'absolute', top: 5, left: 22, right: 22, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10}}></View>
                  <View style={{borderWidth: 5, borderColor: '#fff', margin: 10, backgroundColor: '#fff', borderRadius: 8, position: 'absolute', top: 10, left: 12, right: 12}}>
                  <Image style={{height: 200 }} source={{uri: this.state.activeStop.cover_photo_url}} />
                  </View>
                </View>
                <View style={{ flex: 0.5, backgroundColor: 'transparent', alignItems: 'center', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <View style={{padding: 20, backgroundColor: '#fff', width: window.width, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: '#262626', fontSize: 20 }} numberOfLines={1}>{this.state.activeStop.stop_title}</Text>
                    <Text style={{ color: '#262626', marginTop: 10, marginBottom: 10, fontSize: 14 }} numberOfLines={10}>{this.state.activeStop.stop_description}</Text>
                    {
                      this.state.activeStop.assets.length > 0 &&
                         <Text style={{ color: '#2196f3', fontSize: 14, marginLeft: 20, marginRight: 20}} numberOfLines={1}>{this.state.activeStop.assets[0].attachment_file_name}</Text>
                    }
                  </View>
                  {
                      this.state.activeStop.assets.length > 0 &&
                        <View style={{padding: 10, backgroundColor: '#2196f3', width: window.width, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <View style={{ flexDirection:'row', alignItems: 'center', padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name='skip-previous' size={35} color='#fff' onPress={() => this.onPreviousClick()} />
                              <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                  {playerIcon}
                              </View>
                            <Icon name='skip-next' size={35} color='#fff' onPress={() => this.onNextClick()} />
                          </View>
                        </View>
                  }
                </View>
              </View>
            }
          </Modal>
          <Modal animationType={"fade"} transparent={false} visible={this.state.modalReadMoreVisible} style={{flexDirection: "column", flex: 1}}>
            <View style={{marginTop: 30, flex:.07, borderBottomWidth: 1, borderColor: '#eee', paddingLeft: 20, paddingRight: 20}}>
              <Text style={{color:"black",fontSize:18}}>{this.props.purchaseTourDetail.tour.title}</Text>
            </View>
            <View  style={{flex:.93, marginBottom: 82, paddingBottom: 30, borderBottomWidth: 1, borderColor: '#eee'}}>
              <Content style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>
                <Text style={{color:"black",fontSize: 18}}>{this.props.purchaseTourDetail.tour.description}</Text>
              </Content>
            </View>
            <TouchableOpacity style={{position: "absolute", alignSelf: 'center', width: 45, height: 45, padding: 5, bottom: 20, borderRadius: 50, backgroundColor: '#262626', margin: 'auto', display: 'flex', alignItems: 'center'}}  onPress={() => {this.setState({modalReadMoreVisible:false})}}>
              <Icon size={32} name='close' color={'#ffffff'} />
            </TouchableOpacity>
          </Modal>

          <View style={{ flex: 1, display: 'flex', marginBottom: 50}}>
            <View>
              <View style={{position: 'relative', left: 0, right: 0, backgroundColor: '#262626', overflow: 'hidden', width: window.width}}>
                <Image
                  style={{height:200}}
                  source={{uri:this.props.purchaseTourDetail.tour.cover_image_url}}
                />

                <View style={{backgroundColor: 'rgba(38, 38, 38, 0.3)', position: 'absolute', top: 0, bottom: -20, height: '150%', left: 0, right: 0, width: '100%', padding: 15, paddingTop: 70}}>
                  <Text style={{color:'#fff', fontSize: 16, margin: 5, fontWeight: 'bold'}}>{this.props.purchaseTourDetail.tour.title}</Text>
                  <Text numberOfLines={1} style={{color:'#fff', margin: 5, fontSize: 12}}>{this.props.purchaseTourDetail.tour.description.substring(0, 135)}...</Text>
                  <TouchableOpacity onPress={() => { this.setState({ modalReadMoreVisible: true })}} style={{position: 'relative', margin: 5, borderRadius: 50, backgroundColor: '#fff', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 15, width: 95}}>
                    <Text style={{color:'#262626', fontSize: 12}}>READ MORE</Text>
                  </TouchableOpacity>
                  {
                    /*
                      <TouchableOpacity onPress={() => { this.setState({ modalCoverPicVisible: true })}} style={{borderRadius: 50, backgroundColor: '#fff', paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 15, width: 95,alignSelf:'flex-end'}}>
                        <Text style={{color:'#262626', fontSize: 12}}>View Stops</Text>
                      </TouchableOpacity>
                    */
                  }
                </View>
                <View style={{backgroundColor: '#262626', transform: [{ rotate: '3deg'}], position: 'absolute', bottom: -25, height: 50, width: '120%', left: -20}}></View>
              </View>
              <View style={{ marginTop: -20, padding: 30, display: 'flex', flexDirection: 'row' }}>
                <Button success style={{backgroundColor: '#eee', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'flex-start'}} onPress={() => Actions.tourMaps({stops: this.props.purchaseTourDetail.tour.stops})}>
                  <View style={{alignSelf: 'flex-start', display: 'flex', marginRight: 5 }}>
                    <Text style={{fontSize: 14, color: '#262626', fontWeight: '600' }}>
                      MAP VIEW
                    </Text>
                    <Text style={{fontSize: 12, color: '#262626'}}>or enter #</Text>
                  </View>
                  <Icon name="map" size={26} color={'#262626'}/>
                </Button>
                <Button  success style={{backgroundColor: '#2196f3', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'flex-end', marginLeft: 'auto'}} onPress={() => this.onDownloadPress()}>
                  <View style={{ alignSelf: 'flex-start', display: 'flex', marginRight: 5}}>
                    <Text style={{ fontSize: 14, color: '#fff', fontWeight: '600' }}>
                      DOWNLOAD
                    </Text>
                    <Text style={{ fontSize: 12, color: '#fff'}}>all content</Text>
                  </View>
                  {
                    (this.state.isDownloading === false)?
                      <Icon name="cloud-download" size={26} color={'#fff'} />
                    :
                      <Spinner color='#fff' style={{flex:1,alignSelf:"center",alignItems:"center"}}/>
                  }

                </Button>
              </View>
            </View>

            <Content style={{ flex: 0.1}}>
              <List style={{paddingBottom: 80}}>
                { this.renderListItems()}
              </List>
            </Content>
            {
              this.state.trackUrl !== '' ?
                <View style={{ position: 'absolute', padding: 10, bottom: 0, left: 0, right: 0, backgroundColor: '#fff' }} >
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {
                      this.state.activeStop.assets.length > 0 &&
                      <TouchableOpacity onPress={() => this.playsound()}>
                        {icon}
                      </TouchableOpacity>
                    }
                    <View style={{ flex: 0.8, flexDirection: 'column',alignItems: 'center' }}>
                      <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: 'black' }}>
                        {this.state.activeStop.stop_title}
                      </Text>
                      {
                        this.state.activeStop.assets.length > 0 &&
                          <Text style={{ color: '#2196f3' }}>
                            {this.state.trackTitle}
                          </Text>
                      }
                    </View>
                    <Icon2 onPress={() => this.onUpArrowClick()} style={{ flex: 0.1, paddingRight: 10 }} size={30} color='black' name='chevron-up'/>
                  </View>
                </View>
              :
                <View></View>
            }
          </View>
        </View>
      )
    }
  }
}

export default connect(mapStateToProps,{getPurchaseTourDetail,change,loadNew})(PurchaseTourDetail);
