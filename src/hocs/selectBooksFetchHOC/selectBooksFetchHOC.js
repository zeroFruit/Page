import { branch, compose, setStatic } from 'recompose';
import {
    fetchSameTagBooksByBidHOC,
    fetchSameTagBooksByTidHOC,
    fetchSameTagBooksByAthrTidHOC
} from '../index';
import { hasPath } from '../../utils/ObjectUtils';

export const enhance = WrappedComponent => compose(
    setStatic(
        'navigationOptions',
        WrappedComponent.navigationOptions
    ),
    selectBooksFetchHOC(props => isFetchedByAuthor(props))(props => isFetchedFromSearchList(props)),
)(WrappedComponent);

const selectBooksFetchHOC = isFetchByAuthorTag => isFetchedFromSearchList => branch(
    isFetchByAuthorTag,
    fetchSameTagBooksByBidHOC,
    branch(
        isFetchedFromSearchList,
        fetchSameTagBooksByTidHOC,
        fetchSameTagBooksByAthrTidHOC
    )
);

const isFetchedByAuthor = props => hasPath(props, 'id');

const isFetchedFromSearchList = props => hasPath(props, 'athrid') && hasPath(props, 'titid');
