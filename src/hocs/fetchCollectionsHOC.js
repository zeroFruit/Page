import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, types } from '../ducks/collection';
import __auth from '../Auth';

export const fetchCollectionsHOC = (WrappedComponent) => {
  class WithCollections extends PureComponent {
    async componentDidMount() {
      await this._fetchCollections(__auth.getId());
    }

    render() {
      const { myCollections_ } = this.props;
      return (
        <WrappedComponent
          { ...this.props }
          collections={ myCollections_ } />
      );
    }

    _fetchCollections = async (userId) => {
      await this.props.AsyncFetchCollectionRequestAction();
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithCollections);
};

const mapStateToProps = state => ({
  isCollectionFetched_: selectors.GetIsCollectionFetched(state),
  myCollections_: selectors.GetMyCollections(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  AsyncFetchCollectionRequestAction: () => ({
    type: types.FETCH_COLLECTION.REQUEST
  })
}, dispatch);
