import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { selectors as userSelectors } from '../ducks/user';
import { selectors as tagSelectors } from '../ducks/tag';
import { selectors as bookSelectors } from '../ducks/book';
import { hasPath } from '../utils/ObjectUtils';

export const fetchHeaderTitlePropsHOC = (WrappedComponent) => {
  class WithHeaderTitle extends Component {
    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      const { vm } = this.props;
      const headerTitleProps = this._getHeaderTitleProps(vm);

      return (
        <WrappedComponent
          { ...this.props }
          headerTitleProps={ headerTitleProps } />
      );
    }

    _getHeaderTitleProps = (vm) => {
      if (hasPath(vm, '_getHeaderPropsMtd')) {
        return vm._getHeaderPropsMtd(this.props);
      } else {
        return null;
      }
    }
  }

  return connect(mapStateToProps, null)(WithHeaderTitle);
};

const mapStateToProps = state => ({
  selectedBookTitleTag_: tagSelectors.GetSeletedBookTitleTag(state),
  selectedBookAuthorTag_: tagSelectors.GetSelectedBookAuthorTag(state),
  selectedUserDisplayName_: userSelectors.GetSelectedUserDisplayName(state),
  selectedBook_: bookSelectors.GetSelectedBook(state)
});
