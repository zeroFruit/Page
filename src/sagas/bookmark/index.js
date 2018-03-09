import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../ducks/bookmark';
import { requestEntity as re } from './requestEntity';

export function* AsyncAddBookmarkRequest(action) {
  console.log('action', action);
  const result = yield call(re.addBookmark, action.payload);
  return result;
}

export function* AsyncRemoveBookmarkRequest(action) {
  const result = yield call(re.removeBookmark, action.payload);
  return result;
}

export function* AsyncFetchBookmarkRequest(action) {
  const result = yield call(re.fetchBookmark, action.payload);
  return result;
}

export default function* rootSaga() {
  yield takeLatest(types.ADD_BOOKMARK.REQUEST, AsyncAddBookmarkRequest);
  yield takeLatest(types.REMOVE_BOOKMARK.REQUEST, AsyncRemoveBookmarkRequest);
  yield takeLatest(types.FETCH_BOOKMARK.REQUEST, AsyncFetchBookmarkRequest);
}
