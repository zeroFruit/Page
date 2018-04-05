import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { types, selectors } from '../../ducks/index';
import { selectors as bookSelectors, actions as bookActions } from '../../ducks/book/index';
import { ProgressBar } from '../../components';

export const fetchSameTagBooksByTidHOC = (WrappedComponent) => {
    class WithBooksAndUsersByTag extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        state = {
            page: 0,
            nof: 3
        };
        componentWillUnmount() {
            this.props.UnmountFetchedBooks();
            console.log('unmount');
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success')) {
                // await this.setState({ page: this.state.page + 1 });
                await this.props.init();
            }
        }
        render() {
            const {
                selectedBooksByTag_,
                UnmountFetchedBooks,
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
                athrid,
                titid,
                selectedBooksByTag_,
                AsyncFetchBooksByTag,
                loading,
                fetchState
            } = this.props;
            const {
                page,
                nof
            } = this.state;
            if (!loading && !fetchState.get('success')) {
                if (selectedBooksByTag_.length >= page * nof) {
                    await AsyncFetchBooksByTag(athrid, titid, nof, page);
                }
            }
        }

        _resetBooks = () => {
            console.log('reset books by TID');
            this.props.UnmountFetchedBooks();
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithBooksAndUsersByTag);
};

const mapStateToProps = state => ({
    selectedBooksByTag_: bookSelectors.GetSelectedBooksByTag(state),
    loading: selectors.GetLoading(state),
    fetchState: selectors.GetFetchState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncFetchBooksByTag: (athrid, titid, numOfFeeds, page) => ({
        type: types.FETCH_BOOKS_AND_USERS_BY_TAG.REQUEST,
        payload: { athrid, titid, numOfFeeds, page }
    }),
    init: () => ({
        type: types.FETCH_BOOKS_AND_USERS_BY_TAG.INIT
    }),
    UnmountFetchedBooks: bookActions.UnmountFetchedBooksByTag,
}, dispatch);
