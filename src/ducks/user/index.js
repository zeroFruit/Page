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
    INIT_FETCH_STATE: createType(['user', 'INIT_FETCH_STATE']),
    FETCH_SELECTED_USER: createRequestTypes(['user', 'FETCH_SELECTED_USER']),
    FETCH_SELECTED_USERS: createRequestTypes(['user', 'FETCH_SELECTED_USERS']),
    FETCH_SELECTED_POST_LIST_USERS: createRequestTypes(['user', 'FETCH_SELECTED_POST_LIST_USERS']),

    FETCH_SELECTED_USER_UNMOUNT: createType(['user', 'FETCH_SELECTED_USER_UNMOUNT']),
    FETCH_SELECTED_USERS_UNMOUNT: createType(['user', 'FETCH_SELECTED_USERS_UNMOUNT']),
    FETCH_SELECTED_POST_LIST_USERS_UNMOUNT: createType(['user', 'FETCH_SELECTED_POST_LIST_USERS_UNMOUNT']),
    _FETCH_USERS: createType(['common', '_FETCH_SELECTED_USERS']),
    _FETCH_USER: createType(['common', '_FETCH_SELECTED_USER']),
    _FETCH_POST_LIST_USERS: createType(['common', '_FETCH_SELECTED_POST_LIST_USERS']),
    _OMIT_REMOVED_BOOK_USER: createType(['common', 'OMIT_REMOVED_BOOK_USER']),
    SIGN_UP: createRequestTypes(['user', 'signup']),
    SIGN_IN: createRequestTypes(['user', 'signin']),
    FETCH_ME: createType(['user', 'FETCH_ME']),
    UPDATE_USER_STATE: createRequestTypes(['user', 'UPDATE_USER_STATE']),
    SEND_MAIL: createRequestTypes(['send', 'mail'])
};

export const initialState = {
    me: Map(),
    selectedUser_: Map(),
    selectedUsers_: createInitState('SelectedUsers', 'Fetch', stateType.LIST),
    selectedPostListUsers_: createInitState('SelectedPostListUsers', 'Fetch', stateType.LIST),
    loading: false,
    fetchState: Map({
        success: false,
        err: false,
        loading: false
    }),
    signup: Map({
        success: false,
        err: false
    }),
    signin: Map({
        success: false,
        err: false,
        loading: false
    }),
    fetchUser: Map({
        success: false,
        err: false,
        loading: false
    }),
    sendMail: Map({
        success: false,
        err: false,
        loading: false
    })
};

const initFetchState = {
    [types.INIT_FETCH_STATE]: (state, action) => {
        return {
            ...state,
            loading: false,
            fetchState: state.fetchState
                .set('success', false)
                .set('err', false)
        }
    }
}
const signup = {
    [types.SIGN_UP.INIT]: (state, action) => {
        return ({
            ...state,
            loading: false,
            signup: initialState.signup
        });
    },
    [types.SIGN_UP.READY]: (state, action) => {
        return ({
            ...state,
            loading: true
        });
    },
    [types.SIGN_UP.SUCCESS]: (state, action) => {
        return ({
            ...state,
            loading: false,
            signup: state.signup
                .set('success', true)
                .set('err', false)
        })
    },
    [types.SIGN_UP.FAILURE]: (state, action) => {
        return ({
            ...state,
            loading: false,
            signup: state.signup
                .set('success', false)
                .set('err', true)
        });
    }
};

const signin = {
    [types.SIGN_IN.INIT]: (state, action) => {
        console.log('init!');
        return ({
            ...state,
            signin: initialState.signin
        });
    },
    [types.SIGN_IN.READY]: (state, action) => {
        return ({
            ...state,
            signin: state.signin
                .set('loading', true)
                .set('err', false)
                .set('success', false)
        })
    },
    [types.SIGN_IN.SUCCESS]: (state, action) => {
        console.log('success!');
        return ({
            ...state,
            signin: state.signin
                .set('success', true)
                .set('err', false)
                .set('loading', false)
        })
    },
    [types.SIGN_IN.FAILURE]: (state, action) => {
        console.log('fail!!');
        return ({
            ...state,
            signin: state.signin
                .set('success', false)
                .set('err', true)
                .set('loading', false)
        });
    }
};

const fetchMyInfo = {
    [types.FETCH_ME]: (state, action) => {
        return ({
            ...state,
            me: Map(action.payload)
        });
    }
};

const fetchUser = {
    [types.FETCH_SELECTED_USER.INIT]: (state, action) => ({
        ...state,
        fetchUser: state.fetchUser
            .set('success', false)
            .set('err', false)
            .set('loading', false)

    }),
    [types.FETCH_SELECTED_USER.READY]: (state, action) => ({
        ...state,
        fetchUser: state.fetchUser
            .set('loading', true)
    }),
    [types.FETCH_SELECTED_USER.SUCCESS]: (state, action) => ({
        ...state,
        fetchUser: state.fetchUser
            .set('success', true)
            .set('err', false)
            .set('loading', false),
        selectedUser_: Map(action.payload)
    })
};

const unfetchUser = {
    [types.FETCH_SELECTED_USER_UNMOUNT]: (state, action) => {
        return {
            ...state,
            selectedUser_: initialState.selectedUser_
        };
    }
};

