import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const { string, func } = PropTypes;

const HeaderRightText = ({ iconName, onClickRightText, label }) => (
  <TouchableOpacity
    style={ styles.container }
    onPress={ onClickRightText }>
    <Text style={ styles.labelText }>
      { label }
    </Text>
  </TouchableOpacity>
);


HeaderRightText.propTypes = {
};
HeaderRightText.defaultProps = {

};

export default HeaderRightText;
