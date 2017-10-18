import React, {
  Component,
} from 'react';

import {
  Scene,
  Router,
  Actions,
  Stack,
} from 'react-native-router-flux';

import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  Button,
  Image
} from 'react-native';
import { Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './screens/home/Home';
import Maps from './screens/maps/Maps';
import TourMaps from './screens/TourMaps'
import Audio from './screens/audio/Audio';
import More from './screens/more/More';
import ContentTab from './screens/content/ContentTab';
import LoginScreen from './screens/login/LoginScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ForgotPassword from './screens/Forgot/ForgotPassword';
import AudioTourDetail from './screens/audioTourDetail/AudioTourDetail';
import PurchaseTourDetail from './screens/purchaseTourDetail/PurchaseTourDetail';
import ContentDetail from './screens/content/contentDetail/contentDetail';
import NewContent from './screens/content/newContent/newContent';
import SearchResults from './screens/content/searchTab/searchResults/SearchResults';
import SignupScreen from './screens/signup/SignupScreen';
import PurchaseCoverPage from './screens/purchaseCoverPage/PurchaseCoverPage';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import {styles} from './style/centerstyle';
import { getTabs } from './RouterActions';
class TabIcon extends Component {
  render() {
    var color = this.props.selected ? '#fff' : '#aaaaaa';
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        {
          (this.props.iconName.includes('http') === true)?
          <Image style={{width:18,height:18}} source={{uri: this.props.iconName}} />
          :
          <Icon style={{color: color}} name={this.props.iconName || "circle"} size={18}/>
        }
          <Text style={{color: color, fontSize: 12}}>{this.props.tabBarLabel}</Text>

      </View>
    );
  }
}

const mapStateToProps = ({ SignUpReducer, LoginReducer, ProfileReducer, RouterReducer })=> {
  return {
    userData: SignUpReducer.userData,
    auth: SignUpReducer.auth,
    authLogin: LoginReducer.login,
    userTokenLogin: LoginReducer.authentication_token,
    isLoggedOut: ProfileReducer.isLoggedOut,
    tabs: RouterReducer.tabs,
    loading: RouterReducer.loading,
  };
};

class MyApp extends Component {
  constructor(props) {
    super(props);
    console.log("Const",this.props.loading);
    this.state ={
      isloading: true,
      isHomeTab: false,
      isMapTab: false,
      isAudioTab: false,
      isContentTab: false,
      isMoreTab: false,
      homeInitial: false,
      mapInitial: false,
      audioInitial: false,
      contentInitial: false,
      moreInitial: false,
      homeIcon: '',
      mapIcon: '',
      audioIcon: '',
      contentIcon: '',
      moreIcon: '',
      homeName: '',
      mapName: '',
      audioName: '',
      contentName: '',
      moreName: '',
      homeTitle: '',
      mapTitle: '',
      audioTitle: '',
      contentTitle: '',
      moreTitle: '',
    };
    this.props.getTabs();
    if (this.props.tabs.screens !== undefined &&this.props.tabs.screens !== null && this.props.tabs.screens.length >0 ) {
      console.log("HIIIIIIIIIIi");
      for (var i = 0; i < this.props.tabs.screens.length; i++) {
        if (this.props.tabs.screens[i].screen_id === "cab82189-212f-4a58-8e4b-90bf03fe6242") {
          this.setState({isHomeTab:true , homeInitial: this.props.tabs.screens[i].initial,
            homeIcon: this.props.tabs.screens[i].icon,
            homeName: this.props.tabs.screens[i].title,
            homeTitle : this.props.tabs.screens[i].screen_title
           }, () => console.log('HpmeTAbUpdated',this.state.isHomeTab));
        }
        if (this.props.tabs.screens[i].screen_id === "15e5b534-37a3-4ace-a7f2-ed9151925659") {
          this.setState({isMapTab:true, mapInitial: this.props.tabs.screens[i].initial,
             mapIcon: this.props.tabs.screens[i].icon,
             mapName: this.props.tabs.screens[i].title,
             mapTitle : this.props.tabs.screens[i].screen_title
             }, () => console.log('mapsTAbUpdated',this.state.isMapTab));
        }
        if (this.props.tabs.screens[i].screen_id === "9fd51243-ec0d-4a7b-9566-982921e41924") {
          this.setState({isAudioTab:true, audioInitial: this.props.tabs.screens[i].initial,
            audioIcon: this.props.tabs.screens[i].icon,
            audioName: this.props.tabs.screens[i].title,
            audioTitle : this.props.tabs.screens[i].screen_title
            }, () => console.log('AudioTAbUpdated',this.state.isAudioTab));
        }
        if (this.props.tabs.screens[i].screen_id === "839b2712-5f5c-4e8c-b757-10cb65334643") {
          this.setState({isContentTab:true, contentInitial: this.props.tabs.screens[i].initial,
             contentIcon: this.props.tabs.screens[i].icon,
             contentName: this.props.tabs.screens[i].title,
             contentTitle: this.props.tabs.screens[i].screen_title
           }, () => console.log('ContentTAbUpdated',this.state.isContentTab));
        }
        if (this.props.tabs.screens[i].screen_id === "9fb24608-a67e-436b-b629-66efbeafae9b") {
          this.setState({isMoreTab:true, moreInitial: this.props.tabs.screens[i].initial,
             moreIcon: this.props.tabs.screens[i].icon,
             moreName: this.props.tabs.screens[i].title,
             moreTitle : this.props.tabs.screens[i].screen_title
              },  () => console.log('MoreTAbUpdated',this.state.isMoreTab));
        }
      }
    }

}

