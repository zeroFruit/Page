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
} from '../helper';


export const types = {
    FETCH_BOOK: createRequestTypes(['book', 'FETCH_BOOK']),
    FETCH_BOOKS: createRequestTypes(['book', 'FETCH_BOOKS']),
    FETCH_BOOKS_BY_TAG: createRequestTypes(['book', 'FETCH_BOOKS_BY_TAG']),
    FETCH_BOOKS_BY_AUTHOR_TAG: createRequestTypes(['book', 'FETCH_BOOKS_BY_AUTHOR_TAG']),
    FETCH_BOOKS_FOR_COLLECTION: createRequestTypes(['book', 'FETCH_BOOKS_FOR_COLLECTION']),
    FETCH_BOOKS_FOR_USER: createRequestTypes(['book', 'FETCH_BOOKS_FOR_USER']),
    ADD_BOOK: createRequestTypes(['book', 'ADD_BOOK']),
    REMOVE_BOOK: createRequestTypes(['book', 'REMOVE_BOOK']),
    EDIT_BOOK: createRequestTypes(['book', 'EDIT_BOOK']),
    FETCH_BOOK_UNMOUNT: createType(['book', 'FETCH_BOOK_UNMOUNT']),
    FETCH_BOOKS_UNMOUNT: createType(['book', 'FETCH_BOOKS_UNMOUNT']),
    FETCH_BOOKS_BY_TAG_UNMOUNT: createType(['book', 'FETCH_BOOKS_BY_TAG_UNMOUNT']),
    FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT: createType(['book', 'FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT']),
    _FETCH_BOOKS_FOR_COLLECTION: createType(['common', '_FETCH_BOOKS_FOR_COLLECTION']),
    _FETCH_MY_BOOKS: createType(['common', '_FETCH_MY_BOOKS']),
    _FETCH_BOOKS: createType(['common', '_FETCH_SELECTED_BOOKS']),
    _FETCH_BOOK: createType(['common', '_FETCH_SELECTED_BOOK']),
    _FETCH_BOOKS_BY_TAG: createType(['common', '_FETCH_SELECTED_BOOKS_BY_TAG']),
    _FETCH_BOOKS_BY_ATHR_TAG: createType(['common', '_FETCH_SELECTED_BOOKS_BY_ATHR_TAG']),
    _FETCH_BOOKS_FOR_USER: createType(['book', '_FETCH_BOOKS_FOR_USER']),
    _ADD_BOOK_INIT: createType(['book', '_ADD_BOOK_INIT']),
    _REMOVE_BOOK_INIT: createType(['book', '_REMOVE_BOOK_INIT']),
    FETCH_RANK: createRequestTypes(['book', 'FETCH_RANK']),
    FETCH_RECENT_BOOKS: createRequestTypes(['books', 'FETCH_RECENT_BOOKS']),
};

export const initialState = {
    myBooks_: createInitState('MyBooks', 'Fetch', stateType.LIST),
    selectedBook_: Map(),
    selectedBooks_: List(),
    selectedBooksByTag_: List(),
    selectedBooksByAuthorTag_: List(),
    selectedBooksForUser_: createInitState('SelectedBooksForUser', 'Fetch', stateType.LIST),
    add: Map({
        success: false,
        err: false,
        loading: false
    }),
    rm: Map({
        success: false,
        err: false,
        loading: false
    }),
    edit: Map({
        success: false,
        err: false,
        loading: false
    }),
    rank: Map({
        success: false,
        err: false,
        loading: false,
        payload: List()
    }),
    recentBooks: Map({
        success: false,
        err: false,
        loading: false,
        payload: List()
    })
};

const fetchMyBooks = {
    [types._FETCH_MY_BOOKS]: (state, action) => ({
        ...state,
        myBooks_: setStatePayload(state.myBooks_, action.payload)
    })
};

const fetchSelectedBook = {
    [types.FETCH_BOOK.READY]: (state, action) => ({
        ...state
    }),
    [types.FETCH_BOOK.SUCCESS]: (state, action) => ({
        ...state,
        selectedBook_: Map(action.payload)
    }),
    [types._FETCH_BOOK]: (state, action) => ({
        ...state,
        selectedBook_: Map(action.payload)
    })
};

