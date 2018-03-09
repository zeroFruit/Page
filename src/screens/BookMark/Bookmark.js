import React from 'react';
import { compose } from 'recompose';
import {
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import styles from './styles';
import {
    BookmarkBookGallery,
    SearchHeaderButton,
    RegularText
} from '../../components';
import {
    navigateTo, setParamsToNavigation,
} from '../../Router';
import ViewManager, * as _v from '../../ViewManager';
import ScreenWithSearchBarHeader from "../../components/ScreenWithSearchBarHeader";
import { fetchBookmarksHOC } from "../../hocs";

class BookMark extends ScreenWithSearchBarHeader {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: .2,
                borderColor: '#595959'
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
                        }}>담아 둔 글</Text>
                    </RegularText>
                </View>
            ),
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
            },
            headerLeft: (<View />),
            headerRight: (<SearchHeaderButton onPress={ params.onClickSearchIcon } />)
        }
    };
    componentWillMount() {
        setParamsToNavigation(this.props, {
            onClickSearchIcon: this._onClickSearchIcon
        });
    }
    render() {
        const {
            bookmarks
        } = this.props;
        return (
            <TouchableWithoutFeedback
                style={ styles.container }
            >
                <View style={ styles.body }>
                    <BookmarkBookGallery
                        isShown
                        bookmarks={ bookmarks }
                        onClickGalleryCard={ this._onClickGalleryCard } />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _onClickGalleryCard = (id, user) => {
        const key = 'Post';
        const vm = new ViewManager(_v._getTagTitleProps);
        const params = {
            vm,
            id,
            user
        };
        navigateTo(this.props, key, params);
    }

}

export default compose(fetchBookmarksHOC)(BookMark);
