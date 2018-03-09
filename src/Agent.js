import axios from 'axios';
import qs from 'qs';
import RNFetchBlob from 'react-native-fetch-blob';

export const LOCAL_SERVER = __DEV__ ? 'https://0fd1cc3f.ngrok.io' : 'https://page-rest.xyz';
export const IMG_SERVER = __DEV__ ? 'https://eec27b82.ngrok.io' : 'https://page-asset.xyz';

const getResponse = ({ data, status }) => ({ data, status });

const requests = {
    get: async (rootUrl, route = '', config = {}) => {
        const response = await axios.get(`${rootUrl}${route}`, config);
        return getResponse(response);
    },
    post: async (rootUrl, route = '', body = {}, config = {}) => {
        const response = await axios.post(`${rootUrl}${route}`, body, config);
        return getResponse(response);
    },
    put: async (rootUrl, route = '', config = {}) => {
        const response = await axios.put(`${rootUrl}${route}`, config);
        return getResponse(response);
    },
    delete: async (rootUrl, route = '', config = {}) => {
        const response = await axios.delete(`${rootUrl}${route}`, config);
        return getResponse(response);
    }
};

const Book = {
    __fetchAll: async (nof, page) => {
        const { data, response } = await requests.get(LOCAL_SERVER, '/books', {
            params: {
                nof,
                page
            }
        });
        return data;
    },
    __fetchAllByTag: async (athrid, titid, nof, page) => {
        const { data, status } = await requests.get(LOCAL_SERVER, '/books/tag', {
            params: {
                athrid,
                titid,
                nof,
                page
            }
        });
        return data;
    },
    __fetchAllById: async (bid, nof, page) => {
        const { data, status } = await requests.get(LOCAL_SERVER, '/books/book', {
            params: {
                nof,
                page,
                bid
            }
        });
        return data;
    },
    __fetchByAuthorTag: async (bid, nof, page) => {
        const { data, status } = await requests.get(LOCAL_SERVER, '/books/author_tag', {
            params: {
                nof,
                page,
                bid
            }
        });
        return data;
    },
    __fetchByBookId: async (bid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/book/${bid}`);
        return data;
    },
    __insert: async (book) => {
        // console.log('book', book);
        try {
            const { data } = await RNFetchBlob.fetch('POST', IMG_SERVER, {
                'Transfer-Encoding': 'Chunked',
                'Content-Type': 'multipart/form-data'
            }, [
                {
                    name: 'photo',
                    filename: `${book.user_id}.jpg`,
                    type: 'image/jpeg',
                    data: RNFetchBlob.wrap(book.img_src)
                }
            ]);
            // console.log('data', data);
            const { Location } = JSON.parse(data);
            await requests.post(LOCAL_SERVER, '/book', {
                uid: book.user_id,
                content: book.content,
                imgSrc: Location,
                title: book.bookTitle,
                author: book.bookAuthor
            });
            // console.log('finish!');
        } catch (e) {
            console.log(e);
        }
    },
    __fetchTag: async (bid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/tag/book/${bid}`);
        return data;
    },
    __rm: async bid => {
        const { data, status } = await requests.delete(LOCAL_SERVER, `/book/${bid}`);
        return { data, status };
    },
    __edit: async ({ bid, author, title, content }) => {
        const { data, status } = await requests.put(LOCAL_SERVER, '/book', {
            id: bid,
            author,
            title,
            content
        });
        return { data, status };
    },
    __rank: async () => {
        const { data, status } = await requests.get(LOCAL_SERVER, '/bookmarks/rank');
        return { data, status };
    }
};

const User = {
    __fetchByUserId: async (uid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/user/${uid}`);
        return data;
    },
    __fetchByUserIds: async(uids) => {
        await requests.get(LOCAL_SERVER, '/users', {
            params: { uids },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        });
    },
    __fetchCollections: async (uid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/user/${uid}/collections`);
        return data;
    },
    __fetchBooks: async (uid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/user/${uid}/books`);
        return data;
    },
    __signup: async (ud) => {
        try {
            const res = await requests.post(LOCAL_SERVER, '/signup', ud);
            return res;
        } catch (e) {
            return {
                status: 500,
                data: {}
            };
        }
    },
    __signin: async ud => {
        try {
            const res = await requests.post(LOCAL_SERVER, '/signin', ud);
            return res;
        } catch (e) {
            return {
                status: 500,
                data: {}
            };
        }
    },
    __update: async ud => {
        try {
            const res = await requests.put(LOCAL_SERVER, '/user/profile', ud);
            return res;
        } catch(e) {
            return {
                status: 500,
                data: {}
            };
        }
    },
    __sendMail: async ({ book, reason }) => {
        try {
            const { status, data } = await requests.post(IMG_SERVER, '/mail', {
                book,
                reason
            });
            return { status, data };
        } catch (e) {
            return {
                status: 500,
                data: {}
            };
        }

    }
};

const Bookmark = {
    __fetchByUserId: async (uid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/bookmarks/user/${uid}`);
        return data;
    },
    __add: async (bid, uid) => {
        const { status, data } = await requests.put(LOCAL_SERVER, `/user/${uid}/bookmark/${bid}`);
        return data;
    },
    __remove: async (bid, uid) => {
        const { status, data } = await requests.delete(LOCAL_SERVER, `/user/${uid}/bookmark/${bid}`);
        return data;
    }
};

const Tag = {
    __fetch: async (athrid, titid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/tag/${athrid}/${titid}`);
        return data;
    }
};

const Collection = {
    __fetchById: async (cid) => {
        const { data, status } = await requests.get(LOCAL_SERVER, `/collection/${cid}/books`);
        return data;
    },
    __insertCollection: async (uid, label, bids) => {
        const { status } = await requests.post(LOCAL_SERVER, '/collection', {
            uid,
            label,
            bids
        });
    },
    __deleteCollection: async (cid) => {
        const { status } = await requests.delete(LOCAL_SERVER, `/collection/${cid}`);
    },
    __updateBookToCollection: async (cid, bid) => {
        const { data, status } = await requests.put(LOCAL_SERVER, `/collection/${cid}/book/${bid}`);
        return data;
    },
    __deleteCollectionBooks: async (cid, bid) => {
        const { status } = await requests.delete(LOCAL_SERVER, `/collection/${cid}/book/${bid}`);
    }
};

const Search = {
    __search: async (st) => {
        const { data, status } = await requests.get(LOCAL_SERVER, '/search/tag', {
            params: {
                t: st
            }
        });
        return data;
    }
};

export default {
    Book,
    User,
    Bookmark,
    Tag,
    Collection,
    Search
};
