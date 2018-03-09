import { call, put, all } from 'redux-saga/effects';
import agent from '../../Agent';
import { requestEntity as bre } from '../book/requestEntity';
import { requestEntity as ure } from '../user/requestEntity';
import { types as bookTypes } from '../../ducks/book';
import { types as userTypes } from '../../ducks/user';
import {
    MapperBooksAndUsers,
    MapperBookAndUser,
    MapperBooks
} from '../helper';

export function* fetchBookAndUserApi(bid) {
    const result = yield call(agent.Book.__fetchByBookId, bid);
    const { book } = MapperBookAndUser(result);
    yield all([
        put({
            type: bookTypes._FETCH_BOOK,
            payload: book
        })
    ]);
}

export function* fetchBooksAndUsersApi(nof, page) {
    const result = yield call(agent.Book.__fetchAll, nof, page);
    const { books, users } = MapperBooksAndUsers(result);
    yield put({
        type: bookTypes._FETCH_BOOKS,
        payload: books
    });
}

export function* fetchBooksAndUsersByBidApi(bid, nof, page) {
    const result = yield call(agent.Book.__fetchAllById, bid, nof, page);
    const { books } = MapperBooksAndUsers(result);
    yield put({
        type: bookTypes._FETCH_BOOKS_BY_TAG,
        payload: books
    });
}

export function* fetchBooksAndUsersByTagApi(athrid, titid, nof, page) {
    const result = yield call(agent.Book.__fetchAllByTag, athrid, titid, nof, page);
    const { books } = MapperBooksAndUsers(result);
    yield all([
        put({
            type: bookTypes._FETCH_BOOKS_BY_TAG,
            payload: books
        }),
    ]);
}

export function* fetchBooksAndUsersByAuthorTagApi(bid, nof, page) {
    const result = yield call(agent.Book.__fetchByAuthorTag, bid, nof, page);
    const { books } = MapperBooksAndUsers(result);
    yield all([
        put({
            type: bookTypes._FETCH_BOOKS_BY_ATHR_TAG,
            payload: books
        })
    ]);
}

export function* fetchBooksByCollectionApi(cid) {
    const result = yield call(agent.Collection.__fetchById, cid);
    const books = MapperBooks(result);
    yield put({
        type: bookTypes._FETCH_BOOKS_FOR_COLLECTION,
        payload: books
    });
}

export function* fetchBooksByUserApi(uid) {
    const result = yield call(agent.User.__fetchBooks, uid);
    yield put({
        type: bookTypes._FETCH_BOOKS_FOR_USER,
        payload: MapperBooks(result)
    });
}