  componentWillReceiveProps(nextProps) {

    if (nextProps.loading !== this.props.loading) {
      for (var i = 0; i < nextProps.tabs.screens.length; i++) {
        if (nextProps.tabs.screens[i].screen_id === "cab82189-212f-4a58-8e4b-90bf03fe6242") {
          this.setState({isHomeTab:true , homeInitial: nextProps.tabs.screens[i].initial,
            homeIcon: nextProps.tabs.screens[i].icon,
            homeName: nextProps.tabs.screens[i].title,
            homeTitle : nextProps.tabs.screens[i].screen_title

          }, () => console.log('HpmeTAbUpdated',this.state.isHomeTab));
        }
        if (nextProps.tabs.screens[i].screen_id === "15e5b534-37a3-4ace-a7f2-ed9151925659") {
          this.setState({isMapTab:true, mapInitial: nextProps.tabs.screens[i].initial,
            mapIcon: nextProps.tabs.screens[i].icon,
            mapName: nextProps.tabs.screens[i].title,
            mapTitle : nextProps.tabs.screens[i].screen_title
             }, () => console.log('mapsTAbUpdated',this.state.isMapTab));
        }
        if (nextProps.tabs.screens[i].screen_id === "9fd51243-ec0d-4a7b-9566-982921e41924") {
          this.setState({isAudioTab:true, audioInitial: nextProps.tabs.screens[i].initial,
            audioIcon: nextProps.tabs.screens[i].icon,
            audioName: nextProps.tabs.screens[i].title,
            audioTitle : nextProps.tabs.screens[i].screen_title
            }, () => console.log('AudioTAbUpdated',this.state.isAudioTab));
        }
        if (nextProps.tabs.screens[i].screen_id === "839b2712-5f5c-4e8c-b757-10cb65334643") {
          this.setState({isContentTab:true, contentInitial: nextProps.tabs.screens[i].initial,
            contentIcon: nextProps.tabs.screens[i].icon,
            contentName: nextProps.tabs.screens[i].title,
            contentTitle : nextProps.tabs.screens[i].screen_title
            }, () => console.log('ContentTAbUpdated',this.state.isContentTab));
        }
        if (nextProps.tabs.screens[i].screen_id === "9fb24608-a67e-436b-b629-66efbeafae9b") {
          this.setState({isMoreTab:true, moreInitial: nextProps.tabs.screens[i].initial,
            moreIcon: nextProps.tabs.screens[i].icon,
            moreName: nextProps.tabs.screens[i].title,
            moreTitle : nextProps.tabs.screens[i].screen_title
          }, () => console.log('MoreTAbUpdated',this.state.isMoreTab));
        }
      }
      this.setState({ isloading: nextProps.loading}, ()=> console.log("Updated Logs",this.state.isloading))
    }
  }
  onloginPress() {
    console.log("====LOGOUT", this.props.isLoggedOut);
    console.log("Auth login",this.props.authLogin);
    console.log("Sign login",this.props.auth);
    if ( (this.props.auth === true || this.props.authLogin === true)) {

      Actions.profileScreen()
    } else {
      Actions.loginscreen()
    }
  }

