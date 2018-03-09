import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { RegularText } from '../index';

class PanelButton extends Component {
    render() {
        const { label, onPress } = this.props;
        return (
            <TouchableOpacity
                onPress={ onPress }>
                <View style={ styles.container }>
                    <RegularText>
                        <Text style={ styles.text }>
                            { label }
                        </Text>
                    </RegularText>
                </View>
            </TouchableOpacity>
        );
    }
}

export default PanelButton;
