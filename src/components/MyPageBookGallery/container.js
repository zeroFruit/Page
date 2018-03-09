import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ComponentWithHOC from './index';
import { actions as tagActions } from '../../ducks/tag';

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(null, null)(ComponentWithHOC);
