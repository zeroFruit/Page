import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { ModalContentMe, ModalContentOther } from '../../components';

export const selectModalContentHOC = WrappedComponent => (
    class WithModalContentHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        render() {
            const { isMyBook } = this.props;
            return (
                    <WrappedComponent
                        { ...this.props }
                        ModalContent={ isMyBook ? ModalContentMe : ModalContentOther }
                    />
            );
        }
    }
);