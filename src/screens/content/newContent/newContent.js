import React, { Component } from 'react';
import { ScrollView, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import { Card, ListItem ,SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Footer, FooterTab, Icon, Badge, Text, Button, TextInput, Form, Item, Input, Label} from 'native-base';

export default class NewContent extends Component {

  render() {

    return (
      <View style={{height: '100%', flexDirection: 'column'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{marginTop:65, marginBottom: 100}}>
            <View style={{flex:1}}>
              <View style={{padding:10}}>
                <Text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{flex:1, justifySelf: 'flex-end', height: 100}}>
          <Form>
              <Item inlineLabel>
                  <Label>Username</Label>
                  <Input />
              </Item>
          </Form>
        </View>
      </View>
    )
  }
}
