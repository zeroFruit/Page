import { put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { types } from '../../ducks/user';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
    me: {
        ready: () => patch(types.FETCH_ME.READY),
        success: () => patch(types.FETCH_ME.SUCCESS, me),
        api: uid => api.fetchMeApi(uid),
        fetch: ud => saveUserToStore(ud)
    },
    selectedUser: {
        ready: () => patch(types.FETCH_SELECTED_USER.READY),
        success: pl => patch(types.FETCH_SELECTED_USER.SUCCESS, pl),
        api: uid => api.fetchUserApi(uid)
    },
    signup: {
        ready: () => patch(types.SIGN_UP.READY),
        success: ud => patch(types.SIGN_UP.SUCCESS, ud),
        fail: () => patch(types.SIGN_UP.FAILURE),
        api: ud => api.signUpApi(ud),
    },
    signin: {
        ready: () => patch(types.SIGN_IN.READY),
        success: ud => patch(types.SIGN_IN.SUCCESS, ud),
        fail: () => patch(types.SIGN_IN.FAILURE),
        api: ud => api.signInApi(ud),
        fetch: ud => saveUserToStore(ud)
    },
    signinWithToken: {
        ready: () => patch(types.SIGN_IN.READY),
        success: ud => patch(types.SIGN_IN.SUCCESS, ud),
        fail: () => patch(types.SIGN_IN.FAILURE),
        api: ud => api.signInWithTokenApi(ud),
        fetch: ud => saveUserToStore(ud)
    },
    update: {
        ready: () => patch(types.UPDATE_USER_STATE.READY),
        success: ud => patch(types.UPDATE_USER_STATE.SUCCESS, ud),
        api: ud => api.updateUserState(ud)
    },
    sendMail: {
        ready: () => patch(types.SEND_MAIL.READY),
        success: () => patch(types.SEND_MAIL.SUCCESS),
        api: md => api.sendMail(md)
    }
};

export const requestEntity = {
    me: fetchEntity.bind(null, requestData.me),
    selectedUser: fetchEntity.bind(null, requestData.selectedUser),
    signup: fetchEntity.bind(null, requestData.signup),
    signin: fetchEntity.bind(null, requestData.signin),
    signinWithToken: fetchEntity.bind(null, requestData.signinWithToken),
    update: fetchEntity.bind(null, requestData.update),
    sendMail: fetchEntity.bind(null, requestData.sendMail)
};

function* saveUserToStore({ accessToken, email, profile, displayName, id }) {
    yield call([AsyncStorage, 'setItem'], 'accessToken', accessToken);
    yield put({
        type: types.FETCH_ME,
        payload: {
            email,
            profile,
            displayName,
            id
        }
    });
}
