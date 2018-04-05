import { call } from 'redux-saga/effects';
import agent from '../../Agent';
import { MapperTag } from '../helper';

export function* fetchBookTagByBidApi(bid) {
    const result = yield call(agent.Book.__fetchTag, bid);
    console.log('bid', bid);
    console.log('result', result);
    return MapperTag(result);
}

export function* fetchBookTagByTidApi(athrid, titid) {
    const result = yield call(agent.Tag.__fetch, athrid, titid);
    return MapperTag(result);
}
