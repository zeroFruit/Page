import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { IconButton } from '../index';

class CameraButtonPanel extends PureComponent {
    render() {
        const {
            source,
            onPressButton
        } = this.props;
        return (
        <View style={ styles.container }>
            <IconButton
                source={ source }
                iconStyle={ styles.button }
                onPress={ onPressButton } />
        </View>
        );
    }
}


export default CameraButtonPanel;
