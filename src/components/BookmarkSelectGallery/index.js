import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose } from 'recompose';

import GalleryParentComponent from '../../components/GalleryParentComponent';
import SelectGalleryCard from '../../components/SelectGalleryCard';
import { fetchBookmarksHOC } from '../../hocs/fetchBookmarksHOC';
import { filterMyBookmarksFromCollectionBooksHOC } from '../../hocs/filterMyBookmarksFromCollectionBooksHOC';

class BookmarkSelectGallery extends GalleryParentComponent {
  render() {
    const { filteredBookmarks } = this.props;
    return (
      <View style={ styles.container }>
        { this._renderGalleryCards(filteredBookmarks) }
      </View>
    );
  }

  _getGalleryCard = (card) => {
    return (
      <SelectGalleryCard
        key={ card.id }
        bookId={ card.bookId }
        onClickSelectButton={ this._onClickBookSelectButton } />
    );
  }

  _onClickBookSelectButton = (bookId) => {
    this.props.onClickBookSelectButton(bookId);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default compose(
  fetchBookmarksHOC,
  filterMyBookmarksFromCollectionBooksHOC
)(BookmarkSelectGallery);
