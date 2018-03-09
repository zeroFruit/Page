import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

const SearchHeaderButton = ({ onPress = (() => {}) }) => (
    <TouchableOpacity
        style={ styles.container }
        onPress={ onPress }>
        <Image
            style={ styles.icon }
            source={ require('./images/search_icon.png') } />
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
        width: 20.3,
        height: 20.3,
    }
});

export default SearchHeaderButton;