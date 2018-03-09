import { List } from 'immutable';
import React, { PureComponent } from 'react';
import { View, Text, FlatList, CameraRoll, StyleSheet } from 'react-native';

import {
  Gallery,
  ThumbnailDetail
} from '../index';

const NUM_OF_PHOTOS = 20;
class CameraRollGallery extends PureComponent {
  state = {
    photos: [],
    endCursor: null,
    hasNextPage: false
  }

  async componentWillMount() {
    const { edges, page_info } = await CameraRoll.getPhotos({
      first: NUM_OF_PHOTOS
    });
    await this.setState({
      photos: edges.map(photo => photo.node),
      endCursor: page_info.end_cursor,
      hasNextPage: page_info.has_next_page
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Gallery
          numColumns={ 4 }
          data={ this.state.photos }
          keyExtractor={ this._keyExtractor }
          onEndReached={ this._onEndReached }
          renderItem={ ({ item }) => this._renderItem(item) } />
      </View>

    );
  }

  _renderItem = (photo) => {
    return (
      <ThumbnailDetail
        key={ photo.timestamp }
        photo={ photo }
        onClickThumbnail={ this._onClickThumbnail } />
    );
  }

  _keyExtractor = (item, index) => index

  _setStatePhotos = (photos) => {
    this.setState({ photos });
  }

  _onClickThumbnail = (item) => {
    this.props.onClickThumbnail(item);
  }

  _onEndReached = async () => {
    const { hasNextPage, endCursor, photos } = this.state;
    if (hasNextPage && endCursor) {
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: NUM_OF_PHOTOS,
        after: endCursor
      });
      await this.setState({
        photos: List(photos).concat(edges.map(photo => photo.node)).toJS(),
        endCursor: page_info.end_cursor,
        hasNextPage: page_info.has_next_page
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default CameraRollGallery;
