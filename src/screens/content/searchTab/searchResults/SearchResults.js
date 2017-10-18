import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, StyleSheet, ScrollView, Image} from 'react-native';
import { Card, ListItem, SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Footer, FooterTab, Icon, Badge, Text, Button} from 'native-base';

export default class SearchResults extends Component {

  render() {

    return (
    <ScrollView>
        <View style={{marginTop:65}}>
          <View style={{flex:1}}>
            <View style={{padding:10}}>
              <Text>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>
            </View>
            <View style={{flex:1,justifyContent:'flex-end'}}>
              <Button full success style={{backgroundColor: '#ef6c00'}}>
                  <Text>Buy Tour</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
