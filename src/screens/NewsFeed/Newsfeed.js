import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { compose } from 'recompose';
import {
    setParamsToNavigation
} from '../../Router';
import {
    ScreenWithSearchBarHeader,
    NewsFeedList,
    PostAddingPanel,
    LogoHeaderTitle,
    SearchHeaderButton
} from '../../components';
import {
    fetchBooksHOC,
    fetchBookmarksHOC,
    routeHOC,
    modalHOC
} from '../../hocs';
import ViewManager, * as _v from '../../ViewManager';
import __auth from "../../Auth";

class NewsFeed extends ScreenWithSearchBarHeader {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitle: (<LogoHeaderTitle />),
            headerLeft: (<View />),
            headerRight: (<SearchHeaderButton handlePress={ params.onClickSearchIcon }/>)
        };
    };

    componentWillMount() {
        setParamsToNavigation(this.props, {
            onClickSearchIcon: this._onClickSearchIcon
        });
    }

    async componentDidMount() {
        await this.props.requestBooksAndUsers()
    }

    render() {
        const {
            showModal,
            hideModal,
            booksInfo,
            usersInfo,
            bookmarksAndBooks
        } = this.props;
        return (
            <View style={ styles.container }>
                <PostAddingPanel
                    onClickAddPost={ this._onClickAddPost } />
                <NewsFeedList
                    onClickMore={ this._onClickMore }
                    showModal={ showModal }
                    hideModal={ hideModal }
                    vm={ new ViewManager(_v._getTextTitleProps) }
                    booksInfo={ booksInfo }
                    usersInfo={ usersInfo }
                    bookmarks={ bookmarksAndBooks }
                    onClickNewsfeedCard={ this._onClickNewsfeedCard }
                    onClickNicknameTextOfPostTitle={ this._onClickNicknameTextOfPostTitle }
                />
            </View>
        );
    }

    _onClickAddPost = () => {
        this.props.navigate('NewPost');
    }

    _onClickNewsfeedCard = (id, user) => {
        this.props.navigate('PostList', {
            id,
            vm: new ViewManager(_v._getTextTitleProps)
        });
    }

    _onClickNicknameTextOfPostTitle = (userId) => {
        const key = userId === __auth.getId() ? 'MyPage' : 'Other';
        this.props.navigate(key, { userId });
    }

    _onClickMore = (book) => {
        this.props.resetBooks();
        this.props.navigate('EditPost', book);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center'
    }
});

export default compose(
    routeHOC,
    fetchBookmarksHOC,
    fetchBooksHOC
)(NewsFeed);
