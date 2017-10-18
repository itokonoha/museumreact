import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { login, loadingStarted } from './LoginActions';
import { styles } from '../../style/centerstyle';

const window = Dimensions.get('window');
const mapStateToProps = ({ LoginReducer, SignUpReducer }) => {
  return {
    email: LoginReducer.email,
    password: LoginReducer.password,
    login: LoginReducer.login,
    auth: SignUpReducer.auth,
    loadingSignInWebService: LoginReducer.loadingSignInWebService,

  };
};

class LoginScreen extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  static navigationOptions = {
     headerTitle:"SIGN IN",
     tabBarVisible: false
  }
  /* eslint no-undef: "error"*/
  /* eslint-env browser*/
  ValidateLoginForm() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email === '') {
      alert('Please enter email address');
    } else if (reg.test(this.state.email) === false) {
      alert('Please enter valid email address');
    } else if (this.state.password === '') {
      alert('Please enter email password');
    } else {
      this.props.loadingStarted();
      this.props.login(this.state.email, this.state.password);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop:60, height: '100%' }}>
        <Container style={{ height: '100%' }}>
          <Content style={{ height: '100%' }}>
            <View style={{ position: 'absolute', flexDirection: 'column', width: '100%', height: '50%' }}>
              <View style={{ backgroundColor: '#3f51b5', flex: 1 }} />
            </View>
            <Form style={{ margin: 20, padding: 20, borderColor: "#eeeeee", borderWidth: 1, backgroundColor: '#ffffff' }}>
              <Image source={{ uri: 'http://www.tourize.com/images/logo.png' }} style={{width: 128, height: 27}}/>
              <Text style={{marginTop: 10}}> Sign in with your Tourize account. </Text>
              <Item floatingLabel>
                <Label style={{ color:"#3f51b5" }}>Email</Label>
                <Input
                  placeholderTextColor = "#aaaaaa"
                  autoCapitalize = "none"
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{color:"#3f51b5"}}>Password</Label>
                <Input
                  placeholderTextColor = "#aaaaaa"
                  autoCapitalize = "none"
                  secureTextEntry = {true}
                  onChangeText={(text) => this.setState({ password: text })}
                />
              </Item>
              <View style={{flexDirection: 'row' }}>
                <Button
                  primary
                  style={styles.registerButton}
                  onPress={() => Actions.signup()}
                >
                <Text > Register </Text>
                </Button>
                <Button
                  primary
                  style={styles.submitButton}
                  onPress={() => this.ValidateLoginForm()}
                >
                  <Text > Submit </Text>
                </Button>
              </View>

              <TouchableOpacity
                style={{ alignItems:"center" }}
                onPress={() => Actions.forgotPassword()}
              >
                <Text style = {{ color: "#3f51b5", fontSize: 16, marginTop: 20, justifyContent: "center" }}>
                  Forgot password ?
                </Text>
              </TouchableOpacity>
              <Spinner color='#3f51b5' animating={this.props.loadingSignInWebService}
                style={{ position:'absolute', marginTop: window.height/2-100, left: window.width/2-35 }}
              />
            </Form>
          </Content>
        </Container>
      </View>

    );
  }
}
export default connect(mapStateToProps, { login, loadingStarted })(LoginScreen);
