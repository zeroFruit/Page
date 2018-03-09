import React from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet
} from 'react-native';

const HeaderBackButton = ({ onPress = () => {} }) => (
    <TouchableOpacity
        onPress={ onPress }
        style={ styles.container }>
        <View>
            <Image
                style={ styles.icon }
                source={ require('./images/back_icon.png') }
            />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: 34,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 14.3,
        height: 23.5
    }
})

export default HeaderBackButton;