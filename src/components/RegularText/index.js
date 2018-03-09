import React, { PureComponent, Children } from 'react';
import { Text, StyleSheet } from 'react-native';

class RegularText extends PureComponent {
  render() {
    return (
      <Text style={ styles.container }>
        { Children.only(this.props.children) }
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'NotoSansCJKkr-Medium'
  }
});

export default RegularText;
