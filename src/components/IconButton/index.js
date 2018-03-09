import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default ({
                    source = null,
                    containerStyle = {},
                    iconStyle = {},
                    onPress = (() => {}) }) => (
    <TouchableOpacity
        style={ containerStyle }
        onPress={ onPress }>
        <Image
            style={ iconStyle }
            source={ source } />
    </TouchableOpacity>
);
