import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProgressBar } from '../../components';
import {
    selectors,
    types,
    actions
} from '../../ducks/tag';

export const fetchTagByTidHOC = (WrappedComponent) => {
    class WithTag extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        async componentDidMount() {
            const { athrid, titid } = this.props;
            await this.props.AsyncFetchTagRequestAction(athrid, titid);
        }
        async componentWillReceiveProps(np) {
            if(np.fetchState.get('success'))
                await this.props.init();
        }
        render() {
            const {
                fetchState
            } = this.props;
            if(fetchState.get('loading')) return <ProgressBar visible />;
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
    fetchState: selectors.GetFetchState(state),
    loading: selectors.GetLoading(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    AsyncFetchTagRequestAction: (athrid, titid) => ({
        type: types.FETCH_TAG_BY_TID.REQUEST,
        payload: { athrid, titid }
    }),
    UnmountTagAction: actions.UnmountTag,
    init: actions.initFetchState
}, dispatch);
