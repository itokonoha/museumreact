import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { signUp, loadingStarted } from './SignUpActions';
import { styles } from '../../style/centerstyle';

const window = Dimensions.get('window');

const mapStateToProps = ({ SignUpReducer }) => {

  return {
    userData: SignUpReducer.userData,
    auth: SignUpReducer.auth,
    loadingWebService: SignUpReducer.loadingWebService,
  };
};

class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      avatarSource: null,
      isLoading: false,
    };
  }

  // Validate Sign up form
  /* eslint no-undef: "error"*/
  /* eslint-env browser*/
  ValidateSignupForm() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.firstName === '') {
      alert('Please enter first name.');
    } else if (this.state.lastName === '') {
      alert('Please enter last name');
    } else if (this.state.email === '') {
      alert('Please enter email address');
    } else if (reg.test(this.state.email) === false) {
      alert('Please enter valid email address');
    } else if (this.state.password === '') {
      alert('Please enter email password');
    } else if (this.state.password !== this.state.confirmPassword) {
      alert('Please match your password.');
    } else {
      this.setState({ isLoading: true });
      this.props.loadingStarted();
      this.props.signUp(this.state.email, this.state.password, this.state.confirmPassword,
        this.state.firstName, this.state.lastName);
    }
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 60, height: '100%' }}>
        <Container style={{ height: '100%' }}>
          <Content style={{ height: '100%'}}>
            <View style={{ position: 'absolute', flexDirection: 'column', width: '100%', height: '50%' }}>
              <View style={{ backgroundColor: '#3f51b5', flex: 1 }} />
            </View>
            <Form style={{ margin: 20, padding: 20, borderColor: '#eeeeee', borderWidth: 1, backgroundColor: '#ffffff' }}>
              <Image source={{ uri: 'http://www.tourize.com/images/logo.png' }} style={{width: 128, height: 27, marginBottom: 10}}/>
              <Item floatingLabel >
                <Label style={{ color: '#3f51b5' }}>First Name</Label>
                <Input
                  onChangeText={(text) => this.setState({ firstName: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="none"
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: '#3f51b5' }}>Last Name</Label>
                <Input
                  onChangeText={ (text) => this.setState({ lastName: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="none"
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: '#3f51b5' }}>Email</Label>
                <Input
                  onChangeText={(text) => this.setState({ email: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="none"
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: '#3f51b5' }}>Password</Label>
                <Input
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: '#3f51b5' }}>Confirm Password</Label>
                <Input
                  onChangeText={(text) => this.setState({ confirmPassword: text })}
                  placeholderTextColor="#aaaaaa"
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
              </Item>
              <Button
                primary
                style={styles.submitButton}
                onPress={() => this.ValidateSignupForm()}
              >
                <Text> Sign up </Text>
              </Button>
              <Spinner
                color="#3f51b5"
                animating={this.props.loadingWebService}
                style={{ position: 'absolute', marginTop: window.height/2-100, left:window.width/2-35 }}
              />
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}
export default connect(mapStateToProps, { signUp, loadingStarted })(SignupScreen);
