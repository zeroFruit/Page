import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import {
    MyPageBookGalleryCard,
    Gallery,
    GalleryCard
} from '../index';

class MyPageBookGallery extends PureComponent {
    render() {
        const { galleryCardsProps } = this.props;
        return (
            <View style={ styles.container }>
                <Gallery
                    data={ galleryCardsProps }
                    keyExtractor={ this._keyExtractor }
                    renderItem={ ({ item }) => this._getGalleryCard(item) } />
            </View>
        );
    }

    _keyExtractor = (item, index) => index

    _getGalleryCard = (card) => {
        const { id, user, img_src } = card;
        return (
            <GalleryCard
                key={ id }
                onClickGalleryCard={ this._onClickGalleryCard }
                user={ user }
                id={ id }
                img_src={ img_src }
            />
        );
    }

    _onClickGalleryCard = (id, user) => {
        this.props.onClickGalleryCard(id, user);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default MyPageBookGallery;
