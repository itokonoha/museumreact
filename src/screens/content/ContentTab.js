import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../style/centerstyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AllTab from './alltabs/AllTab';
import SearchTab from './searchTab/searchTab';
import QuestionsTab from './qandaTab/qandaTab';
import DiscussionTab from './discussionTab/discussionTab';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';

import ScrollableTabView, { Container, Button, StyleProvider, Content, Tab, Tabs, ScrollableTabBar, TabHeading, Header } from 'native-base';

export default class ContentTab extends Component {
  constructor(props){
    super(props);

    StatusBar.setBarStyle('light-content', false);
    StatusBar.setBarStyle('dark-content', true);
  }

  static navigationOptions = {
    headerTitle:"CONTENT",
    tabBarLabel: "Events",
    tabBarIcon: () => <Icon size={24} name="event-note" color="white" />
  }

  render(){
    return(
      <StyleProvider style={getTheme(platform)}>
        <Container style={{position: 'relative'}}>
          <Tabs style={{marginTop:60}}>
            <Tab heading={
              <TabHeading>
                <Icon size={20}name="note" />
                <Text style={{fontSize:12}}> All</Text>
              </TabHeading>}>
              <AllTab />
            </Tab>

            <Tab heading={
              <TabHeading>
                <Icon size={20} name="search" />
                <Text style={{fontSize:12}}> Search</Text>
              </TabHeading>}>
              <SearchTab />
            </Tab>

            <Tab heading={
              <TabHeading>
                <Icon name="help" size={20}/>
                <Text style={{fontSize:12}}> Q & A</Text>
              </TabHeading>}>
              <QuestionsTab />
            </Tab>

            <Tab heading={
              <TabHeading>
                <Icon name="question-answer" size={20}/>
                <Text style={{fontSize:12}}> Discuss</Text>
              </TabHeading>}>
              <DiscussionTab />
            </Tab>
          </Tabs>
          <Button info rounded large style={{position: 'absolute', bottom: 60, paddingLeft: 20, paddingRight: 20, right: 10}} onPress={() => Actions.newContent()}>
              <Icon name="add" size={20} color={'#fff'}/>
          </Button>
        </Container>
      </StyleProvider>
    )
  }
}
