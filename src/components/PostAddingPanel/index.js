import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { RegularText } from '../../components';

class PostAddingPanel extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={ this._onClickAddPost }>
        <View style={ styles.container }>
          <Image
            source={ require('./image/post_icon.png') }
            style={ styles.icon } />
          <RegularText>
            <Text style={ styles.text }>
              당신의 마음에 머문 페이지는 무엇인가요?
            </Text>
          </RegularText>
        </View>
      </TouchableOpacity>
    );
  }

  _onClickAddPost = () => {
    this.props.onClickAddPost();
  }
}

export default PostAddingPanel;
