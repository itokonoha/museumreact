import React, { Component } from 'react';
import { View, Text, ListView, Dimensions , FlatList, AsyncStorage, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ListItem, Segment, Button, Thumbnail, Spinner, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
const window = Dimensions.get('window');
import { bindActionCreator } from 'redux';
import { connect } from 'react-redux';
import { getAllContentsData, loadMoreGetAllContent, pullRefreshAllContent } from './AllTabActions';


const mapStateToProps = ({ AllTabReducer, LoginReducer, SignUpReducer }) => {
  return {
    allContentDATA: AllTabReducer.allContentDATA,
    loading: AllTabReducer.loading,
    loadMore: AllTabReducer.loadMore,
    auth: SignUpReducer.auth,
    login: SignUpReducer.login,
    pullToRefresh: AllTabReducer.pullToRefresh,
  };
};
class AllTab extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      nodata:'',
      page: 1,
      isTrendingSelected: true,
      isRecentSelected: false,
      dataSource: ds.cloneWithRows(['First', 'Second', 'Third']),
      trendingColor: '#ffffff',
      recentColor: '#262626',
      dataSource:[{
        description: 'test',
        id:123,
        user: {
          profile_picture: 'test',
          first_name: 'test',
          last_name: 'test'
        },
        comments: 0,
        upvotes: 5,
        downvotes: 10,
        upvoteExists: true,
        downvoteExists: false
      },
      {
        description: 'test',
        id:1234,
        user: {
          profile_picture: 'test',
          first_name: 'test',
          last_name: 'test'
        },
        comments: 0,
        upvotes: 5,
        downvotes: 10,
        upvoteExists: false,
        downvoteExists: true
      }]
    };

    if (this.props.allContentDATA === null || this.props.allContentDATA.length === 0 ) {
      //  this.setState({ initialPage: 1 });
        try {
          const value = AsyncStorage.getItem('user_token',(err, result) => {

              //this.props.loadPurchased();
              console.log("==========");
              if (result !== null && result !== undefined && result !== '') {
                console.log("TOKEN",result);
                this.props.getAllContentsData(this.state.page, result);

              }else {
                this.props.getAllContentsData(this.state.page, '');
              }

            });
        } catch (error) {
          console.log("Error i USer Token");
        }

    }
  }
componentDidMount(){
  if (this.props.allContentDATA.length === 0) {
    this.setState({nodata:'No content available .'},() => console.log(this.state.nodata));
  }
}
  componentWillReceiveProps(nextProps) {

    console.log("bvbcbnvzxcvnb===asdnbasbd");
    if (this.props.auth !== nextProps.auth || this.props.authLogin !== nextProps.authLogin) {
      try {
        const value = AsyncStorage.getItem('user_token',(err, result) => {

            //this.props.loadPurchased();
            console.log("==TTTT========");
            if (result !== null && result !== undefined && result !== '') {
              console.log("TOKEN====",result);
              this.props.getAllContentsData(this.state.page, result);
            }else {
              this.props.getAllContentsData(this.state.page, '');
            }

          });
      } catch (error) {
        console.log("Error i USer Token");
      }
    }

  }
  onLoadMore(){
      console.log("load More");
      this.props.loadMoreGetAllContent();
      this.setState({ page: this.state.page + 1 },()=> this.props.getAllContentsData(this.state.page));
      ;
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
  _onRefresh() {
      this.props.pullRefreshAllContent();
      try {
        const value = AsyncStorage.getItem('user_token',(err, result) => {
            if (result !== null && result !== undefined && result !== '') {
              this.setState({ page: 1 });
              this.props.getAllContentsData("1", result);
            }else {
              this.setState({ page: 1 });
              this.props.getAllContentsData("1", '');
            }

          });
      } catch (error) {
        console.log("Error i USer Token");
      }
  }
  _keyExtractor = (item, index) => item.id;
  // Render Data
  renderList(rowData) {
    return (
      <ListItem style={{flex: 1, display: 'flex', width: '100%', paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0, }}>
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
            <Text style={{fontSize: 14, color: '#262626'}} onPress={() => Actions.contentDetail({ data: rowData })}>{rowData.description}</Text>
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
  render() {
    if (this.props.loading) {
      return (
        <Spinner color='#262626' style={{flex: 1, alignSelf: 'center', alignItems: 'center' }}/>
      );
    } else {
      return (
        <Container >
          <Segment>
            <Button
              first
              onPress={() => this.setState({
                isTrendingSelected: true,
                isRecentSelected: false,
                trendingColor: '#ffffff',
                recentColor: '#262626'
              })
              }
              active={this.state.isTrendingSelected}
            >
              <Text style={{ color: this.state.trendingColor }}>TRENDING</Text>
            </Button>
            <Button
              last
              active={this.state.isRecentSelected}
              onPress={() => this.setState({
                isTrendingSelected: false,
                isRecentSelected: true,
                trendingColor: '#262626',
                recentColor: '#ffffff'
              })
              }
            >
              <Text style={{ color: this.state.recentColor }} >RECENT</Text>
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
                  onEndReachedThreshold={10}
                  style={{paddingBottom: 80}}
                  data={this.props.allContentDATA}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => this.renderList(item) } />
                <Text style={{margin:10}}>{this.state.nodata}</Text>
              </View>
            :
              <Text >RECENT SELECTED</Text>
            }
          </Content>
      </Container>
    );
  }

  }
}

export default connect(mapStateToProps, { getAllContentsData, loadMoreGetAllContent, pullRefreshAllContent })(AllTab);
