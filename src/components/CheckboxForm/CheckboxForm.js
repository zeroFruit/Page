import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import styles from './styles';
import { RegularText } from '../index';
import {IMG_SERVER} from "../../Agent";

const CheckboxForm = ({ label = '', sublabel = '', checked = false, onPress = () => {} }) => (
    <View style={ styles.container }>
        <View style={ styles.labelContainer }>
            <RegularText>
                <Text style={ styles.labelText }>{ label }</Text>
            </RegularText>
            <View style={ styles.subLabelContainer }>
                <RegularText>
                    <Text
                        onPress={ () => Linking.openURL(`${IMG_SERVER}/html/policy.html`) }
                        style={ styles.subLabel }>{ sublabel }</Text>
                </RegularText>
            </View>
        </View>
        <TouchableOpacity
            onPress={ onPress }
            style={ styles.checkboxContainer }
        >
            <View >
                <Image
                    style={ styles.checkbox }
                    source={
                        !checked ?
                            require('./images/check_default_icon.png') :
                            require('./images/check_selected_icon.png')
                    }
                />
            </View>
        </TouchableOpacity>

    </View>
);

export default CheckboxForm;