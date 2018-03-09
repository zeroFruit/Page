import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles'
import { RegularText } from '../index';

const TextHeaderButton = ({ onClickLeftText, label }) => (
    <TouchableOpacity
        style={ styles.container }
        onPress={ onClickLeftText }>
        <RegularText>
            <Text style={ styles.labelText }>
                { label }
            </Text>
        </RegularText>
    </TouchableOpacity>
);

export default TextHeaderButton;
