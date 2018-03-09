import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    types,
    selectors
} from '../../ducks/index';
import {
    selectors as bookSelectors,
    actions as bookActions
} from '../../ducks/book/index';
import { ProgressBar } from '../../components';
import {fetch} from "../../ducks/collection";

export const fetchBooksHOC = (WrappedComponent) => {
    class WithBooks extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        state = {
            page: 0,
            nof: 3
        };
        async componentWillUnmount() {
            // console.log('unmount!');
            await this.props.UnmountFetchedBooks();
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success')) {
                // await this.setState({ page: this.state.page + 1 });
                await this.props.init();
                // console.log('success');
            }
        }
        render() {
            const {
                selectedBooks_,
                UnmountFetchedBooks,
                fetchState,
                loading
            } = this.props;
            if(loading) {
                return <ProgressBar visible />;
            }
            return (
                <WrappedComponent
                    { ...this.props }
                    booksInfo={ selectedBooks_ }
                    requestBooksAndUsers={ this._requestBooksAndUsers }
                    resetBooks={ UnmountFetchedBooks } />
            );
        }

        _requestBooksAndUsers = async () => {
            const {
                selectedBooks_,
                AsyncFetchBooks,
                loading,
                fetchState
            } = this.props;
            // console.log('_requestBooksAndUsers execute!!!!');
            // console.log('page >> ', this.state.page);
            // console.log('books >>', selectedBooks_);
            const {
                page,
                nof
            } = this.state;
            if (!loading && !fetchState.get('success')) {
                if (selectedBooks_.length >= page * nof) {
                    await AsyncFetchBooks(nof, page);
                    // console.log('requested!');
                }
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithBooks);
};

const mapStateToProps = state => ({
    selectedBooks_: bookSelectors.GetSelectedBooks(state),
    loading: selectors.GetLoading(state),
    fetchState: selectors.GetFetchState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncFetchBooks: (numOfFeeds, page) => ({
        type: types.FETCH_BOOKS_AND_USERS.REQUEST,
        payload: { numOfFeeds, page }
    }),
    init: () => ({
        type: types.FETCH_BOOKS_AND_USERS.INIT
    }),
    UnmountFetchedBooks: bookActions.UnmountFetchedBooks
}, dispatch);
