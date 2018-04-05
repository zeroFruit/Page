import { branch, compose, setStatic } from 'recompose';
import { fetchTagByBidHOC } from './fetchTagByBidHOC';
import { fetchTagByTidHOC } from './fetchTagByTidHOC';
import { hasPath } from '../utils/ObjectUtils';

export const enhance = WrappedComponent => compose(
  setStatic(
    'navigationOptions',
    WrappedComponent.navigationOptions
  ),
  selectTagFetchHOC(props => shouldFetchByTid(props))
)(WrappedComponent);

const selectTagFetchHOC = shouldFetchByTid => branch(
  shouldFetchByTid,
  fetchTagByTidHOC,
  fetchTagByBidHOC
);

const shouldFetchByTid = props => {
    return hasPath(props, 'fetchTagType') && props.fetchTagType === 'BY_TID';
}
