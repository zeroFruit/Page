import { types } from '../../ducks/book';
import { patch } from '../../ducks/helper';
import { fetchEntity } from '../helper';
import * as api from './apiEntity';
import * as cmn from '../_common';

export const requestData = {
    addBook: {
        ready: () => patch(types.ADD_BOOK.READY),
        success: () => patch(types.ADD_BOOK.SUCCESS),
        api: bd => api.addBookApi(bd)
    },
    rmBook: {
        ready: () => patch(types.REMOVE_BOOK.READY),
        success: ({ bid }) => patch(types.REMOVE_BOOK.SUCCESS, bid),
        api : ({ bid }) => api.rmBookApi({ bid })
    },
    editBook: {
        ready: () => patch(types.EDIT_BOOK.READY),
        success: ({ bid }) => patch(types.EDIT_BOOK.SUCCESS, bid),
        api: bd => api.editBookApi(bd)
    },
    rankBook: {
        ready: () => patch(types.FETCH_RANK.READY),
        success: books => patch(types.FETCH_RANK.SUCCESS, books),
        api: () => api.fetchRankApi()
    }
};

export const requestEntity = {
    addBook: fetchEntity.bind(null, requestData.addBook),
    rmBook: fetchEntity.bind(null, requestData.rmBook),
    editBook: fetchEntity.bind(null, requestData.editBook),
    rankBook: fetchEntity.bind(null, requestData.rankBook)
};
