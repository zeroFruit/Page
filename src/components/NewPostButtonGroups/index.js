import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './styles';
import Col2ParentButtonGroups from '../Col2ParentButtonGroups';
import { RegularText } from '../index';

class NewPostButtonGroups extends Col2ParentButtonGroups {
  render() {
    return (
      <View style={ styles.container }>
        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ this._onClickBooklistButton }>
          <View style={ styles.button }>
            <RegularText>
              <Text style={ styles.buttonText }>
                라이브러리
              </Text>
            </RegularText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={ styles.buttonContainer }
          onPress={ this._onClickBookCollectionButton }>
          <View style={ styles.button }>
            <RegularText>
              <Text style={ styles.buttonText }>
                새로운 사진
              </Text>
            </RegularText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  /* TODO: 메소드 이름 바꾸기 */
  _onClickBooklistButton = () => {
    this.props.setStateScreenType(this.props.SCREEN_TYPES.LIBRARY);
  }

  /* TODO: 메소드 이름 바꾸기 */
  _onClickBookCollectionButton = () => {
    this.props.setStateScreenType(this.props.SCREEN_TYPES.PICTURE);
  }
}

export default NewPostButtonGroups;