const fetchUsers = {
    [types.FETCH_SELECTED_USERS.READY]: (state, action) => ({
        ...state,
        selectedUsers_: setStateFlag(state.selectedUsers_, false)
    }),
    [types.FETCH_SELECTED_USERS.SUCCESS]: (state, action) => {
        return ({
            ...state,
            selectedUsers_: concatStatePayload(
                setStateFlag(state.selectedUsers_, true),
                action.payload
            )
        });
    },
    [types._FETCH_USERS]: (state, action) => {
        return ({
            ...state,
            selectedUsers_: concatStatePayload(
                state.selectedUsers_,
                action.payload
            )
        });
    }
};

const unfetchUsers = {
    [types.FETCH_SELECTED_USERS_UNMOUNT]: (state, action) => {
        return ({
            ...state,
            selectedUsers_: initialState.selectedUsers_
        });
    }
};

const fetchPostListUsers = {
    [types.FETCH_SELECTED_POST_LIST_USERS.READY]: (state, action) => ({
        ...state,
        selectedPostListUsers_: setStateFlag(state.selectedPostListUsers_, false)
    }),
    [types.FETCH_SELECTED_POST_LIST_USERS.SUCCESS]: (state, action) => {
        return ({
            ...state,
            selectedPostListUsers_: concatStatePayload(
                setStateFlag(state.selectedPostListUsers_, true),
                action.payload
            )
        });
    },
    [types._FETCH_POST_LIST_USERS]: (state, action) => {
        return ({
            ...state,
            selectedPostListUsers_: concatStatePayload(
                state.selectedPostListUsers_,
                action.payload
            )
        });
    }
};

const unfetchPostListUsers = {
    [types.FETCH_SELECTED_POST_LIST_USERS_UNMOUNT]: (state, action) => {
        return ({
            ...state,
            selectedPostListUsers_: initialState.selectedPostListUsers_
        });
    }
};

const omitRemovedBookUser = {
    [types._OMIT_REMOVED_BOOK_USER]: (state, action) => {
        const uid = action.payload;
        const fus = List(getStatePayload(state.selectedUsers_)).filter(u => u.id !== uid).toJS();
        return ({
            ...state,
            selectedUsers_: setStatePayload(state.selectedUsers_, fus)
        });
    }
};

const updateUserState = {
    [types.UPDATE_USER_STATE.INIT]: (state, action) => {
        return {
            ...state,
            fetchState: state.fetchState
                .set('success', false)
                .set('err', false)
                .set('loading', false)
        };
    },
    [types.UPDATE_USER_STATE.READY]: (state, action) => {
        return {
            ...state,
            fetchState: state.fetchState
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.UPDATE_USER_STATE.SUCCESS]: (state, action) => {
        return {
            ...state,
            fetchState: state.fetchState
                .set('success', true)
                .set('err', false)
                .set('loading', false),
            me: Map(action.payload)
        };
    }
};

const sendMail = {
    [types.SEND_MAIL.INIT]: (state, action) => {
        return {
            ...state,
            sendMail: state.sendMail
                .set('success', false)
                .set('err', false)
                .set('loading', false)
        };
    },
    [types.SEND_MAIL.READY]: (state, action) => {
        return {
            ...state,
            sendMail: state.sendMail
                .set('success', false)
                .set('err', false)
                .set('loading', true)
        };
    },
    [types.SEND_MAIL.SUCCESS]: (state, action) => {
        return {
            ...state,
            sendMail: state.sendMail
                .set('success', true)
                .set('err', false)
                .set('loading', true)
        };
    },
}

export default user = createReducer(initialState, {
    ...initFetchState,
    ...fetchMyInfo,
    ...fetchUser,
    ...unfetchUser,
    ...fetchUsers,
    ...unfetchUsers,
    ...fetchPostListUsers,
    ...unfetchPostListUsers,
    ...omitRemovedBookUser,
    ...signup,
    ...signin,
    ...updateUserState,
    ...sendMail
});

export const actions = {
    signup: ud => action(types.SIGN_UP.REQUEST, ud),
    initSignupState: () => action(types.SIGN_UP.INIT),
    signin: ud => action(types.SIGN_IN.REQUEST, ud),
    initSigninState: () => action(types.SIGN_IN.INIT),
    initFetchState: () => action(types.FETCH_SELECTED_USER.INIT),
    updateUserState: ud => action(types.UPDATE_USER_STATE.REQUEST, ud),
    initUpdateState: () => action(types.UPDATE_USER_STATE.INIT),
    initSendMailState: () => action(types.SEND_MAIL.INIT),
    sendMail: ({ book, reason }) => action(types.SEND_MAIL.REQUEST, { book, reason })
};

export const selectors = {
    GetMe: state => state.user.me,
    GetSelectedUser: state => state.user.selectedUser_,
    GetLoading: state => state.user.loading,
    GetSignup: state => state.user.signup,
    GetSignin: state => state.user.signin,
    GetFetchState: state => state.user.fetchState,
    GetFetchUser: state => state.user.fetchUser,
    GetSendMailState: state => state.user.sendMail
};
