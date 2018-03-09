import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import GalleryCardParentComponent from '../GalleryCardParentComponent';
import { IconButton } from '../index';
import { fetchBookByBookIdHOC } from '../../hocs';

import { SCREEN_WIDTH } from '../../config';

const { string, shape } = PropTypes;

const propTypes = {
  bookInfo: shape({
    img_src: string
  })
};

const defaultProps = {
  bookInfo: {}
};

class SelectGalleryCard extends GalleryCardParentComponent {
  state = {
    selected: false
  };

  render() {
    const { selected } = this.state;
    const { bookInfo: { img_src, id } } = this.props;
    const defaultIcon = require('./image/check_default_icon_2.png');
    const selectedIcon = require('./image/check_selected_icon_1.png');
    return (
      <View
        style={ styles.container }>
        <Image
          style={ styles.image }
          source={ { uri: img_src } } />
        <IconButton
          source={ !selected ? defaultIcon : selectedIcon }
          containerStyle={ styles.checkBoxContainer }
          iconStyle={ styles.checkBox }
          onPress={ () => this._onClickSelectButton(id) } />
      </View>
    );
  }

  _onClickSelectButton = (bookId) => {
    this.props.onClickSelectButton(bookId);
    this.setState({ selected: !this.state.selected });
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5.8,
    width: SCREEN_WIDTH / 3,
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    backgroundColor: 'white'
  },
  checkBoxContainer: {
    position: 'absolute',
    bottom: 3.5,
    right: 2.8,
  },
  checkBox: {
    width: 19,
    height: 18.3
  }
});

SelectGalleryCard.propTypes = propTypes;
SelectGalleryCard.defaultProps = defaultProps;

export default compose(fetchBookByBookIdHOC)(SelectGalleryCard);
