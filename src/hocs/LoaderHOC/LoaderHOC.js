import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../ducks/index';
import { ProgressBar } from '../../components';

export const LoaderHOC = WrappedComponent => {
    class WithLoader extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;
        render() {
            const { loading } = this.props;
            if (loading) return <ProgressBar visible />;
            return <WrappedComponent {...this.props} />;
        }
    }
    return connect(mapStateToProps, null)(WithLoader);
}

const mapStateToProps = state => ({
    loading: selectors.GetLoading()
});
