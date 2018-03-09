import React from 'react';
import { View } from 'react-native';
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
    ModalContentOther
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
                shadowOpacity: 0
            },
            headerTitle: (
                <TagHeader
                    tit={ params.tit }
                    athr={ params.athr}
                    onPress={ () => {} }
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
            },
            headerLeft: (<HeaderBackButton onPress={ params.onClickBack } />),
            headerRight: (<View />)
            // headerRight: (<SearchHeaderButton onPress={ params.onClickSearchIcon }/>)
        }
    }
    async componentDidMount() {
        const {
            navigation,
            requestBooksAndUsers,
            tit,
            athr,
        } = this.props;
        setParamsToNavigation(this.props, {
            onClickAuthorTagOfHeader: this._onClickAuthorTagOfHeader,
            onClickSearchIcon: this._onClickSearchIcon,
            onClickBack: () => navigation.goBack(),
            tit,
            athr
        });
        await requestBooksAndUsers();
    }
    componentWillUnmount() {
        this.props.resetBooks();
        this.props.resetTag();
    }
    render() {
        const {
            vm,
            booksInfo,
            myBookmarks_,
            showModal,
            hideModal
        } = this.props;
        return (
            <View style={ { flex: 1 } }>
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
    selectTagFetchHOC
)(PostSelectedList);
