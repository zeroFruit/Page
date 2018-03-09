import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from '../index';
import { SCREEN_WIDTH } from '../../config';

class SquareAddButton extends PureComponent {
  render() {
    const icon = require('./image/add_collection_icon_2.png');
    return (
      <IconButton
        source={ icon }
        containerStyle={ styles.container }
        iconStyle={ styles.icon }
        onPress={ this._handlePress } />
    );
  }

  _handlePress = () => {
    this.props.onPress();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5.8,
    width: SCREEN_WIDTH / 3,
  },
  icon: {
    width: SCREEN_WIDTH / 3,
    height: 120,
    resizeMode: 'contain'
  }
});

export default SquareAddButton;