const unfetchSelectedBook = {
    [types.FETCH_BOOK_UNMOUNT]: (state, action) => ({
        ...state,
        selectedBooks_: Map()
    })
}

const fetchBooks = {
    [types.FETCH_BOOKS.SUCCESS]: (state, action) => {
        return ({
            ...state,
            selectedBooks_: state.selectedBooks_.concat(action.payload)
        });
    },
    [types._FETCH_BOOKS]: (state, action) => {
        // console.log('action payload', action.payload);
        return ({
            ...state,
            selectedBooks_: state.selectedBooks_.concat(action.payload)
        });
    }
};

const unfetchBooks = {
    [types.FETCH_BOOKS_UNMOUNT]: (state, action) => {
        // console.log('reducer >> init');
        return ({
            ...state,
            selectedBooks_: List()
        })
    }
};

const fetchBooksByTag = {
    [types.FETCH_BOOKS_BY_TAG.SUCCESS]: (state, action) => {
        return {
            ...state,
            selectedBooks_: List(action.payload)
        };
    },
    [types._FETCH_BOOKS_BY_TAG]: (state, action) => {
        return {
            ...state,
            selectedBooks_: List(action.payload)
        };
    }
};

const unfetchBooksByTag = {
    [types.FETCH_BOOKS_BY_TAG_UNMOUNT]: (state, action) => {
        console.log('ducks unmount selectedBooks');
        return ({
            ...state,
            selectedBooks_: List()
        })
    }
};

const fetchBooksByAuthorTag = {
    [types.FETCH_BOOKS_BY_AUTHOR_TAG.SUCCESS]: (state, action) => {
        return {
            ...state,
            selectedBooks_: List(action.payload)
        };
    },
    [types._FETCH_BOOKS_BY_ATHR_TAG]: (state, action) => {
        return {
            ...state,
            selectedBooks_: List(action.payload)
        };
    }
};

const unfetchBooksByAuthorTag = {
    [types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT]: (state, action) => {
        return {
            ...state,
            selectedBooks_: List()
        };
    }
};

const fetchBooksByUser = {
    [types.FETCH_BOOKS_FOR_USER.READY]: (state, action) => {
        return {
            ...state,
            selectedBooksForUser_: setStateFlag(state.selectedBooksForUser_, false)
        };
    },
    [types.FETCH_BOOKS_FOR_USER.SUCCESS]: (state, action) => {
        return {
            ...state,
            selectedBooksForUser_: setStatePayload(
                setStateFlag(state.selectedBooksForUser_, true),
                action.payload
            )
        };
    },
    [types._FETCH_BOOKS_FOR_USER]: (state, action) => {
        return {
            ...state,
            selectedBooksForUser_: setStatePayload(
                state.selectedBooksForUser_,
                action.payload
            )
        };
    }
};

