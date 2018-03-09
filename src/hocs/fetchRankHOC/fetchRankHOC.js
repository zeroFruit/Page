import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actions } from '../../ducks/book';
import { ProgressBar } from '../../components';

export const fetchRankHOC = WrappedComponent => {
    class WithRank extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        async componentDidMount() {
            await this.props.fetch();
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
                    rank={ fetchState.get('payload') }
                />
            );
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithRank);
};

const mapStateToProps = state => ({
    fetchState: selectors.GetRank(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    init: actions.InitRank,
    fetch: actions.Rank
}, dispatch);