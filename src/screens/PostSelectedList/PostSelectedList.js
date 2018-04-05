import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { compose } from 'recompose';
import { PostList } from '../../components';
import ScreenWithSearchBarHeader from '../../components/ScreenWithSearchBarHeader';
import { enhance as selectTagFetchHOC } from '../../hocs/selectTagFetchHOC';
import {
    fetchBookmarksHOC,
    mapSelectedPostFirstHOC,
    routeHOC,
    modalHOC,
    selectBooksFetchHOC
} from '../../hocs';
import {
    HeaderBackButton,
    SearchHeaderButton,
    TagHeader,
    ModalContentOther,
    PostPageHeader,
    RegularText,
} from '../../components';
import {
    setParamsToNavigation,
} from '../../Router';


class PostSelectedList extends ScreenWithSearchBarHeader {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                borderBottomWidth: 0.8,
                borderColor: '#595959',
            },
            headerTitle: (
                <View
                    style={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <RegularText>
                        <Text style={{
                            fontSize: 18.8,
                            textAlign: 'center',
                            color: '#363636',
                            fontWeight: '700'
                        }}>PAGE</Text>
                    </RegularText>
                </View>
            ),
            headerLeft: (<HeaderBackButton onPress={ params.onClickBack } />),
            headerRight: (<View />)
        }
    }
    async componentDidMount() {
        const {
            navigation,
            requestBooksAndUsers,
        } = this.props;
        setParamsToNavigation(this.props, {
            onClickAuthorTagOfHeader: this._onClickAuthorTagOfHeader,
            onClickSearchIcon: this._onClickSearchIcon,
            onClickBack: () => navigation.pop(1),
        });
        await requestBooksAndUsers();
    }
    async componentWillReceiveProps(np) {
        if(np.fetchState.get('success')) {
            await this.props.init();
        }
    }
    async componentWillUnmount() {
        await this.props.resetBooks();
        await this.props.resetTag();
    }
    render() {
        const {
            vm,
            booksInfo,
            myBookmarks_,
            showModal,
            hideModal,
            tit,
            athr
        } = this.props;
        return (
            <View style={ { flex: 1 } }>
                <PostPageHeader
                    tit={tit}
                    athr={athr}
                />
                <PostList
                    onClickMore={ this._onClickMore }
                    showModal={ showModal }
                    hideModal={ hideModal }
                    vm={ vm }
                    booksInfo={ booksInfo }
                    bookmarks={ myBookmarks_ }
                    onClickNewsfeedCard={ () => {} }
                    onClickAuthorTagOfPostTitle={ () => {} }
                    onClickNicknameTextOfPostTitle={ this._onClickNicknameTextOfPostTitle }
                />
            </View>
        );
    }

    _onClickNicknameTextOfPostTitle = (userId) => {
        const key = userId === this.props.my.get('id') ? 'MyPage' : 'Other';
        this.props.navigate(key, { userId });
    }

    _onClickMore = (book) => {
        const { my } = this.props;
        if (book.user.id === my.get('id')) {
            this.props.resetBooks();
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
    selectBooksFetchHOC,
    mapSelectedPostFirstHOC,
    selectTagFetchHOC,
)(PostSelectedList);
