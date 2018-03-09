import { connect } from 'react-redux';
import { selectors } from '../../ducks';
import { selectors as bookSelectors } from '../../ducks/book';
import { selectors as bookmarkSelectors } from '../../ducks/bookmark';
import ComponentWithHOC from './PostSelected';

const mapStateToProps = state => ({
  myBooks_: bookSelectors.GetMyBooks(state),
  myBookmarks_: bookmarkSelectors.GetMyBookmarks(state),
  myBookmarksAndBooks_: selectors.BookAndBookmarkSelector(state)
});

export default connect(mapStateToProps)(ComponentWithHOC);
