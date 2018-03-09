import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { ModalTemplate } from '../../components';

export const modalHOC = WrappedComponent => (
    class WithModalHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        state = {
            isvisible: false,
            ModalContent: () => null,
            mProps: {}
        };
        componentWillUnmount() {
            console.log('modalHOC Unmount!!');
        }

        render() {
            const {
                isvisible,
                ModalContent,
                mProps
            } = this.state;
            return (
                <View style={ styles.container }>
                    {
                        isvisible ?
                            <ModalTemplate
                                { ...this.props }
                                mvisible={ isvisible }
                                hideModal={ this._hideModal }
                                ModalContent={ ModalContent }
                                mProps={ mProps }
                            /> : null
                    }

                    <WrappedComponent
                        { ...this.props }
                        showModal={ this._showModal }
                        hideModal={ this._hideModal }
                    />
                </View>
            );
        }

        _showModal = (ModalContent, mProps = {}) => this.setState({
            isvisible: true,
            ModalContent,
            mProps
        });
        _hideModal = () => this.setState({
            isvisible: false,
            ModalContent: null
        });
    }
);



const styles = StyleSheet.create({
   container: {
       flex: 1
   }
});