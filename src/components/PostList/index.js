import React, { PureComponent } from 'react';
import { View, Text, FlatList, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import { ListTemplate, Post } from '../index';


import { indexOfValueInArray } from '../../utils/ArrayUtils';
import { pickByKey } from '../../utils/ObjectUtils';

class PostList extends PureComponent {
    render() {
        const {
            booksInfo,
        } = this.props;
            return (
            <View style={ { flex: 1 } } >
                <ListTemplate
                    data={ booksInfo }
                    extraData={ { booksInfo } }
                    keyExtractor={ this._keyExtractor }
                    renderItem={ this._renderItem }
                />
            </View>
        )
    }

    _keyExtractor = ({ id }) => id;

    _renderItem = ({ item }) => {
        const {
            vm,
            myBookmarks_,
            myBooks_,
            onClickAuthorTagOfPostTitle,
            onClickNicknameTextOfPostTitle,
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
                onClickPost={ () => { this._onClickNewsfeedCard(id, user.id); } }
                onClickAuthorTagOfPostTitle={ onClickAuthorTagOfPostTitle }
                onClickNicknameTextOfPostTitle={ onClickNicknameTextOfPostTitle }
                bookInfo={ item }
                userInfo={ user }
                isMyBook={ this._isMyBook(id, myBooks_) }
                isBookmarked={ this._isMyBookmark(id, myBookmarks_) }
                bmcnt={ bmcnt }
            />
        );
    }

    _isMyBookmark = (id, bms) => {
        return bms.filter(bm => bm.id === id).length !== 0;
    }

    _isMyBook = (id, books) => {
        return books.filter(b => b.id === id).length !== 0;
    }

    _onClickNewsfeedCard = (bookId, userId) => {
    }
}

export default PostList;
