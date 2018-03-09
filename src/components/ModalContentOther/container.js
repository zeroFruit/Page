import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from './ModalContentOther';
import { selectors, actions } from '../../ducks/user';

const mapStateToProps = state => ({
    sendMailState: selectors.GetSendMailState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initSendMailState: actions.initSendMailState,
    sendMail: actions.sendMail
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Component);