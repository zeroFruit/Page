import _ from 'lodash';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import {
    action,
    stateType,
    createType,
    createReducer,
    createRequestTypes,
    createInitState,
    setStateFlag,
    setStatePayload,
    concatStatePayload,
    getStateFlag,
    getStatePayload
} from './helper';

import book, { selectors as bookSelectors } from './book';
import bookmark, { selectors as bookmarkSelectors } from './bookmark';
import user from './user';
import tag from './tag';
import collection from './collection';
import page from './page';
import search from './search';
import screen from './screen';

export const selectors = {
    BookAndBookmarkSelector: createSelector(
        bookSelectors.GetMyBooks,
        bookmarkSelectors.GetMyBookmarks,
        (book, bookmark) => {
            return _.uniq(List(book).concat(bookmark).sort().toJS());
        }
    ),
    BookmarksWithIdProp: createSelector(
        bookmarkSelectors.GetMyBookmarks,
        bookmarks => bookmarks.map(bookmark => ({
            id: bookmark,
            bookId: bookmark
        }))
    ),
    GetLoading: state => state.index.loading,
    GetFetchState: state => state.index.fetchState
};

export const types = {
    FETCH_BOOK_AND_USER: createRequestTypes(['book', 'FETCH_BOOK_AND_USER']),
    FETCH_BOOKS_AND_USERS: createRequestTypes(['book', 'FETCH_BOOKS_AND_USERS']),
    FETCH_BOOKS_AND_USERS_BY_BID: createRequestTypes(['book', 'FETCH_BOOKS_AND_USERS_BY_BID']),
    FETCH_BOOKS_AND_USERS_BY_TAG: createRequestTypes(['book', 'FETCH_BOOKS_AND_USERS_BY_TAG']),
    FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG: createRequestTypes(['book', 'FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG']),
    FETCH_BOOKS_BY_COLLECTION: createRequestTypes(['book', 'FETCH_BOOKS_BY_COLLECTION']),
    FETCH_BOOKS_BY_USER: createRequestTypes(['book', 'FETCH_BOOKS_BY_USER'])
};

export const initialState = {
    isBookAndUserFetched_: createInitState('BookAndUser', 'Fetch', stateType.NONE),
    isBooksFetchedByUser_: createInitState('Books', 'FetchByUser', stateType.NONE),
    loading: false,
    fetchState: Map({
        success: false,
        err: false
    })
};

export const fetchBookAndUser = {
    [types.FETCH_BOOK_AND_USER.INIT]: (state, action) => ({
        ...state,
        fetchState: state.fetchState
            .set('success', false)
            .set('err', false),
        loading: false
    }),
    [types.FETCH_BOOK_AND_USER.READY]: (state, action) => ({
        ...state,
        loading: true
    }),
    [types.FETCH_BOOK_AND_USER.SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        fetchState: state.fetchState
            .set('success', true)
            .set('err', false)
    })
};

export const fetchBooksAndUsers = {
    [types.FETCH_BOOKS_AND_USERS.INIT]: (state, action) => ({
        ...state,
        fetchState: state.fetchState
            .set('success', false)
            .set('err', false),
        loading: false
    }),
    [types.FETCH_BOOKS_AND_USERS.READY]: (state, action) => ({
        ...state,
        loading: true
    }),
    [types.FETCH_BOOKS_AND_USERS.SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        fetchState: state.fetchState
            .set('success', true)
            .set('err', false)
    })
};

export const fetchBooksAndUsersByBid = {
    [types.FETCH_BOOKS_AND_USERS_BY_BID.INIT]: (state, action) => ({
        ...state,
        fetchState: initialState.fetchState,
        loading: false
    }),
    [types.FETCH_BOOKS_AND_USERS_BY_BID.READY]: (state, action) => ({
        ...state,
        loading: true
    }),
    [types.FETCH_BOOKS_AND_USERS_BY_BID.SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        fetchState: state.fetchState
            .set('success', true)
            .set('err', false)
    })
};

export const fetchBooksAndUsersByTag = {
    [types.FETCH_BOOKS_AND_USERS_BY_TAG.INIT]: (state, action) => ({
        ...state,
        fetchState: initialState.fetchState,
        loading: initialState.loading
    }),
    [types.FETCH_BOOKS_AND_USERS_BY_TAG.READY]: (state, action) => ({
        ...state,
        loading: true
    }),
    [types.FETCH_BOOKS_AND_USERS_BY_TAG.SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        fetchState: state.fetchState
            .set('success', true)
            .set('err', false)
    })
};

export const fetchBooksAndUsersByAuthorTag = {
    [types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.INIT]: (state, action) => ({
        ...state,
        fetchState: initialState.fetchState,
        loading: initialState.loading
    }),
    [types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.READY]: (state, action) => ({
        ...state,
        loading: true
    }),
    [types.FETCH_BOOKS_AND_USERS_BY_AUTHOR_TAG.SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        fetchState: state.fetchState
            .set('success', true)
            .set('err', false)
    })
};


export const fetchBooksByUser = {
    [types.FETCH_BOOKS_BY_USER.READY]: (state, action) => ({
        ...state,
        isBooksFetchedByUser_: setStateFlag(state.isBooksFetchedByUser_, false)
    }),
    [types.FETCH_BOOKS_BY_USER.SUCCESS]: (state, action) => ({
        ...state,
        isBooksFetchedByUser_: setStateFlag(state.isBooksFetchedByUser_, true)
    })
};

export const reducer = createReducer(initialState, {
    ...fetchBookAndUser,
    ...fetchBooksAndUsers,
    ...fetchBooksAndUsersByBid,
    ...fetchBooksAndUsersByTag,
    ...fetchBooksAndUsersByAuthorTag,
    ...fetchBooksByUser
});

export const actions = {
    initFetchState: () => action(types.FETCH_BOOK_AND_USER.INIT)
};

export default combineReducers({
    index: reducer,
    book,
    bookmark,
    user,
    tag,
    collection,
    page,
    search,
    screen
});
