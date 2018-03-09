import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Gallery,
    GalleryCard
} from '../index';

class OtherPageBookGallery extends PureComponent {
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

    _keyExtractor = (item, index) => index;

    _getGalleryCard = (card) => {
        const {
            id,
            user,
            img_src
        } = card;
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
        paddingTop: 5,
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    }
});

export default OtherPageBookGallery;
