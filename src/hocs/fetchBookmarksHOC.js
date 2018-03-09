import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors as bmSelectors, types as bookmarkTypes, actions as bmActions } from '../ducks/bookmark';
import { selectors as userSelectors } from '../ducks/user';


export const fetchBookmarksHOC = (WrappedComponent) => {
    const propTypes = {};
    const defaultProps = {};

    class WithBookmarks extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;

        async componentDidMount() {
            const { my } = this.props;
            await this._fetchBookmarks(my.get('id'));
            console.log('fetch bm complete');
        }

        render() {
            const { myBookmarks } = this.props;
            return (
                <WrappedComponent
                    { ...this.props }
                    bookmarks={ myBookmarks } />
            );
        }

        _fetchBookmarks = async (userId) => {
            await this.props.AsyncFetchBookmarkRequestAction(userId);
        };
    }

    WithBookmarks.propTypes = propTypes;
    WithBookmarks.defaultProps = defaultProps;

    return connect(mapStateToProps, mapDispatchToProps)(WithBookmarks);
};


const mapStateToProps = state => ({
    my: userSelectors.GetMe(state),
    myBookmarks: bmSelectors.GetMyBookmarks(state),
    fetchState: bmSelectors.GetFetchState(state)
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        AsyncFetchBookmarkRequestAction: (userId) => {
            return {
                type: bookmarkTypes.FETCH_BOOKMARK.REQUEST,
                payload: userId
            };
        },
        init: bmActions.initFetchState
    }, dispatch);
};
