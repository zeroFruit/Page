import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperBooks, MapperBook } from "../helper";

export function* addBookmarkApi({ bookId, uid }) {
    const book = yield call(agent.Bookmark.__add, bookId, uid);
    return MapperBook(book);

}

export function* removeBookmarkApi({ bookId, uid }) {
    const book = yield call(agent.Bookmark.__remove, bookId, uid);
    return MapperBook(book);
}

export function* fetchBookmarkApi(uid) {
    const result = yield call(agent.Bookmark.__fetchByUserId, uid);
    return MapperBooks(result);
}
