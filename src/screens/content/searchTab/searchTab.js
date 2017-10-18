import React, { Component } from 'react';
import { View, StyleSheet, NetInfo, ListView, FlatList, AsyncStorage, Dimensions } from 'react-native';
import { styles } from '../../../style/centerstyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
   Container,
   Content,
   Form,
   Item,
   Input,Label, Text,
  ScrollView,TextInput,TouchableOpacity,Button, Spinner,ListItem, Thumbnail } from 'native-base';

import {IMAGE_URL} from '../../../constants'
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { getSearchData, loadNewSearch, loadMoreSearch, removePreviousSearch } from './SearchActions';
const window = Dimensions.get('window');

const mapStateToProps = ({ SearchReducer, LoginReducer, SignUpReducer }) => {
  return {
    searchData: SearchReducer.searchData,
    loading: SearchReducer.loading,
    loadMoreSearch: SearchReducer.loadMoreSearch,
    auth: SignUpReducer.auth,
    login: SignUpReducer.login,
  };
};


class SearchTab extends Component {
  constructor(props){
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isTrendingSelected:true,
      isRecentSelected:false,
      dataSource: ds.cloneWithRows(['First', 'Second','Third']),
      trendingColor : "#fffff",
      recentColor : "#262626",
      query:'',
      page: 1,
      nodata:''
    }
    this.props.removePreviousSearch();
  }
  componentWillReceiveProps(nextProps){


  }
  onLoadMore(){
      this.props.loadMoreSearch();
      this.setState({ page: this.state.page + 1 });
      //this.props.getSearchData(this.state.page);

      try {
        const value = AsyncStorage.getItem('user_token',(err, result) => {

            if (result !== null && result !== undefined && result !== '') {
              console.log("TOKEN",result);
              this.props.getSearchData(this.state.query, this.state.page, result);

            } else {
              this.props.getQuestionsData( this.state.page, '', result );
              //alert("Please login to search")
            }

          });
      } catch (error) {
        console.log("Error i USer Token");
      }
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
  _keyExtractor = (item, index) => item.id;
  onSubmitClick(){
    this.setState({page:1});
    if (this.state.query === '') {
      alert("Please enter query to search.")
    }else{
      try {
        const value = AsyncStorage.getItem('user_token',(err, result) => {

            //this.props.loadPurchased();
            console.log("==========");
            if (result !== null && result !== undefined && result !== '') {
              console.log("TOKEN",result);
              this.props.loadNewSearch();
              this.props.getSearchData(this.state.query,this.state.page, result);

            }else {
              this.props.getSearchData(this.state.query,this.state.page, '');
              //alert("Please login to search")
            }

          });
      } catch (error) {
        console.log("Error i USer Token");
      }
    }

  }
  // Render Data
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
  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:.3}}>
          <View style={{position: 'absolute', flexDirection: 'column', width: window.width, height: window.height/3}}>
            <View style={{backgroundColor: '#262626', flex: 1}} />
          </View>
          <Form style={{margin: 20, padding: 20, borderColor: "#eeeeee", borderWidth: 1, backgroundColor: '#ffffff'}}>
            <Item floatingLabel>
              <Label style={{color:"#262626"}}>Search</Label>
              <Input
                onChangeText={(text) => this.setState({ query: text })}
                placeholderTextColor = "#aaaaaa"
                autoCapitalize = "none"
              />
            </Item>
            <Button onPress={()=> this.onSubmitClick()}
            primary
            style={{backgroundColor: '#262626', padding: 10, margin: 15, borderRadius: 0, justifyContent: 'center', alignItems:"center", alignSelf:"flex-end"}}>
              <Text > Search </Text>
            </Button>
            {
              (this.props.loading)?
              <Spinner color='#262626' style={{flex: 1, alignSelf: 'center', alignItems: 'center' }}/>
              :
              null
            }


          </Form>
        </View>
      <View style={{flex:.7, marginTop:50}}>
      <View style={{paddingBottom: 80}} >
        <FlatList
          ListFooterComponent={this.renderFooter}
          onEndReached={() => this.onLoadMore()}
          onEndReachedThreshold={10}
          style={{paddingBottom: 80}}
          data={this.props.searchData}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => this.renderList(item) } />
        
          </View>
        </View>

      </View>
    )
  }
}
export default connect(mapStateToProps, { getSearchData, loadNewSearch, loadMoreSearch, removePreviousSearch })(SearchTab);
