import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { types, selectors, actions } from '../ducks/user';
import {
    ProgressBar
} from '../components';

export const fetchUserByIdHOC = (WrappedComponent) => {
    class WithUser extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        async componentDidMount() {
            const {
                userId,
                fetchSelectedUser
            } = this.props;
            await fetchSelectedUser(userId);
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success')) {
                await this.props.init();
            }
        }
        componentWillUnmount() {
            this.props.unmountUser();
        }
        render() {
            const {
                fetchState,
            } = this.props;
            if(fetchState.get('loading') && !fetchState.get('success'))
                return <ProgressBar visible />
            return (
                <WrappedComponent { ...this.props } />
            );
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithUser);
};

const mapStateToProps = state => ({
    user: selectors.GetSelectedUser(state),
    fetchState: selectors.GetFetchUser(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSelectedUser: userId => ({
        type: types.FETCH_SELECTED_USER.REQUEST,
        payload: userId
    }),
    unmountUser: () => ({
        type: types.FETCH_SELECTED_USER_UNMOUNT
    }),
    init: actions.initFetchState
}, dispatch);
