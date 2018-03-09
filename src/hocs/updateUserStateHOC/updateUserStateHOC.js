import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../ducks/user';

export const updateUserStateHOC = WrappedComponent => {
    class WithUpdateUserStateHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        render() {
            const {
                update,
                fetchState,
                init
            } = this.props;
            return (
                <WrappedComponent
                    { ...this.props }
                    updateUserState={ update }
                    success={ fetchState.get('success') }
                    loading={ fetchState.get('loading') }
                    initState={ init }
                />
            );
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(WithUpdateUserStateHOC);
};

const mapStateToProps = state => ({
    fetchState: selectors.GetFetchState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    init: actions.initUpdateState,
    update: actions.updateUserState
}, dispatch);
