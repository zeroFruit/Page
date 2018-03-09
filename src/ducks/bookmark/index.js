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
    ADD_BOOKMARK: createRequestTypes(['bookmark', 'ADD_BOOKMARK']),
    REMOVE_BOOKMARK: createRequestTypes(['bookmark', 'REMOVE_BOOKMARK']),
    FETCH_BOOKMARK: createRequestTypes(['bookmark', 'FETCH_BOOKMARK']),
    FETCH_BOOKMARKS_IN_COLLECTION: createRequestTypes(['bookmark', 'FETCH_BOOKMARKS_IN_COLLECTION']),
    INIT_UPDATE_STATE: createType(['init', 'update_state'])
};

export const initialState = {
    myBookmarks_: List(),
    isBookmarkAdded_: createInitState('Bookmark', 'Add', stateType.NONE),
    isBookmarkRemoved_: createInitState('Bookmark', 'Remove', stateType.NONE),
    isBookmarkFetched_: createInitState('Bookmark', 'Fetch', stateType.NONE),
    myBookmarksInCollection: createInitState('BookmarksInCollection', 'Fetch', stateType.OBJ),
    fetchState: Map({
        success: false,
        err: false,
        loading: false
    }),
    updateState: Map({
        success: false,
        err: false,
        loading: false
    })
};

const add = {
    [types.ADD_BOOKMARK.READY]: (state, action) => {
        return {
            ...state,
            isBookmarkAdded_: setStateFlag(state.isBookmarkAdded_, true),
            updateState: state.updateState
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.ADD_BOOKMARK.SUCCESS]: (state, action) => {
        return {
            ...state,
            myBookmarks_: state.myBookmarks_.concat(action.payload),
            updateState: state.updateState
                .set('success', true)
                .set('err', false)
                .set('loading', false)
        };
    }
};

const remove = {
    [types.REMOVE_BOOKMARK.READY]: (state, action) => {
        return {
            ...state,
            updateState: state.updateState
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.REMOVE_BOOKMARK.SUCCESS]: (state, action) => {
        return {
            ...state,
            myBookmarks_: state.myBookmarks_.filter(bm => bm.id !== action.payload.id),
            updateState: state.updateState
                .set('success', true)
                .set('err', false)
                .set('loading', false)
        };
    }
};

const fetch = {
    [types.FETCH_BOOKMARK.INIT]: (state, action) => {
        return {
            ...state,
            fetchState: state.fetchState
                .set('success', false)
                .set('err', false)
                .set('loading', false)
        }
    },
    [types.FETCH_BOOKMARK.READY]: (state, action) => {
        return {
            ...state,
            fetchState: state.fetchState
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.FETCH_BOOKMARK.SUCCESS]: (state, action) => {
        console.log('fetch success', action.payload);
        return {
            ...state,
            fetchState: state.fetchState
                .set('success', true)
                .set('err', false)
                .set('loading', false),
            myBookmarks_: List(action.payload)
        };
    }
};

const fetchInCollection = {
    [types.FETCH_BOOKMARKS_IN_COLLECTION.READY]: (state, action) => {
        return {
            ...state,
            myBookmarksInCollection_: setStateFlag(state.myBookmarksInCollection_, false)
        };
    },
    [types.FETCH_BOOKMARKS_IN_COLLECTION.SUCCESS]: (state, action) => {
        return {
            ...state,
            myBookmarksInCollection_: setStatePayload(
                setStateFlag(state.myBookmarksInCollection_, false),
                action.payload
            )
        };
    }
};

const initUpdateState = {
    [types.INIT_UPDATE_STATE]: (state, action) => {
        return {
            ...state,
            updateState: state.updateState
                .set('success', false)
                .set("err", false)
                .set('loading', false)
        };
    }
}

export default bookmark = createReducer(initialState, {
    ...add,
    ...remove,
    ...fetch,
    ...fetchInCollection,
    ...initUpdateState
});

export const actions = {
    initFetchState: () => action(types.FETCH_BOOKMARK.INIT),
    initUpdateState: () => action(types.INIT_UPDATE_STATE)
};

export const selectors = {
    GetMyBookmarks:                     state => state.bookmark.myBookmarks_.toJS(),
    GetIsBookmarkedAdded:               state => getStateFlag(state.bookmark.isBookmarkAdded_),
    GetIsBookmarkedRemoved:             state => getStateFlag(state.bookmark.isBookmarkRemoved_),
    GetFetchState: state => state.bookmark.fetchState,
    GetUpdateState: state => state.bookmark.updateState
};
