import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from './styles';
import { takeFromArray } from '../../utils/ArrayUtils';

const NUM_OF_TABS = 3;

class TabBar extends Component {
    render() {
        const { navigation } = this.props;
        const { routes, index } = navigation.state;
        const Routes = takeFromArray(routes, NUM_OF_TABS);
        return (
            <View style={ styles.tabContainer }>
                {
                    this.renderTabs(Routes, index)
                }
            </View>
        );
    }

    renderTabs(routes, selectedIndex) {
        const { navigation } = this.props;
        const icons = [{
            inactive: require('./image/tab_page_icon.png'),
            active: require('./image/tab_page_selected_icon.png'),
            style: styles.tabIcon1
        }, {
            inactive: require('./image/tab_myfeed_icon.png'),
            active: require('./image/tab_myfeed_selected_icon.png'),
            style: styles.tabIcon2
        }, {
            inactive: require('./image/tab_bookmark_icon.png'),
            active: require('./image/tab_bookmark_selected_icon.png'),
            style: styles.tabIcon3
        }];

        return routes.map((route, index) => {
            const isActive = index === selectedIndex;
            return (
                <TouchableOpacity
                    key={ route.routeName }
                    style={ styles.tab }
                    onPress={ () => navigation.navigate(route.routeName) }>
                    <Image
                        style={ icons[index].style }
                        source={ !isActive ? icons[index].inactive : icons[index].active } />
                </TouchableOpacity>
            );
        });
    }
}

export default TabBar;
