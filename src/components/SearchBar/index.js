import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const { shape, string } = PropTypes;

const propTypes = {
};
const defaultProps = {
};

class SearchBar extends PureComponent {
  componentWillMount() {
    this._initSearchText();
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={ this.props.placeholder || '' }
          style={ styles.searchbarText }
          onChangeText={ this._onChangeText }
          onFocus={ this._onFocus }
          onBlur={ this._onBlur }
          value={ this.props.searchText } />
      </View>
    );
  }

  _initSearchText = () => {
    this.props.onChangeSearchText('');
  }

  _onChangeText = (text) => {
    this.props.onChangeSearchText(text);
  }

  _onBlur = () => {
    this.props.onBlurSearchbar();
  }

  _onFocus = () => {
    this.props.onFocus();
  }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
