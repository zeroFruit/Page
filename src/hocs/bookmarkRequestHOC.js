import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, types, selectors } from '../ducks/bookmark';
import { selectors as userSelectors } from '../ducks/user';

export const bookmarkRequestHOC = WrappedComponent => {
    class WithBookmarkRequest extends PureComponent {
        async componentWillReceiveProps(np) {
            if(np.updateState.get('success')) await this.props.initUpdateState();
        }
        render() {
            const {
                updateState
            } = this.props;
            return (
                <WrappedComponent
                    { ...this.props }
                    addBm={ this._addBm }
                    rmBm={ this._rmBm }
                    bmLoading={ updateState.get('loading') }
                />
            )
        }

        _addBm = async bid => {
            const { my } = this.props;
            await this.props.AsyncAddBookmarkRequestAction(bid, my.get('id'));
        }
        _rmBm = async bid => {
            const { my } = this.props;
            await this.props.AsyncRemoveBookmarkRequestAction(bid, my.get('id'));
        }

    }

    return connect(mapStateToProps, mapDispatchToProps)(WithBookmarkRequest);
};

const mapStateToProps = state => ({
    bmAddStat: selectors.GetIsBookmarkedAdded(state),
    bmRmStat: selectors.GetIsBookmarkedRemoved(state),
    my: userSelectors.GetMe(state),
    updateState: selectors.GetUpdateState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncAddBookmarkRequestAction: (bookId, uid) => ({
        type: types.ADD_BOOKMARK.REQUEST,
        payload: {
            bookId,
            uid
        }
    }),
    AsyncRemoveBookmarkRequestAction: (bookId, uid) => ({
        type: types.REMOVE_BOOKMARK.REQUEST,
        payload: {
            bookId,
            uid
        }
    }),
    initUpdateState: actions.initUpdateState
}, dispatch);