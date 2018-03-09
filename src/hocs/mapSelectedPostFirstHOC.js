import React, { PureComponent } from 'react';
import { List } from 'immutable';

import { findIndex } from '../utils/ArrayUtils';

export const mapSelectedPostFirstHOC = (WrappedComponent) => {
    return class WithSelectedPostFirst extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        render() {
            const { id, booksInfo } = this.props;
            const idx = this._findIndexOfSelectedBook(id, booksInfo);
            if (idx === -1) return <WrappedComponent { ...this.props } />;

            const newBookList = this._getSelectedBookFirst(idx, booksInfo);
            return (
                <WrappedComponent
                    { ...this.props }
                    booksInfo={ newBookList }
                />
            );
        }
        _findIndexOfSelectedBook = (id, books) => {
            return findIndex(books, b => b.id === id);
        }

        _getSelectedBookFirst = (index, books) => {
            const b = books[index];
            return List(books).splice(index, 1).unshift(b).toJS();
        }
    };
};
