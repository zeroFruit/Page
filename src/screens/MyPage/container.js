import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../ducks/user';
import { selectors as bookSelectors } from '../../ducks/book';
import ComponentWithHOC from './MyPage';

const mapStateToProps = state => {
    return ({
        my: selectors.GetMe(state),
        myBooks_: bookSelectors.GetMyBooks(state)
    });
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
