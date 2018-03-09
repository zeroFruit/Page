import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RegularText } from '../index';
import { SCREEN_WIDTH } from '../../config';

class ImagePreview extends PureComponent {
    render() {
        const { image } = this.props;
        return (
            <View style={ styles.container }>
                {
                    !image ?
                        <RegularText>
                            <Text>
                                사진을 선택해주세요.
                            </Text>
                        </RegularText> :
                        <Image
                            resizeMode="contain"
                            style={ styles.image }
                            source={ { uri: image.uri } } />
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: SCREEN_WIDTH,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export default ImagePreview;
