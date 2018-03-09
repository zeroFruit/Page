import React, { PureComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

class TagButton extends PureComponent {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableOpacity
        style={ styles.container }
        onPress={ onPress }>
        <Text
          style={ styles.text }>
          { title }
        </Text>
      </TouchableOpacity>
    );
  }
}

export default TagButton;
