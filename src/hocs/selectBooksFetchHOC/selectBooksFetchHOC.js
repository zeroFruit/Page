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
    selectBooksFetchHOC(props => isFetchBooksByBid(props)),
)(WrappedComponent);

const selectBooksFetchHOC = isFetchBooksByBid => branch(
    isFetchBooksByBid,
    fetchSameTagBooksByBidHOC,
    fetchSameTagBooksByTidHOC
);

const isFetchBooksByBid = props => {
    return hasPath(props, 'fetchBooksType') && props.fetchBooksType === 'BY_BID';
}
