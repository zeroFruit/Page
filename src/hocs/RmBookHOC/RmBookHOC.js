import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../ducks/book';
import { ProgressBar } from '../../components';
import {navigateToNested} from "../../Router";

export const RmBookHOC = WrappedComponent => {
    class WithRmBookHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        async componentWillReceiveProps(np) {
            if(np.rm.get('success')) {
                await navigateToNested(this.props, 'tabs', {}, 'NewsFeed');
                await np.init();
                console.log('remove state init');
            }
        }

        render() {
            const {
                rm
            } = this.props;
            // if(rm.get('loading')) return <ProgressBar visible />;
            return (
                <WrappedComponent
                    { ...this.props }
                    AsyncRmBook={ async (bid) => this._rm(bid) }
                />
            );
        }

        _rm = async (bid) => {
            await this.props.AsyncRmBook(bid);
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithRmBookHOC);
};

const mapStateToProps = state => ({
    rm: selectors.GetRm(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    init: actions.InitRmBookState,
    AsyncRmBook: actions.RmBook
}, dispatch);

