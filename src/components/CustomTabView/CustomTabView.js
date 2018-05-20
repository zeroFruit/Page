import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addNavigationHelpers} from "react-navigation";
import {
    getCurrentRouteName,
    getCurrentRouteParams,
} from "../../Router";
import TabBar from '../../components/TabBar';
import {actions} from '../../ducks/screen';

class CustomTabView extends PureComponent {
    componentWillReceiveProps(np) {
        const {navigation} = this.props;
        const currentRouteName = getCurrentRouteName(navigation.state);
        const currentRouteParams = getCurrentRouteParams(navigation.state);
        this.props.putScreen({
            routeName: currentRouteName,
            routeParams: currentRouteParams,
        });
    }
    render() {
        const {
            router,
            navigation,
        } = this.props;
        const {
            routes,
            index,
        } = navigation.state;

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
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    }
});

CustomTabView.propTypes = {};

const mapDispatchToProps = dispatch => bindActionCreators({
    putScreen: actions.putScreen,
}, dispatch);

export default connect(null, mapDispatchToProps)(CustomTabView);
