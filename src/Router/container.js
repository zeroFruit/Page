import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ComponentWithHOC from './index';
import { actions, selectors } from '../ducks/screen';

const mapStateToProps = state => ({
    history: selectors.getHistory(state)
})
const mapDispatchToProps = dispatch => bindActionCreators({
    patch: actions.patch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
