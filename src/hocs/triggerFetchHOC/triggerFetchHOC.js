import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../ducks/book';

export const triggerFetchHOC = WrappedComponent => {
    class WithTriggerFetchHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        state = {
            trigger: false
        };

        componentWillReceiveProps(np) {
        }
        render() {
            const { trigger } = this.state;
            return (
                <WrappedComponent
                    { ...this.props }
                    trigger={ trigger }
                />
            );
        }
    }

    return connect(mapStateToProps)(WithTriggerFetchHOC);
}

const mapStateToProps = state => ({
    bookRm: selectors.GetRm(state)
});