import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    selectors,
    types,
    actions
} from '../../ducks/tag';
import { ProgressBar } from '../../components';

export const fetchTagByBidHOC = (WrappedComponent) => {
    class WithTag extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        async componentDidMount() {
            const { id } = this.props;
            console.log('fetchTagByBidHOC!!');
            await this.props.AsyncFetchTagRequestAction(id);
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success')) {
                await this.props.init();
            }
        }
        componentWillUnmount() {
            console.log('fetchTagByBidHOC unmount')
        }
        render() {
            const {
                fetchState,
                tit,
                athr
            } = this.props;

            if (fetchState.get('loading')) return <ProgressBar visible />;
            console.log('fetch tag by bid');
            return (
                <WrappedComponent
                    { ...this.props }
                    resetTag={ this._resetTag } />
            );

        }

        _resetTag = () => {
            this.props.UnmountTagAction();
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithTag);
};

const mapStateToProps = state => ({
    tit: selectors.GetSeletedBookTitleTag(state),
    athr: selectors.GetSelectedBookAuthorTag(state),
    loading: selectors.GetLoading(state),
    fetchState: selectors.GetFetchState(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncFetchTagRequestAction: id => ({
        type: types.FETCH_TAG_BY_BID.REQUEST,
        payload: { id }
    }),
    UnmountTagAction: actions.UnmountTag,
    init: actions.initFetchState
}, dispatch);
