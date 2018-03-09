import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, Text } from 'react-native';
import { compose } from 'recompose';

import {
    IconButton,
    RegularText
} from '../../components';
import {
    bookmarkRequestHOC,
    selectModalContentHOC
} from '../../hocs';
import styles from './styles';

const { bool, func } = PropTypes;

const propTypes = {
  isBookmarked: bool,
  isMyBook: bool,
  AsyncAddBookmarkRequestAction: func.isRequired,
  AsyncRemoveBookmarkRequestAction: func.isRequired
};
const defaultProps = {
  isBookmarked: false,
  isMyBook: false
};

class PostButtonGroups extends PureComponent {
  render() {
    const {
        onClickMore,
        isBookmarked,
        bmLoading,
        bookId,
        bmcnt
    } = this.props;
    const bookmarkIcon = require('./image/bookmark_icon.png');
    const bookmarkedIcon = require('./image/bookmarked_icon.png');
    const moreIcon = require('./image/more_icon.png');
    return (
        <View style={ styles.container }>
            <View style={ styles.text }>
                <RegularText>
                    <Text style={ styles.bmcnt }>{`${bmcnt}명이 담아간 글입니다.`}</Text>
                </RegularText>
            </View>
            <View style={ styles.buttons }>
                <IconButton
                    source={ moreIcon }
                    containerStyle={ styles.iconContainer }
                    iconStyle={ styles.icon }
                    onPress={ onClickMore }
                />
                {
                    !bmLoading ?
                        <IconButton
                            source={ isBookmarked ? bookmarkedIcon : bookmarkIcon }
                            containerStyle={ styles.iconContainer }
                            iconStyle={ styles.bm }
                            onPress={ !isBookmarked ?
                                this._onClickBookmarkAdd.bind(this, bookId) :
                                this._onClickBookmarkRemove.bind(this, bookId) } /> :
                        <ActivityIndicator
                            color="#707070"
                            style={ styles.activityIndicator }
                            size="small"
                        />
                }
            </View>
      </View>
    );
  }

  _onClickBookmarkAdd = async (bid) => {
    await this.props.addBm(bid);
  }

  _onClickBookmarkRemove = async (bid) => {
    await this.props.rmBm(bid);
  }
}

PostButtonGroups.propTypes = propTypes;
PostButtonGroups.defaultProps = defaultProps;

export default compose(
    bookmarkRequestHOC
)(PostButtonGroups);
