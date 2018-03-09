import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProgressBar } from '../../components';
import { actions, selectors } from '../../ducks/user';

export const SigninHOC = WrappedComponent => {
    class WithSignin extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        componentWillUnmount() {
            this.props.init();
        }
        async componentWillReceiveProps(np) {
            const { signinState, init } = np;
            if(signinState.get('success')) {
               await init();
            }
        }
        render() {
            const {
                signin,
                signinState,
                init
            } = this.props;
            return (
                <View style={ { flex: 1 } }>
                    { signinState.get('loading') ? <ProgressBar visible /> : null }
                    <WrappedComponent
                        {...this.props}
                        signin={ signin }
                        success={ signinState.get('success') }
                        err={ signinState.get('err') }
                        init={ init }
                    />
                </View>
            );
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(WithSignin)
};

const mapStateToProps = state => ({
    signinState: selectors.GetSignin(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signin: actions.signin,
    init: actions.initSigninState
}, dispatch);
