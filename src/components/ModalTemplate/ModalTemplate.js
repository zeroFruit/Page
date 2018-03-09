import { Map } from 'immutable';
import React from 'react';
import { Modal, View, Text } from 'react-native';
import styles from './styles';

const ModalTemplate = ({
                           mvisible,
                           hideModal = () => {},
                           ModalContent = () => null,
                           mProps,
                           ...rest }) => {
    return (
        <Modal
            transparent
            visible={ mvisible }
            animationType={'fade'}
            onRequestClose={ hideModal }>
            <View style={ styles.container }>
                <View style={ styles.inner }>
                    <ModalContent
                        hideModal={ hideModal }
                        { ...mProps}
                        { ...rest } />
                </View>
            </View>
        </Modal>
    );
}

export default ModalTemplate;