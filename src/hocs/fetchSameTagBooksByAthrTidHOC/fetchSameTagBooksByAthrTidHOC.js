import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {selectors, types} from '../../ducks';
import { selectors as bookSelectors, actions as bookActions } from '../../ducks/book';
import { selectors as userSelectors, actions as userActions } from '../../ducks/user';
import { selectors as pageSelectors, actions as pageActions } from '../../ducks/page';

export const fetchSameTagBooksByAthrTidHOC = (WrappedComponent) => {
    class WithBooksAndUsers extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        state = {
            page: 0,
            nof: 3
        };
        componentWillUnmount() {
            this.props.UnmountFetchedBooks();
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success')) {
                // await this.setState({ page: this.state.page + 1 });
                await this.props.init();
            }
        }
        render() {
            const {
                selectedBooksByAuthorTag_,
                UnmountFetchedBooks
            } = this.props;
            return (
                <WrappedComponent
                    { ...this.props }
                    booksInfo={ selectedBooksByAuthorTag_ }
                    requestBooksAndUsers={ this._requestBooksAndUsers }
                    resetBooks={ UnmountFetchedBooks } />
            );
        }

        _requestBooksAndUsers = async () => {
            const {
                bidForAuthorTag,
                selectedBooksByAuthorTag_,
                AsyncFetchBooksByAuthorTag,
                loading,
                fetchState
            } = this.props;
            const {
                page,
                nof
            } = this.state;
            if (!loading && !fetchState.get('success')) {
                if (selectedBooksByAuthorTag_.length >= page * nof) {
                    await AsyncFetchBooksByAuthorTag(bidForAuthorTag, nof, page);
                }
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithBooksAndUsers);
};

const mapStateToProps = state => ({
    selectedBooksByAuthorTag_: bookSelectors.GetSelectedBooksByAuthorTag(state),
    loading: selectors.GetLoading(state),
    fetchState: selectors.GetFetchState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncFetchBooksByAuthorTag: (bidForAuthorTag, numOfFeeds, page) => ({
        type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.REQUEST,
        payload: { bidForAuthorTag, numOfFeeds, page }
    }),
    init: () => ({
        type: types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.INIT
    }),
    UnmountFetchedBooks: bookActions.UnmountFetchedBooksByAuthorTag
}, dispatch);
