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

class CustomTabBar extends Component {
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
    const icons = [
      require('./image/tab_page_icon.png'),
      require('./image/tab_myfeed_icon.png'),
      require('./image/tab_bookmark_icon.png')
    ];
    return routes.map((route, index) => {
      // const isActive = index === selectedIndex;
      return (
        <TouchableOpacity
          key={ route.routeName }
          style={ styles.tab }
          onPress={ () => navigation.navigate(route.routeName) }>
          <Image
            style={ styles.icon }
            source={ icons[index] } />
        </TouchableOpacity>
      );
    });
  }
}

export default CustomTabBar;
