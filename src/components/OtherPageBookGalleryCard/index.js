import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { SCREEN_WIDTH } from '../../config';

class OtherPageBookGalleryCard extends PureComponent {
    render() {
        const { img_src, id, user } = this.props;
        return (
            <TouchableOpacity
                style={ styles.container }
                onPress={ () => { this._onClickGalleryCard(id, user); } }>
                <Image
                    style={ styles.image }
                    source={ { uri: img_src } } />
            </TouchableOpacity>
        );
    }

    _onClickGalleryCard = (id, user) => {
        this.props.onClickGalleryCard(id, user);
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        width: SCREEN_WIDTH / 3,
    },
    image: {
        height: 120,
        resizeMode: 'contain',
        backgroundColor: 'white'
    }
});


export default OtherPageBookGalleryCard;