const add = {
    [types.ADD_BOOK.INIT]: (state, action) => {
        console.log('init!!');
        return {
            ...state,
            add: initialState.add
        };
    },
    [types.ADD_BOOK.READY]: (state, action) => {
        return {
            ...state,
            add: state.add
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.ADD_BOOK.SUCCESS]: (state, action) => {
        return {
            ...state,
            add: state.add
                .set('success', true)
                .set('err', false)
                .set('loading', false)
        };
    }
};

const rm = {
    [types._REMOVE_BOOK_INIT]: (state, action) => {
        return {
            ...state,
            rm: state.rm
                .set('success', false)
                .set('err', false)
                .set('loading', false)
        }
    },
    [types.REMOVE_BOOK.READY]: (state, action) => {
        return {
            ...state,
            rm: state.rm
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.REMOVE_BOOK.SUCCESS]: (state, action) => {
        return {
            ...state,
            rm: state.rm
                .set('success', true)
                .set('err', false)
                .set('loading', false)
        };
    },
};

const edit = {
    [types.EDIT_BOOK.INIT]: (state, action) => {
        return {
            ...state,
            edit: state.edit
                .set('success', false)
                .set('err', false)
                .set("loading", false)
        };
    },
    [types.EDIT_BOOK.READY]: (state, action) => {
        return {
            ...state,
            edit: state.edit
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        }
    },
    [types.EDIT_BOOK.SUCCESS]: (state, action) => {
        return {
            ...state,
            edit: state.edit
                .set('success', true)
                .set('err', false)
                .set('loading', false)
        };
    }
};

const rank = {
    [types.FETCH_RANK.INIT]: (state, action) => {
        return {
            ...state,
            rank: state.rank
                .set('success', false)
                .set('err', false)
                .set('loading', false)
        };
    },
    [types.FETCH_RANK.READY]: (state, action) => {
        return {
            ...state,
            rank: state.rank
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.FETCH_RANK.SUCCESS]: (state, action) => {
        return {
            ...state,
            rank: state.rank
                .set('success', true)
                .set('err', false)
                .set('loading', false)
                .set('payload', List(action.payload))
        };
    },
};

const fetchRecentBooks = {
    [types.FETCH_RECENT_BOOKS.INIT] : (state, action) => {
        return {
            ...state,
            recentBooks: state.recentBooks
                .set('success', false)
                .set('err', false)
                .set('loading', false)
        };
    },
    [types.FETCH_RECENT_BOOKS.READY] : (state, action) => {
        return {
            ...state,
            recentBooks: state.recentBooks
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.FETCH_RECENT_BOOKS.SUCCESS] : (state, action) => {
        return {
            ...state,
            recentBooks: state.recentBooks
                .set('success', true)
                .set('err', false)
                .set('loading', false)
                .set('payload', List(action.payload))
        };
    },
};



export default book = createReducer(initialState, {
    ...fetchMyBooks,
    ...fetchSelectedBook,
    ...unfetchSelectedBook,
    ...fetchBooks,
    ...unfetchBooks,
    ...fetchBooksByTag,
    ...unfetchBooksByTag,
    ...fetchBooksByAuthorTag,
    ...unfetchBooksByAuthorTag,
    ...fetchBooksByUser,
    ...add,
    ...rm,
    ...edit,
    ...rank,
    ...fetchRecentBooks,
});

export const actions = {
    UnmountFetchedBook: () => action(types.FETCH_BOOK_UNMOUNT),
    UnmountFetchedBooks: () => action(types.FETCH_BOOKS_UNMOUNT),
    UnmountFetchedBooksByTag: () => action(types.FETCH_BOOKS_BY_TAG_UNMOUNT),
    UnmountFetchedBooksByAuthorTag: () => action(types.FETCH_BOOKS_BY_AUTHOR_TAG_UNMOUNT),
    InitAddBookState: () => action(types.ADD_BOOK.INIT),
    InitRmBookState: () => action(types._REMOVE_BOOK_INIT),
    RmBook: (bid) => action(types.REMOVE_BOOK.REQUEST, { bid }),
    AddBook: book => action(types.ADD_BOOK.REQUEST, book),
    InitEditBook: () => action(types.EDIT_BOOK.INIT),
    EditBook: ({ bid, author, title, content }) => action(types.EDIT_BOOK.REQUEST, { bid, author, title, content }),
    InitRank: () => action(types.FETCH_RANK.INIT),
    Rank: () => action(types.FETCH_RANK.REQUEST),
    FetchRecentBooks: () => action(types.FETCH_RECENT_BOOKS.REQUEST),
    InitRecentBooks: () => action(types.FETCH_RECENT_BOOKS.INIT),
};

export const selectors = {
    GetMyBooks:                     state => getStatePayload(state.book.myBooks_),
    GetSelectedBook:                state => state.book.selectedBook_.toJS(),
    GetSelectedBooks:               state => state.book.selectedBooks_.toJS(),
    GetSelectedBooksByTag:          state => state.book.selectedBooks_.toJS(),
    GetSelectedBooksByAuthorTag:    state => state.book.selectedBooks_.toJS(),

    GetRm: state => state.book.rm,
    GetEdit: state => state.book.edit,
    GetRank: state => state.book.rank,
    GetAdd: state => state.book.add,
    GetRecentBooks: state => state.book.recentBooks,
};
