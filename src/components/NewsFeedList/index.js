import React, { PureComponent } from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { Post, ListTemplate } from '../index';

import { indexOfValueInArray } from '../../utils/ArrayUtils';

const { func, arrayOf, number } = PropTypes;

const propTypes = {
    onClickNewsfeedCard: func.isRequired,
};
const defaultProps = {};

class NewsFeedList extends PureComponent {
    render() {
        const {
            booksInfo,
            myBookmarks_,
            myBooks_,
        } = this.props;
        return (
            <View style={ { flex: 1 } } >
                <ListTemplate
                    data={ booksInfo }
                    extraData={ { myBookmarks_, myBooks_ } }
                    keyExtractor={ this._keyExtractor }
                    renderItem={ this._renderItem }
                />
            </View>
        );
    }

    _keyExtractor = ({ id }) => id;

    _renderItem = ({ item, index }) => {
        const {
            vm,
            myBookmarks_,
            myBooks_,
            showModal,
            hideModal,
            onClickMore
        } = this.props;
        const {
            id,
            user,
            bmcnt
        } = item;
        return (
            <Post
                onClickMore={ onClickMore }
                vm={ vm }
                showModal={ showModal }
                hideModal={ hideModal }
                onClickPost={ this.props.onClickNewsfeedCard.bind(this, id, user.id) }
                onClickNicknameTextOfPostTitle={ this.props.onClickNicknameTextOfPostTitle }
                bookInfo={ item }
                userInfo={ user }
                isMyBook={ this._isMyBook(id, myBooks_) }
                isBookmarked={ this._isMyBookmark(id, myBookmarks_) }
                bmcnt={ bmcnt }
            />
        );
    }

    _isMyBookmark = (id, bms) => {
        return (indexOfValueInArray(bms, id) !== -1);
    }

    _isMyBook = (id, books) => {
        return books.filter(b => b.id === id).length !== 0;
    }
}

NewsFeedList.propTypes = propTypes;
NewsFeedList.defaultProps = defaultProps;

export default NewsFeedList;
