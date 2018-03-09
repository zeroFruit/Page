import React, { PureComponent } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import {
  HeaderTitleBar,
  HeaderLeftIcon,
  HeaderRightIcon
} from '../index';
import {
  fetchHeaderTitlePropsHOC,
  withDefaultHeaderHOC
} from '../../hocs';

const propTypes = {};
const defaultProps = {};

class HeaderBarWithSearchBar extends PureComponent {
  render() {
    const { headerTitleProps, disableBack } = this.props;
    const backIcon = require('./image/back_icon.png');
    const searchIcon = require('./image/search_icon.png');

    return (
      <View style={ styles.container }>
        <View style={ styles.searchContainer }>
          {
            !disableBack ?
              <HeaderLeftIcon
                source={ backIcon }
                handlePress={ this._onClickLeftIcon } /> :
              <View />
          }
          <HeaderTitleBar
            type={ headerTitleProps.type }
            text={ headerTitleProps.text }
            icon={ headerTitleProps.icon }
            onClickAuthorTagOfHeader={ this._onClickAuthorTagOfHeader } />
          <HeaderRightIcon
            source={ searchIcon }
            handlePress={ this._onClickRightIcon } />
        </View>
      </View>
    );
  }

  _onClickLeftIcon = () => {
    const { onClickBack } = this.props;
    if (onClickBack) {
      onClickBack();
    } else {
      ToastAndroid.show('뒤로가기', ToastAndroid.SHORT);
    }
  }

  _onClickRightIcon = () => {
    this.props.onClickSearchIcon();
  }

  _onClickAuthorTagOfHeader = (tagId) => {
    this.props.onClickAuthorTagOfHeader(tagId);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

HeaderBarWithSearchBar.propTypes = propTypes;
HeaderBarWithSearchBar.defaultProps = defaultProps;

export default compose(
  fetchHeaderTitlePropsHOC,
  withDefaultHeaderHOC,
)(HeaderBarWithSearchBar);
