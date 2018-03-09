import { connect } from 'react-redux';
import { selectors } from '../../ducks/user';
import ComponentWithHOC from './Settings';

const mapStateToProps = state => ({
    my: selectors.GetMe(state)
});

export default connect(mapStateToProps)(ComponentWithHOC);