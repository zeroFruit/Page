import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { compose } from 'recompose';

import ScreenWithSearchBarHeader from '../../components/ScreenWithSearchBarHeader';
import {
    Post,
    SearchHeaderButton,
    HeaderBackButton,
    RegularText,
    ModalContentOther,
    PostPageHeader
} from '../../components';

import { enhance as selectTagFetchHOC } from '../../hocs/selectTagFetchHOC';
import {
    fetchBookHOC,
    fetchBookmarksHOC,
    routeHOC,
    modalHOC
} from '../../hocs';

import {
    setParamsToNavigation,
} from '../../Router';
import ViewManager, * as _v from '../../ViewManager';

class PostSelected extends ScreenWithSearchBarHeader {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                borderWidth: 0.8,
                borderColor: '#595959',
            },
            headerTitle: (
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <RegularText>
                        <Text style={{
                            fontSize: 18.8,
                            textAlign: 'center',
                            color: '#363636',
                            fontWeight: '500'
                        }}>
                            { params.user ? params.user.displayName : '' }
                        </Text>
                    </RegularText>
                </View>
            ),
            headerLeft: (<HeaderBackButton onPress={ params.onClickBack } />),
            headerRight: (<SearchHeaderButton onPress={ params.onClickSearchIcon }/>)
        }
    }

    componentDidMount() {
        const {
            navigation,
            bookInfo: {
                user
            }
        } = this.props;
        setParamsToNavigation(this.props, {
            onClickSearchIcon: this._onClickSearchIcon,
            onClickBack: () => navigation.pop(1),
            user
        });
    }
    render() {
        const {
            bookInfo,
            id,
            tit,
            athr,
            myBookmarks_,
            myBooks_,
            vm,
        } = this.props;
        return (
            <ScrollView>
                <View>
                    <PostPageHeader
                        seeMore
                        tit={tit}
                        athr={athr}
                        onPress={this._onClickAuthorTag}
                    />
                    <Post
                        bmcnt={ bookInfo.bmcnt }
                        onClickMore={ this._onClickMore }
                        vm={ vm }
                        bookInfo={ bookInfo }
                        userInfo={ bookInfo.user }
                        tit={ tit }
                        athr={ athr }
                        isMyBook={ this._isMyBook(id, myBooks_) }
                        isBookmarked={ this._isMyBookmark(id, myBookmarks_) }
                        onClickAuthorTagOfPostTitle={ this._onClickAuthorTag }
                        onClickNicknameTextOfPostTitle={ this._onClickNicknameTextOfPostTitle } />
                </View>
            </ScrollView>
        );
    }

    _isMyBookmark = (id, bms) => {
        return bms.filter(bm => bm.id === id).length !== 0;
    }

    _isMyBook = (id, books) => {
        return books.filter(b => b.id === id).length !== 0;
    }

    _onClickAuthorTag = tagId => {
        const { id, navigate } = this.props;
        navigate('PostList', {
            id,
            fetchTagType: 'BY_BID',
            fetchBooksType: 'BY_BID',
            vm: new ViewManager(_v._getTextTitleProps)
        });
    }

    _onClickNicknameTextOfPostTitle = (userId) => {
        const { navigate, my } = this.props;
        const key = userId === my.get('id') ? 'MyPage' : 'Other';
        navigate(key, {
            userId
        });
    }

    _onClickMore = (book) => {
        const { my } = this.props;
        console.log(book);
        console.log(my.get('id'));
        if (book.user.id === my.get('id')) {
            this.props.navigate('EditPost', book);
        } else {
            this.props.showModal(ModalContentOther, { book });
        }
    }
}

export default compose(
    modalHOC,
    routeHOC,
    fetchBookmarksHOC,
    fetchBookHOC, // bookId
    selectTagFetchHOC // bid or athrid && titid
)(PostSelected);
