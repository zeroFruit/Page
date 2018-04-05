import React, { PureComponent } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';
import { RegularText } from '../index';

class TextInputForm extends PureComponent {
    render() {
        const {
            label,
            placeholder,
            textValue = '',
            onChangeText = () => {},
            errMessage = '',
            infoMessage = '',
            secureTextEntry = false,
            editable = true
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.inputContainer }>
                    <View style={ styles.labelContainer }>
                        <RegularText>
                            <Text style={ styles.labelText }>{ label }</Text>
                        </RegularText>
                    </View>
                    <View style={ styles.textInputContainer }>
                        <TextInput
                            editable={ editable }
                            secureTextEntry={ secureTextEntry }
                            underlineColorAndroid="transparent"
                            value={ textValue }
                            onChangeText={ onChangeText }
                            placeholder={ placeholder || '' }
                            style={ styles.textInput } />
                    </View>
                </View>
                {
                    errMessage !== '' ? (
                        <View style={ styles.errContainer }>
                            <RegularText>
                                <Text style={ styles.errText }>
                                    { errMessage }
                                </Text>
                            </RegularText>
                        </View>
                    ) : null
                }
                {
                    infoMessage !== '' ? (
                        <View style={ styles.infoContainer }>
                            <RegularText>
                                <Text style={ styles.infoText }>
                                    { infoMessage }
                                </Text>
                            </RegularText>
                        </View>
                    ) : null
                }

            </View>

        );
    }
}


export default TextInputForm;
