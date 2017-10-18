import React, { Component } from 'react';
import { View, Text,StyleSheet, NetInfo ,FlatList, Dimensions, RefreshControl } from 'react-native';
import {styles} from '../../../style/centerstyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView,{ Content, Tab, Tabs, ScrollableTabBar,TabHeading,List,ListItem,Thumbnail,Body, Segment,Button, Container
  , Spinner } from 'native-base';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
const window = Dimensions.get('window');
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { getDiscussionsData,  loadMoreDiscussion, pullRefreshDiscussion } from './DiscussionActions';
const mapStateToProps = ({ DiscussionReducer }) => {
  return {
    discussionsDATA: DiscussionReducer.discussionsDATA,
    loading: DiscussionReducer.loading,
    loadMore: DiscussionReducer.loadMore,
    pullToRefresh : DiscussionReducer.pullToRefresh
  };
};
class DiscussionTab extends Component {
  constructor(props){
    super(props);
    this.state = {nodata:'',
      page: 1,
      refreshing: false,
      isTrendingSelected:true,
      isRecentSelected:false,
      trendingColor : '#ffffff',
      recentColor : '#262626'
    };
    this.props.getDiscussionsData(this.state.page);
  }
  componentDidMount(){
    if (this.props.discussionsDATA.length === 0) {
      this.setState({nodata:'No discussions data available .'},() => console.log(this.state.nodata));
    }
  }
  _onRefresh() {
      this.props.pullRefreshDiscussion();
      this.setState({ page: 1}, ()=>this.props.getDiscussionsData(this.state.page) );
  }
  _keyExtractor = (item, index) => item.id;

  renderList(rowData) {
    return (
      <ListItem style={{flex: 1, display: 'flex', width: '100%', paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, border: 0}}>
        <View style={{ flexDirection: 'column', flex: 1, display: 'flex', width: '100%', marginTop: 10}}>
          <View style={{paddingLeft: 10, paddingRight: 10, display: 'flex', flexDirection: 'row'}}>
            <Spinner color='#262626' animating={true} style={{alignSelf: "center", alignItems: "center", position: 'absolute', left: 10}} />
            <Thumbnail medium source={{uri: rowData.user.profile_picture}}  onLoadEnd={() => this.setState({ isAvatarLoading: false }) }
              onLoadStart={()=> console.log('Load Started') }
              onLoad={() => this.setState({ isAvatarLoading: false }) } />

            <View style={{ flexDirection: 'column', display: 'flex', flex: 1, marginLeft: 10, justifyContent: 'center' }}>
              <Text style={{fontSize: 12, color: '#262626'}}>{rowData.user.first_name} {rowData.user.last_name}</Text>
              <Text style={{fontSize: 10, color: '#888888'}}>1 day ago</Text>
            </View>
          </View>
          <View style={{marginLeft: 10, marginTop: 20, marginBottom: 10, marginRight: 10}}>
            <Text style={{fontSize: 14, color: '#262626'}} onPress={() => Actions.contentDetail()}>{rowData.description}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, flex:1, paddingTop: 5, paddingBottom: 5, marginBottom: 10}}>
            <View style={{display: 'flex', flexDirection: 'row', marginRight: 10}}>
              <Icon  size={14} name='thumb-up' style={{color:'#6cc788', marginRight: 5}} />
              <Text style={{fontSize: 14, color: '#262626'}}>{rowData.upvotes}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', marginRight: 10}}>
              <Icon  size={14} name='thumb-down' style={{color:'#f44455', marginRight: 5}} />
              <Text style={{fontSize: 14, color: '#262626'}}>{rowData.downvotes}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', flex: 1, marginLeft: 'auto', alignItems: 'center', justifyContent: 'flex-end'}} onPress={() => Actions.contentDetail()}>
              <Icon  size={14} name='comment' style={{color:'#262626', marginRight: 5}} />
              <Text style={{fontSize: 14, color: '#262626'}}>{rowData.comments} comments</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', flex:1, marginTop: 0, borderColor: '#ddd', borderTopWidth: 1, paddingTop: 15, paddingBottom: 15}}>
            <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Icon  size={18} name='comment' style={{color:'#888888', marginRight: 5}} />
              <Text style={{fontSize:14, color: '#888888'}}>Comment</Text>
            </View>
            {
              rowData.upvoteExists ?
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
              rowData.downvoteExists ?
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
        </View>
      </ListItem>
    )
  }
  onLoadMore(){
      this.props.loadMoreDiscussion();
      this.setState({ page: this.state.page + 1 },()=> this.props.getDiscussionsData(this.state.page));
  }
  renderFooter = () => {
    if (this.props.loadMore === true){
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
          }}
        >
          <Spinner
            color='#262626'
            style={{flex: 1, alignSelf: 'center', alignItems: 'center' }} />
        </View>
      );
    }
    else {
      return null;
    }
  }
  render(){
    if (this.props.loading) {
      return (
        <Spinner color='#262626' style={{flex: 1, alignSelf: 'center', alignItems: 'center' }}/>
      );
    } else {
      return(
        <Container>
          <Segment>
            <Button first onPress={()=> this.setState({
                 isTrendingSelected:true,
                 isRecentSelected:false,
                 trendingColor : '#ffffff',
                 recentColor : '#262626'
               })
              }
              active={this.state.isTrendingSelected}
            >
              <Text style={{ color:this.state.trendingColor }}>TRENDING</Text>
            </Button>
            <Button last active={this.state.isRecentSelected}  onPress={()=> this.setState({
                  isTrendingSelected:false,
                  isRecentSelected:true,
                  trendingColor : '#262626',
                  recentColor : '#ffffff'
                })
              }
            >
              <Text style={{ color:this.state.recentColor }} >RECENT</Text>
            </Button>
          </Segment>
          <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.pullToRefresh}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          >
            {this.state.isTrendingSelected === true ?
              <View style={{paddingBottom: 80}} >
              <FlatList
                  ListFooterComponent={this.renderFooter}
                  onEndReached={() => this.onLoadMore()}
                  style={{paddingBottom: 80}}
                  onEndReachedThreshold={10}
                  data={this.props.discussionsDATA}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => this.renderList(item) } />
                <Text style={{margin:10}}>{this.state.nodata}</Text>
                </View>
            :
              <Text >RECENT SELECTED</Text>
            }
          </Content>
        </Container>
      )
    }
  }
}

export default connect(mapStateToProps, { getDiscussionsData,  loadMoreDiscussion, pullRefreshDiscussion })(DiscussionTab);
