import React, { Children } from 'react';
import { Text, StyleSheet } from 'react-native';

const LightText = ({ children }) => (
    <Text style={ styles.container }>
        { Children.only(children) }
    </Text>
);

const styles = StyleSheet.create({
    container: {
        fontFamily: 'NotoSansCJKkr-DemiLight'
    }
});

export default LightText;