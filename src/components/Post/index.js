import { Map } from 'immutable';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import PostTitle from '../PostTitle';
import PostImage from '../PostImage';
import PostButtonGroups from '../PostButtonGroups';
import PostContent from '../PostContent';
import { routeHOC } from '../../hocs';

const { string, shape, number, bool, func } = PropTypes;

const propTypes = {
    bookInfo: shape({
        id: number,
        img_src: string,
        likes: number,
        tags: string,
        content: string,
        user_id: number,
        views: number
    }),
    isMyBook: bool,
    isMyBookmark: bool,
    isBookmarked: bool,
};

const defaultProps = {
    userInfo: {},
    bookInfo: {},
    isMyBook: false,
    isMyBookmark: false,
    isBookmarked: false
};

class Post extends PureComponent {
    render() {
        const {
            showModal,
            ModalContent,
            bookInfo,
            isBookmarked,
            isMyBook,
            bmcnt,
            vm,
            onClickAuthorTagOfPostTitle,
            onClickNicknameTextOfPostTitle,
            onClickPost,
            onClickMore,
        } = this.props;
        const titleProps = vm._getTitlePropsMtd(this.props);
        return (
            <View>
                <PostTitle
                    titleProps={ titleProps }
                    onClickAuthorTagOfPostTitle={ onClickAuthorTagOfPostTitle }
                    onClickNicknameTextOfPostTitle={ onClickNicknameTextOfPostTitle } />
                <PostContent
                    content={ bookInfo.content } />
                <PostImage
                    imgSrc={ bookInfo.img_src }
                    onClickImage={ onClickPost ? onClickPost : () => {} } />
                <PostButtonGroups
                    onClickMore={ onClickMore.bind(this, bookInfo) }
                    bookId={ bookInfo.id }
                    likes={ bookInfo.likes }
                    views={ bookInfo.views }
                    isMyBook={ isMyBook }
                    isBookmarked={ isBookmarked }
                    bmcnt={ bmcnt }
                />
            </View>
        );
    }
}

Post.propTypes = propTypes;
Post.defaultProps = defaultProps;

export default Post;
