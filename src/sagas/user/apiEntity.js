import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperUser, MapperBooks } from '../helper';

export function* fetchMeApi(uid) {
    const rt = yield call(agent.User.__fetchByUserId, uid);
    console.log(MapperUser(rt));
    return MapperUser(rt);
}

export function* fetchUserApi(uid) {
    const rt = yield call(agent.User.__fetchByUserId, uid);
    const books = yield call(agent.User.__fetchBooks, uid);
    return {
        user: MapperUser(rt),
        books: MapperBooks(books)
    };
}

export function* signUpApi(ud) {
    const { status } = yield call(agent.User.__signup, ud);
    if (status !== 200)
        throw new Error("같은 이메일의 회원이 존재합니다.");
    return ud;
}

export function* signInApi(ud) {
    const { status, data } = yield call(agent.User.__signin, ud);
    if (status !== 200)
        throw new Error("이메일이나 비밀번호가 정확하지 않습니다.");
    console.log('signInApi status', status);
    return data;
}

export function* signInWithTokenApi(ud) {
    // ud: email, accessToken
    const { status, data } = yield call(agent.User.__signinWithToken, ud);
    if (status !== 200)
        throw new Error("이메일이나 비밀번호가 정확하지 않습니다.");
    console.log('signInWithTokenApi status', status);
    return data;
}

export function* updateUserState(ud) {
    const { status, data } = yield call(agent.User.__update, ud);
    return data;
}

export function* sendMail({ book, reason }) {
    const { status, data } = yield call(agent.User.__sendMail, { book, reason });
}
