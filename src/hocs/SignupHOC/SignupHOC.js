import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actions } from '../../ducks/user';
import { ProgressBar } from '../../components';

export const SignupHOC = WrappedComponent => {
    class WithSignup extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        componentWillUnmount() {
            this.props.init();
        }
        render() {
            const {
                loading,
                signupState,
                signup,
                init
            } = this.props;
            return (
                <View style={ { flex: 1 } }>
                    { loading ? <ProgressBar visible /> : null }
                    <WrappedComponent
                        { ...this.props }
                        signup={ signup }
                        success={ signupState.get('success') }
                        err={ signupState.get('err') }
                        init={ init }
                    />
                </View>
            );
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithSignup);
};

const mapStateToProps = state => ({
    loading: selectors.GetLoading(state),
    signupState: selectors.GetSignup(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signup: actions.signup,
    init: actions.initSignupState
}, dispatch);