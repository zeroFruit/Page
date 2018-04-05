import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/user';
import { requestEntity as re } from './requestEntity';
import { hasPath } from "../../utils/ObjectUtils";

export function* AsyncFetchMyInfoRequest(action) {
    const result = yield call(re.me, action.payload);

    return result;
}

export function* AsyncFetchSelectedUserInfoRequest(action) {
    const result = yield call(re.selectedUser, action.payload);
    return result;
}

export function* AsyncSignup(action) {
    yield call(re.signup, action.payload);
}

export function* AsyncSignin(action) {
    const { pw, accessToken } = action.payload;
    if(pw) {
        yield call(re.signin, action.payload);
    }
    if(accessToken) {
        yield call(re.signinWithToken, action.payload);
    }
}

export function* AsyncUpdate(action) {
    yield call(re.update, action.payload);
}

export function* AsyncSendMail(action) {
    yield call(re.sendMail, action.payload);
}

export default function* rootSaga() {
    yield takeLatest(types.FETCH_SELECTED_USER.REQUEST, AsyncFetchSelectedUserInfoRequest);
    yield takeLatest(types.SIGN_UP.REQUEST, AsyncSignup);
    yield takeLatest(types.SIGN_IN.REQUEST, AsyncSignin);
    yield takeLatest(types.UPDATE_USER_STATE.REQUEST, AsyncUpdate);
    yield takeLatest(types.SEND_MAIL.REQUEST, AsyncSendMail);
}
