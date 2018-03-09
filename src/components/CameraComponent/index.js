import React, { PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { SCREEN_WIDTH } from '../../config';

class CameraComponent extends PureComponent {
    render() {
        const { photoTakenUri } = this.props;
        if (photoTakenUri) {
            return (
                <Image style={ styles.preview } source={ { uri: photoTakenUri } } />
            );
        } else {
            return (
                <RNCamera
                    style={ styles.preview }
                    ratio={"1:1"}
                    ref={ cam => this.props.setCameraRef(cam) } />
            );
        }

    }
}

const styles = StyleSheet.create({
    preview: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        alignItems: 'center',
        backgroundColor: 'black'
    }
});

export default CameraComponent;
