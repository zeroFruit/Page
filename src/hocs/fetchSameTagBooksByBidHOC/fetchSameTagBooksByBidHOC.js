import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { types } from '../../ducks/index';
import { selectors as bookSelectors, actions as bookActions } from '../../ducks/book/index';
import {selectors} from "../../ducks";
import { ProgressBar } from '../../components';

export const fetchSameTagBooksByBidHOC = (WrappedComponent) => {
    class WithBooksAndUsers extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        state = {
            page: 0,
            nof: 3
        };
        componentWillUnmount() {
            this.props.UnmountFetchedBooksAction();
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success')) {
                await this.props.init();
            }
        }
        render() {
            const {
                selectedBooksByTag_,
                UnmountFetchedBooksAction,
                loading
            } = this.props;
            return (
                <WrappedComponent
                    { ...this.props }
                    booksInfo={ selectedBooksByTag_ }
                    requestBooksAndUsers={ this._requestBooksAndUsers }
                    resetBooks={ this._resetBooks } />
            );
        }

        _requestBooksAndUsers = async () => {
            const {
                id,
                selectedBooksByTag_,
                AsyncFetchBooksAndUsersByBidAction,
                loading,
                fetchState
            } = this.props;
            const { page, nof } = this.state;

            if (!loading && !fetchState.get('success')) {
                if (selectedBooksByTag_.length >= page * nof) {
                    await AsyncFetchBooksAndUsersByBidAction(id, nof, page);
                }
            }
        }

        _resetBooks = () => {
            console.log('reset books by BID');
            this.props.UnmountFetchedBooksAction();
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithBooksAndUsers);
};

const mapStateToProps = state => ({
    selectedBooksByTag_: bookSelectors.GetSelectedBooksByTag(state),
    loading: selectors.GetLoading(state),
    fetchState: selectors.GetFetchState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncFetchBooksAndUsersByBidAction: (id, numOfFeeds, page) => ({
        type: types.FETCH_BOOKS_AND_USERS_BY_BID.REQUEST,
        payload: { id, numOfFeeds, page }
    }),
    init: () => ({
        type: types.FETCH_BOOKS_AND_USERS_BY_BID.INIT
    }),
    UnmountFetchedBooksAction: bookActions.UnmountFetchedBooksByTag
}, dispatch);
