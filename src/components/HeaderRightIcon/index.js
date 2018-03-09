import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const HeaderRightIcon = ({ source = undefined, handlePress = (() => {}) }) => (
  <TouchableOpacity
    style={ styles.container }
    onPress={ handlePress }>
    <Image
      style={ styles.icon }
      source={ source } />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 52,
    height: 52
  }
});

export default HeaderRightIcon;
