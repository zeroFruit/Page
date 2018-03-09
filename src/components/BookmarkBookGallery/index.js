import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { compose } from 'recompose';

import {
    BookmarkBookGalleryCard,
    Gallery,
    GalleryCard
} from '../index';
import {
    fetchBookmarksHOC
} from '../../hocs';

const { height } = Dimensions.get('window');

class BookmarkBookGallery extends PureComponent {
    render() {
        const { bookmarks } = this.props;
        return (
            <View style={ styles.container }>
                <Gallery
                    data={ bookmarks }
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
    },
});

export default compose(fetchBookmarksHOC)(BookmarkBookGallery);
