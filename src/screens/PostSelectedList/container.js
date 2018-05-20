import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors } from '../../ducks';
import { selectors as bookSelectors, actions as bookActions } from '../../ducks/book';
import { selectors as bookmarkSelectors } from '../../ducks/bookmark';
import { selectors as userSelectors } from '../../ducks/user';
import {actions as TagActions, types as TagTypes, selectors as TagSelectors} from "../../ducks/tag";
import {selectors as screenSelectors} from "../../ducks/screen";
import ComponentWithHOC from './PostSelectedList';

const mapStateToProps = state => ({
    my: userSelectors.GetMe(state),
    myBooks_: bookSelectors.GetMyBooks(state),
    myBookmarks_: bookmarkSelectors.GetMyBookmarks(state),
    myBookmarksAndBooks_: selectors.BookAndBookmarkSelector(state),
    prevScreen: screenSelectors.getPrev(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    ResetPageAction: bookActions.ResetNewsfeed,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ComponentWithHOC);
