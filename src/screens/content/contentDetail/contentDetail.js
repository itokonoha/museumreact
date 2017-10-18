import React, { Component } from 'react';
import { ScrollView, View, TouchableHighlight, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import { Card, ListItem, SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Footer, FooterTab, Badge, Text, Button, TextInput, Form, Item, Input, Label, Spinner, Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const window = Dimensions.get('window');
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { getContentsDetails, loadMoreContentDetail, loadNewDetails } from './ContentDetailsActions';

const mapStateToProps = ({ ContentDetailsReducer }) => {
  return {
    contentDetails: ContentDetailsReducer.contentDetails,
    loading: ContentDetailsReducer.loading,
  };
};
class ContentDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCoverImageLoading: true,
      comment: '',
      commentBoxVisible: false,
    }
    this.props.loadNewDetails();
    this.props.getContentsDetails(this.props.data.id);
  }
  render() {
    if (this.props.loading) {
      return (
        <Spinner
          color='#262626'
          style={{flex: 1, alignSelf: 'center', alignItems: 'center' }}
        />
      );
    } else {
    return (
      <Container style={{ flex: 1, flexDirection: 'column'}}>
        <Content style={{ flex: .8}}>
          <View style={{marginTop:65, marginBottom: 100}}>
            <View style={{ padding: 20 }}>
              <Image
                onLoadEnd={() => this.setState({isCoverImageLoading:false})}
                onLoadStart={()=>console.log("Started")}
                onLoad={() => this.setState({isCoverImageLoading:false})}
                style={{
                  padding: 10,
                  height: 300,
                  justifyContent: 'center',
                  alignItems: "center",
                  alignSelf: "stretch" }}
                source={{ uri: this.props.contentDetails.user.profile_picture }}>
              </Image>
            </View>
            <Spinner color='#262626' animating={this.state.isCoverImageLoading} style={{alignSelf: "center", alignItems: "center", position: 'absolute'}}/>
              <Text>{this.props.contentDetails.description}</Text>

          </View>
      </Content>
      <View style={{ flex: .2, marginTop: 10}}>
      <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, flex:1, paddingTop: 5, paddingBottom: 5, marginBottom: 10}}>
        <View style={{display: 'flex', flexDirection: 'row', marginRight: 10}}>
          <Icon  size={14} name='thumb-up' style={{color:'#6cc788', marginRight: 5}} />
          <Text style={{fontSize: 14, color: '#262626'}}>{this.props.contentDetails.upvotes}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', marginRight: 10}}>
          <Icon  size={14} name='thumb-down' style={{color:'#f44455', marginRight: 5}} />
          <Text style={{fontSize: 14, color: '#262626'}}>{this.props.contentDetails.downvotes}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', flex: 1, marginLeft: 'auto', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Icon  size={14} name='comment' style={{color:'#262626', marginRight: 5}} />
          <Text style={{fontSize: 14, color: '#262626'}}>{this.props.contentDetails.comments} comments</Text>
        </View>
      </View>
      {
        (!this.state.commentBoxVisible)?
        <View style={{ flexDirection: 'row', flex:1, marginTop: 0, borderColor: '#ddd', borderTopWidth: 1, paddingBottom: 15}}>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=> this.setState({ commentBoxVisible: true })}>
            <Icon  size={18} name='comment' style={{color:'#888888', marginRight: 5}} />
            <Text style={{fontSize:14, color: '#888888'}}>Comment</Text>
          </TouchableOpacity>
          {
            this.props.contentDetails.upvoteExists ?
              <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon  size={18} name='thumb-up' style={{color:'#6cc788', marginRight: 5}} />
                <Text style={{fontSize:14, color:'#6cc788'}}>Vote Up</Text>
              </View>
            :
              <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon  size={18} name='thumb-up' style={{color:'#888888', marginRight: 5}} />
                <Text style={{fontSize:14, color:'#888888'}}>Vote Up</Text>
              </View>
          }
          {
            this.props.contentDetails.downvoteExists ?
              <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon  size={18} name='thumb-down' style={{color: '#f44455', marginLeft: 10, marginRight: 5}} />
                <Text style={{fontSize: 14, color: '#f44455'}}>Vote Down</Text>
              </View>
            :
              <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon  size={18} name='thumb-down' style={{color:'#888888', marginLeft:10, marginRight: 5}} />
                <Text style={{fontSize:14, color:'#888888'}}>Vote Down</Text>
              </View>
          }

        </View>
        :null
      }
      {
        (this.state.commentBoxVisible)?
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
         <Item regular style={{ flex: .9 ,backgroundColor: 'grey' }}>

          <Input
            placeholder="Comment"
            multiline={true}
            style={{ flex: .9 ,backgroundColor: 'grey' }}
            placeholderTextColor = 'white'
            autoCapitalize = "none"
            onChangeText={(text) => this.setState({ comment: text })}
          />
          </Item>
          <Icon  size={25} name='send' style={{color:'#888888', marginLeft:10, marginRight: 5}} onPress={()=> this.setState({ commentBoxVisible: false })}/>
        </View>
        :
        null
      }

      </View>
      </Container>
    )
  }
  }
}

export default connect(mapStateToProps, { getContentsDetails, loadMoreContentDetail, loadNewDetails } )(ContentDetail);
