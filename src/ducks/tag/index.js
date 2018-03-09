import { Map } from 'immutable';
import {
    action,
    createReducer,
    createRequestTypes,
    createType,
} from '../helper';

export const types = {
    FETCH_TAG_BY_BID: createRequestTypes(['tag', 'FETCH_TAG_BY_BID']),
    FETCH_TAG_BY_TID: createRequestTypes(['tag', 'FETCH_TAG_BY_TID']),
    UNMOUNT_TAG: createType(['tag', 'UNMOUNT_TAG']),
    INIT_FETCH_STATE: createType(['tag', 'INIT_FETCH_STATE'])
};

export const initialState = {
    selectedTag_: Map(),
    loading: false,
    fetchState: Map({
        success: false,
        err: false,
        loading: false
    })
};

const initFetchState = {
    [types.INIT_FETCH_STATE]: (state, action) => ({
        ...state,
        loading: false,
        fetchState: state.fetchState
            .set('success', false)
            .set('err', false)
            .set('loading', false)
    })
}

const fetchTagByBid = {
    [types.FETCH_TAG_BY_BID.READY]: (state, action) => ({
        ...state,
        loading: true,
        fetchState: state.fetchState
            .set('success', false)
            .set('err', false)
            .set('loading', true)
    }),
    [types.FETCH_TAG_BY_BID.SUCCESS]: (state, action) => {
        return ({
            ...state,
            loading: false,
            fetchState: state.fetchState
                .set('success', true)
                .set('err', false)
                .set('loading', false),
            selectedTag_: Map({
                title: action.payload.bookTitle,
                author: action.payload.bookAuthor
            })
        });
    }
};

const fetchTagByTid = {
    [types.FETCH_TAG_BY_TID.INIT]: (state, action) => ({
        ...state,
        loading: false,
        fetchState: state.fetchState
            .set('success', false)
            .set("err", false)
            .set('loading', false)
    }),
    [types.FETCH_TAG_BY_TID.READY]: (state, action) => ({
        ...state,
        loading: true,
        fetchState: state.fetchState
            .set('success', false)
            .set("err", false)
            .set('loading', true)
    }),
    [types.FETCH_TAG_BY_TID.SUCCESS]: (state, action) => {
        return ({
            ...state,
            loading: false,
            fetchState: state.fetchState
                .set('success', true)
                .set('err', false)
                .set('loading', false),
            selectedTag_: Map({
                title: action.payload.bookTitle,
                author: action.payload.bookAuthor
            })
        });
    }
};

const unmountTag = {
    [types.UNMOUNT_TAG]: (state, action) => ({
        ...state,
        selectedTag_: initialState.selectedTag_
    })
};

export default tag = createReducer(initialState, {
    ...initFetchState,
    ...fetchTagByBid,
    ...fetchTagByTid,
    ...unmountTag
});

export const actions = {
    UnmountTag: () => action(types.UNMOUNT_TAG),
    initFetchState: () => action(types.INIT_FETCH_STATE),
};

export const selectors = {
    GetSeletedBookTitleTag: state => state.tag.selectedTag_.get('title'),
    GetSelectedBookAuthorTag: state => state.tag.selectedTag_.get('author'),
    GetLoading: state => state.tag.loading,
    GetFetchState: state => state.tag.fetchState
};
