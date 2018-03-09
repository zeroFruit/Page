import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperBooks } from '../helper';


export function* fetchBooksApi(nof, page) {
    const result = yield call(agent.Book.__fetchAll, nof, page);
    return result;
}

export function* addBookApi(book) {
    yield call(agent.Book.__insert, book);
}

export function* rmBookApi({ bid }) {
    const { status } = yield call(agent.Book.__rm, bid);
    console.log('rm book api status', status);
    return { bid };
}

export function* editBookApi({ bid, author, title, content }) {
    const { status } = yield call(agent.Book.__edit, { bid, author, title, content });
    console.log('edit book api status', status);
    return { bid };
}

export function* fetchRankApi() {
    const { data, status } = yield call(agent.Book.__rank);
    console.log('fetch rank status', status);
    return data;
}
