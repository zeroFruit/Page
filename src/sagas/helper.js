import { List } from 'immutable';
import { call, put } from 'redux-saga/effects';
import { hasPath, omit } from '../utils/ObjectUtils';

export function* fetchEntity(entity, ...args) {
    yield put(entity.ready());
    try {
        const result = yield call(entity.api, ...args);
        if (hasPath(entity, 'fetch')) {
            yield call(entity.fetch, result);
        }
        yield put(entity.success(result));
        return result;
    } catch (e) {
        if(hasPath(entity, 'fail')) {
            yield put(entity.fail());
        }
    }

}

const OMIT_PARAMS = ['imgSrc', 'bookmarks'];

export const MapperBooksAndUsers = (result) => {
    const books = [];
    result.forEach(({ book, bmcnt }) => {
        const _book = omit(book, OMIT_PARAMS);
        books.push({
            ..._book,
            img_src: book.imgSrc,
            user: {
                ..._book.user
            },
            bmcnt
        });
    });
    return {
        books
    };
};

export const MapperBookAndUser = (r) => {
    const { book, bmcnt } = r;
    return {
        book: {
            ...omit(book, OMIT_PARAMS),
            img_src: book.imgSrc,
            user: {
                ...book.user,
                id: book.user.id,
            },
            bmcnt
        }
    };
};

export const MapperBooks = (result) => {
    const books = [];
    result.forEach(({ book, bmcnt }) => {
        const _book = omit(book, OMIT_PARAMS);
        books.push({
            ..._book,
            img_src: book.imgSrc,
            bmcnt
        });
    });
    return books;
};

export const MapperBook = (r) => {
    const { book , bmcnt } = r;
    return {
        ...omit(book, OMIT_PARAMS),
        img_src: book.imgSrc,
        user: {
            id: book.user.id,
            displayName: book.user.displayName
        },
        bmcnt
    };
};

export const MapperUser = (r) => {
    return {
        id: r.id,
        displayName: r.displayName,
        email: r.email,
        profile: r.profile
    };
};

export const MapperTag = (r) => {
    return {
        bookTitle: r.titleTag,
        bookAuthor: r.authorTag
    };
};

export const MapperTags = (result) => {
    const tags = [];
    result.forEach(({ authorTag, titleTag }) => {
        tags.push({
            author: {
                id: authorTag.id,
                book_author: authorTag.author
            },
            title: {
                id: titleTag.id,
                book_title: titleTag.title
            }
        });
    });
    return tags;
};

export const MapperRanks = (result) => {
    const ranks = [];
    result.map(({ id, tit, athr, book, title, author, bmcnt }) => {
        return {
            id,
            tit,
            athr,

        }
    });
};