  button(){
    return(
      <TouchableOpacity >
        <View >
          <Icon style={{color: "#262626"}} name="face" size={20} onPress={() => this.onloginPress()}/>
        </View>
      </TouchableOpacity>
    )
  }
  saveButton(){
    return(
      <TouchableOpacity onPress={()=>Actions.menu()} style={{ backgroundColor: 'transparent', width: 40, height: 40, right: 5, top: 5, position: 'absolute'}}>
            <Icon style={{color: "#fff"}} name="save" size={20} onPress={() => alert("Save Clicked")}/>
      </TouchableOpacity>
    )
  }
  back(){
    return(
      <TouchableOpacity >
        <View >
          <Icon style={{color: "#262626"}} name="arrow-back" size={20} onPress={() => Actions.audioTabView()}/>
        </View>
      </TouchableOpacity>
    )
  }
  empty() {
    Actions.loginscreen();
  }

  render(){
    console.log("Render",this.state.isloading);
    if (this.props.loading) {
      return (
        <Spinner
          color='#262626'
          style={{flex: 1, alignSelf: 'center', alignItems: 'center' }}
        />
      );
    }else {
      return(
        <Router>
          <Stack key="root">
            {
               (this.props.tabs === undefined || this.props.tabs === null || this.props.tabs.length ===0 )?
                <Scene  key="homeTab"
                  title="WELCOME"
                  iconName="home"
                  hideNavBar={false}
                  initial
                  component={Home}
                  navigationBarStyle={{ backgroundColor: '#ffffff' }}
                  titleStyle={ {color: '#262626'}}
                  renderRightButton={()=>this.button() }
                />
                :
                <Scene key="main" tabs tabBarStyle={styles.tabBar} default="tab1" showLabel={true} >
                  {
                    (this.state.isHomeTab === true )?
                    <Scene  key="homeTab"
                      title={this.state.homeTitle}
                      tabBarLabel={this.state.homeName}
                      iconName={this.state.homeIcon}
                      icon={TabIcon}
                      hideNavBar={false}
                      initial={this.state.homeInitial}
                      component={Home}
                      navigationBarStyle={{ backgroundColor: '#ffffff' }}
                      titleStyle={ {color: '#262626'}}
                      renderRightButton={()=>this.button() }

                    />
                    :
                    null
                  }
                  {
                    (this.state.isMapTab === true )?
                    <Scene key="mapsTab"
                      title={this.state.mapTitle}
                      tabBarLabel={this.state.mapName}
                      iconName={this.state.mapIcon}
                      icon={TabIcon}
                      initial={this.state.mapInitial}
                      hideNavBar={false}
                      renderRightButton={()=>this.button() }
                      component={Maps}
                      navigationBarStyle={{ backgroundColor: '#ffffff' }}
                      titleStyle={ {color: '#262626'}}
                    />
                    :
                    null
                  }
                  {
                    (this.state.isAudioTab === true )?
                    <Scene key="audioTabView"
                      title={this.state.audioTitle}
                      tabBarLabel={this.state.audioName}
                      iconName={this.state.audioIcon}
                      icon={TabIcon}
                      initial={this.state.audioInitial}
                      hideNavBar={false}
                      renderRightButton={()=>this.button() }
                      component={Audio}
                      navigationBarStyle={{ backgroundColor: '#ffffff' }}
                      titleStyle={ {color: '#262626'}}
                    />
                    :
                    null
                  }
                  {
                    (this.state.isContentTab === true )?
                    <Scene  key="contentTab"
                      title={this.state.contentTitle}
                      tabBarLabel={this.state.contentName}
                      iconName={this.state.contentIcon}
                      icon={TabIcon}
                      initial={this.state.contentInitial}
                      renderRightButton={()=>this.button() }
                      hideNavBar={false}
                      component={ContentTab}
                      navigationBarStyle={{ backgroundColor: '#ffffff' }}
                      titleStyle={ {color: '#262626'}}
                    />
                    :
                    null
                  }
                  {
                  (this.state.isMoreTab === true )?
                  <Scene  key="moreTab"
                    title={this.state.moreTitle}
                    tabBarLabel={this.state.moreName}
                    iconName={this.state.moreIcon}
                    initial={this.state.moreInitial}
                    icon={TabIcon}
                    renderRightButton={()=>this.button() }
                    hideNavBar={false}
                    component={More}
                    navigationBarStyle={{ backgroundColor: '#ffffff' }}
                    titleStyle={ {color: '#262626'}}
                  />
                  :
                  null
                  }
                </Scene>

            }

            <Scene key="purchaseCoverPage"
              title=""
              hideNavBar={false}
              component={PurchaseCoverPage}
              navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor:"transparent" }}
              leftButtonIconStyle={{ tintColor: '#000' }}
              titleStyle={ {color: '#000'}}
            />
            <Scene key="purchaseTourDetail"
              title=""
              hideNavBar={false}
              component={PurchaseTourDetail}
              navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor:"transparent" }}
              leftButtonIconStyle={{ tintColor: '#fff' }}
              titleStyle={ {color: '#fff'}}
            />

            <Scene key="audioTourDetail"
              title="Audio Tour Detail"
              hideNavBar={false}
              component={AudioTourDetail}
              navigationBarStyle={{ backgroundColor: '#262626', borderBottomColor:"transparent" }}
              leftButtonIconStyle={{ tintColor: '#fff' }}
              titleStyle={ {color: '#fff'}}

            />
            <Scene  key="contentDetail"
              title="Content Detail"
              renderLeftButton={()=>this.button()}
              hideNavBar={false}
              component={ContentDetail}
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={ {color: '#262626'}}
            />
            <Scene  key="newContent"
              title="Create a Post"
              renderLeftButton={()=>this.button()}
              hideNavBar={false}
              component={NewContent}
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={ {color: '#262626'}}
            />
            <Scene  key="searchResults"
              title="Content Detail"
              hideNavBar={false}
              component={SearchResults}
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={ {color: '#262626'}}
            />
            <Scene  key="profileScreen"
              title="PROFILE"
              hideNavBar={false}
              component={ProfileScreen}
              renderRightButton={()=>this.saveButton() }
              navigationBarStyle={{ backgroundColor: '#262626', borderBottomColor:"transparent" }}
              leftButtonIconStyle={{ tintColor: '#fff' }}
              rightButtonIconStyle={{ tintColor: '#fff' }}
              titleStyle={ {color: '#fff'}}
            />
            <Scene  key="loginscreen"
              title="SIGN IN"
              hideNavBar={false}
              component={LoginScreen}
              navigationBarStyle={{ backgroundColor: '#3f51b5', borderWidth: 0, borderBottomColor:"transparent" }}
              leftButtonIconStyle={{ tintColor: '#fff' }}
              titleStyle={ {color: '#fff'}}
            />
            <Scene key="forgotPassword"
              title="FORGOT PASSWORD"
              hideNavBar={false}
              component={ForgotPassword}
              navigationBarStyle={{ backgroundColor: '#ffffff' }}
              titleStyle={ {color: '#262626'}}
            />
            <Scene key="signup"
              title="SIGN UP"
              hideNavBar={false}
              component={SignupScreen}
              navigationBarStyle={{ backgroundColor: '#3f51b5', borderWidth: 0, borderBottomColor:"transparent" }}
              leftButtonIconStyle={{ tintColor: '#fff' }}
              titleStyle={ {color: '#fff'}}
            />
            <Scene key="tourMaps"
              title="Tour Map"
              hideNavBar={false}
              component={TourMaps}
              navigationBarStyle={{ backgroundColor: '#262626', borderWidth: 0, borderBottomColor:"transparent" }}
              leftButtonIconStyle={{ tintColor: '#fff' }}
              titleStyle={ {color: '#fff'}}
            />
          </Stack>
        </Router>
      )
    }
  }
}

export default connect( mapStateToProps, { getTabs} )(MyApp);
