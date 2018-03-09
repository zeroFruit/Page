import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import { SCREEN_WIDTH } from "../../config";

class PostImage extends PureComponent {
    render() {
        const { imgSrc, onClickImage } = this.props;
        return (
            <TouchableHighlight
                style={ styles.container }
                onPress={ onClickImage }>
                <Image source={ { uri: imgSrc } } style={ styles.image } />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: SCREEN_WIDTH,
        backgroundColor: 'white',
    },
    image: {
        height: SCREEN_WIDTH,
        backgroundColor: 'black'
    }
});

export default PostImage;
