import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { RegularText } from '../index';

class TextArea extends PureComponent {
    render() {
        const {
            onChangeText,
            textValue,
            label = '',
            placeholder = ''
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.labelContainer }>
                    <RegularText>
                        <Text style={ styles.labelText }>
                            { label }
                        </Text>
                    </RegularText>
                </View>
                <View style={ styles.textAreaContainer }>
                    <TextInput
                        underlineColorAndroid="transparent"
                        value={ textValue }
                        onChangeText={ onChangeText }
                        style={ styles.textArea }
                        placeholder={ placeholder }
                        multiline />
                </View>
            </View>
        );
    }
}

export default TextArea;
