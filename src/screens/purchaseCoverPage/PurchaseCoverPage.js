import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import { View, Text, Image, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';
import { Button, Spinner, Item } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
const window = Dimensions.get('window');
export default class PurchaseCoverPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image style={{ flex: 1,}} source={{ uri: this.props.data.tour.cover_image_url }}>
        <View style={{ flexDirection: 'column', flex: 1 }}>

        <View style={{ flex: .8}}>
        </View>
        <View style={{ flexDirection:'row',flex:.05, backgroundColor: 'transparent', marginLeft: 10, marginBottom:5  }}>
          <StarRating
            disabled={true}
            starSize={20}
            maxStars={5}
            rating={5}
            starColor="#ffa500"
          />
        </View>
        <View style={{ flex: .05, marginLeft: 10, marginBottom:20  }}>
          <Button rounded style={{ backgroundColor: 'white' }}>
            <Text>Review</Text>
          </Button>
        </View>
        <View style={{ flex: .1, left: 0, right: 0, bottom: 0,width: window.width }} >
        <Button iconRight light full style={{backgroundColor: '#2196f3'}}
          onPress={() => Actions.purchaseTourDetail({ tourId: this.props.data.id, title:this.props.data.tour.title  })} >
          <Text style={{ color: 'white'}}>Take Tour</Text>
          <Icon name='keyboard-arrow-right' size={30} color='white'/>
        </Button>
        </View>
        </View>
      </Image>
    );
  }
}
