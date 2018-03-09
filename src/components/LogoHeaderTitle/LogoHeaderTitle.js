import React from 'react';
import {
    View,
    Image
} from 'react-native';
import styles from "./styles";

const icon = require('./images/logo.png');
const LogoHeaderTitle = props => (
    <View style={ styles.imageContainer }>
        <Image
            style={ styles.icon }
            source={ icon } />
    </View>
);

export default LogoHeaderTitle;