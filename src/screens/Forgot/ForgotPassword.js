import React, { Component } from 'react';
import {
   Container,
   Content,
   Form,
   Item,
   Input, Label, Text,
  View, Button } from 'native-base';
import { styles } from '../../style/centerstyle';

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  // Validate  form
  /* eslint no-undef: "error"*/
  /* eslint-env browser*/
  validateForm(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (email === '') {
      alert('Please enter email address');
    } else if (reg.test(email) === false) {
      alert('Please enter valid email address');
    } else {
      alert('Under development');
    }
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop:60, height: '100%' }}>
        <Container style={{ height: '100%' }}>
          <Content style={{ height: '100%' }}>
            <View style={{ position: 'absolute', flexDirection: 'column', width: '100%', height: '50%' }}>
              <View style={{ backgroundColor: '#3f51b5', flex: 1}} />
            </View>
            <Form style={{ margin: 20, padding: 20, borderColor: "#eeeeee", borderWidth: 1, backgroundColor: '#ffffff' }}>
              <Item floatingLabel>
                <Label style={{ color: "#3f51b5" }}>Email</Label>
                <Input
                  placeholderTextColor = "#aaaaaa"
                  autoCapitalize = "none"
                  onChangeText={(text) => this.setState({ email: text })}
                />
              </Item>
              <Button
                primary
                style={styles.submitButton}
                onPress={() => this.validateForm(this.state.email)}
              >
                <Text > Submit </Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}
