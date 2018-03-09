import React, { PureComponent } from 'react';
import ReactNative, { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { RegularText } from '../index';

class TextInputPanel extends PureComponent {
  render() {
    const { label, placeholder, textValue } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.labelContainer }>
          <RegularText>
            <Text style={ styles.labelText }>{ label }</Text>
          </RegularText>
        </View>
        <View style={ styles.textInputContainer }>
          <TextInput
            underlineColorAndroid="transparent"
            value={ textValue }
            onChangeText={ this.props.onChangeText }
            placeholder={ placeholder || '' }
            style={ styles.textInput } />
        </View>
      </View>
    );
  }
}


export default TextInputPanel;
