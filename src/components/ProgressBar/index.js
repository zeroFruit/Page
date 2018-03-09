import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const ProgressBar = ({ visible }) => (
    <Modal
        visible={ visible }
        onRequestClose={ () => {} }
        animationType={'fade'}
    >
        <View style={ styles.container }>
            <ActivityIndicator size="large" color="#707070" />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ProgressBar;
