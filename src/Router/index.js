import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    TabRouter,
    createNavigator,
    addNavigationHelpers,
    NavigationActions
} from 'react-navigation';

import { mapNavigateParamsToProps } from '../hocs/mapNavigateParamsToProps';

import Splash from '../screens/Splash/container';
import { Bookmark } from '../screens/BookMark';
import { MyPage } from '../screens/MyPage/index';
import {NewPost} from '../screens/NewPost';
import NewPostWrite from '../screens/NewPostWrite/container';
import { NewsFeed } from '../screens/NewsFeed';
import { PostSelected } from '../screens/PostSelected';
import { PostSelectedList } from '../screens/PostSelectedList';
import { OtherPage } from '../screens/OtherPage';
import SearchPage from '../screens/SearchPage';
import EditPost from '../screens/EditPost/EditPost';
import {Settings} from '../screens/Settings';
import {SignupPage} from '../screens/SignupPage';
import {SigninPage} from '../screens/SigninPage';
import { Main } from "../screens/Main";
import { BookmarkSelected } from '../screens/BookmarkSelected';
import { Intro } from '../screens/Intro';

import TabBar from '../components/TabBar';
import {ModalContentOther} from '../components/ModalContentOther';

import { hasPath } from '../utils/ObjectUtils';
import history from '../history';

class RouterComponent extends PureComponent {
    render() {
        const RootNavigator = StackNavigator({
            intro: {
                screen: Intro
            },
            splash: {
                screen: Splash
            },
            signup: {
                screen: SignupPage
            },
            signin: {
                screen: SigninPage
            },
            main: {
                screen: StackNavigator({
                    tabs: {
                        screen: CustomTabNavigator
                    },
                    NewPost: {
                        screen: NewPost
                    },
                    NewPostWrite: {
                        screen: mapNavigateParamsToProps(NewPostWrite)
                    },
                    search: {
                        screen: SearchPage
                    },
                    EditPost: {
                        screen: mapNavigateParamsToProps(EditPost)
                    },
                    Settings: {
                        screen: mapNavigateParamsToProps(Settings)
                    }
                }, MainNavigatorOptions)
            }
        }, RootNavigatorOptions);

        return (
            <View style={ { flex: 1 } }>
                <RootNavigator />
            </View>
        );
    }
}

export default RouterComponent;

const RootNavigatorOptions = {
    navigationOptions: {
        tabBarVisible: false
    },
    cardStyle: {
        backgroundColor: 'white'
    }
};

const MainNavigatorOptions = {
    headerMode: 'none'
};

const TabsNavigatorOptions = {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: 'gray',
        inactiveTintColor: 'black'
    },
    swipeEnabled: false,
    lazyLoad: true,
    animationEnabled: false
};

/*
  Custom tab view navigator
*/
export const CustomTabConfig = TabRouter({
    NewsFeed: {
        screen: Main
    },
    MyPage: {
        screen: MyPage
    },
    BookMark: {
        screen: mapNavigateParamsToProps(Bookmark)
    },
    PostList: {
        screen: mapNavigateParamsToProps(PostSelectedList)
    },
    Post: {
        screen: mapNavigateParamsToProps(PostSelected)
    },
    BookmarkPost: {
        screen: mapNavigateParamsToProps(BookmarkSelected)
    },
    Other: {
        screen: mapNavigateParamsToProps(OtherPage)
    }
}, TabsNavigatorOptions);

const CustomTabView = ({ router, navigation }) => {
    const { routes, index } = navigation.state;
    const ActiveScreen = router.getComponentForState(navigation.state);
    return (
        <View style={ styles.container }>
            <ActiveScreen
                navigation={ addNavigationHelpers({
                    ...navigation,
                    state: routes[index]
                }) } />
            <TabBar navigation={ navigation } />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    }
});
const CustomTabNavigator = createNavigator(CustomTabConfig)(CustomTabView);

/*
  Helper functions
*/
export const navigateTo = (props, to, params = {}) => {
    // const { state } = props.navigation;
    // history.push(state);
    props.navigation.navigate(to, params);
};

export const navigateToNested = (props, to, params, nestedScreenKey, nestedScreenParams = {}) => {
    const { state } = props.navigation;
    history.push(state);
    const navigateAction = NavigationActions.navigate({
        routeName: to,
        params,
        action: NavigationActions.navigate({
            routeName: nestedScreenKey,
            params: nestedScreenParams
        })
    });
    props.navigation.dispatch(navigateAction);
};

export const replace = (navigation, routeName, params = {}) => {
    navigation.replace(routeName, params);
};

// export const resetToMyPage = (navigation) => {
//     const resetAction = NavigationActions.reset({
//         index: 0,
//         key: null,
//         actions: [
//             NavigationActions.navigate({
//                 routeName: 'main',
//                 action: NavigationActions.navigate({
//                     routeName: 'tabs'
//                 })
//             })
//         ]
//     });
//     navigation.dispatch(resetAction);
// }

// export const getParamsFromNavigationState = (state) => {
//     if (hasPath(state, 'index')) {
//         const { index, routes } = state;
//
//         return getParamsFromNavigationState(routes[index]);
//     } else {
//         return hasPath(state, 'params') ? state.params : null;
//     }
// };

// export const renderHeaderWithNavigation = (navigation) => {
//     const params = getParamsFromNavigationState(navigation.state);
//     return (renderHeaderMethod) => {
//         return renderHeaderMethod(params);
//     };
// };

export const setParamsToNavigation = (props, params) => {
    props.navigation.setParams({ ...params });
};

// export const initParamsToNavigation = (props) => {
//     props.navigation.setParams({});
// };


