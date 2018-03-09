import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { IconButton } from '../index';

class CameraButtonPanel extends PureComponent {
  render() {
    return (
      <View style={ styles.container }>
        <IconButton
          source={ require('./image/camera_button.png') }
          iconStyle={ styles.button }
          onPress={ this._onPress } />
      </View>
    );
  }

  _onPress = () => {
    this.props.onPressButton();
  }
}


export default CameraButtonPanel;
