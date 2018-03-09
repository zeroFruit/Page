import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import {
  HeaderTitleBar,
  HeaderRightIcon
} from '../index';
import {
  withDefaultHeaderHOC,
  requestSearchTextHOC,
  fetchHeaderTitlePropsHOC
} from '../../hocs';

const propTypes = {};
const defaultProps = {};


class HeaderBarBasic extends PureComponent {
  render() {
    const { headerTitleProps, onClickSearchIcon } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.searchContainer }>
          <HeaderTitleBar
            type={ headerTitleProps.type }
            text={ headerTitleProps.text }
            icon={ headerTitleProps.icon } />
          <HeaderRightIcon
            source={ require('./image/search_icon.png') }
            handlePress={ this._onClickRightIcon } />
        </View>
      </View>
    );
  }

  _onClickRightIcon = () => {
    this.props.onClickSearchIcon();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

HeaderBarBasic.propTypes = propTypes;
HeaderBarBasic.defaultProps = defaultProps;

export default compose(
  fetchHeaderTitlePropsHOC,
  withDefaultHeaderHOC,
  requestSearchTextHOC
)(HeaderBarBasic);
