import { put } from 'redux-saga/effects';
import { types as bookTypes } from '../../ducks/book';
import { types as userTypes } from '../../ducks/user';
import { types as pageTypes } from '../../ducks/page';
import { MapperBooks } from '../helper';

export function* FetchBooksForCollection({ book_ids }) {
    yield put({
        type: bookTypes._FETCH_BOOKS_FOR_COLLECTION,
        payload: book_ids
    });
}

export function* FetchMyBooks({ books }) {
    yield put({
        type: bookTypes._FETCH_MY_BOOKS,
        payload: MapperBooks(books)
    });
}

export function* NextNewsfeedPage() {
    yield put({
        type: pageTypes.NEXT_NEWSFEED_PAGE
    });
}

export function* NextSelectedPage() {
    yield put({
        type: pageTypes.NEXT_SELECTED_LIST_PAGE
    });
}

export function* OmitRemovedBookUser(uid) {
    yield put({
        type: userTypes._OMIT_REMOVED_BOOK_USER,
        payload: uid
    });
}
