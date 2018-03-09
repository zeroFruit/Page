import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  IconButton
} from '../index';

class Col2ParentButtonGroups extends PureComponent {
  render() {
    const thumbnailIcon = require('./image/thumbnail_icon.png');
    const collectionIcon = require('./image/collection_icon.png');
    return (
      <View style={ styles.container }>
        <IconButton
          source={ thumbnailIcon }
          containerStyle={ styles.buttonContainer }
          iconStyle={ styles.icon }
          onPress={ this._onClickBooklistButton } />
        <IconButton
          source={ collectionIcon }
          containerStyle={ styles.buttonContainer }
          iconStyle={ styles.icon }
          onPress={ this._onClickBookCollectionButton } />
      </View>
    );
  }
  /* TODO: 메소드 이름 일반화 하기 */
  _onClickBooklistButton = () => {
    this.props.onClickBooklistButton();
  }

  /* TODO: 메소드 이름 일반화 하기 */
  _onClickBookCollectionButton = () => {
    this.props.onClickCollectionButton();
  }
}

export default Col2ParentButtonGroups;
