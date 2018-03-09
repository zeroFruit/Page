import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/book';
import { requestEntity as re } from './requestEntity';

export function* AsyncAddBook(action) {
    const result = yield call(re.addBook, action.payload);
    return result;
}

export function* AsyncRmBook(action) {
    yield call(re.rmBook, action.payload);
}

export function* AsyncEditBook(action) {
    yield call(re.editBook, action.payload);
}

export function* AsyncRankBook(action) {
    yield call(re.rankBook, action.payload);
}

export default function* rootSaga() {
    yield takeLatest(types.ADD_BOOK.REQUEST, AsyncAddBook);
    yield takeLatest(types.REMOVE_BOOK.REQUEST, AsyncRmBook);
    yield takeLatest(types.EDIT_BOOK.REQUEST, AsyncEditBook);
    yield takeLatest(types.FETCH_RANK.REQUEST, AsyncRankBook);
}
