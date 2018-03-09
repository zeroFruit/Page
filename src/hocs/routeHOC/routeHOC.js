import React, { PureComponent } from 'react';
import history from '../../history';
import {
    navigateTo,
    navigateToNested
} from '../../Router';


export const routeHOC = WrappedComponent =>
    class WithRouteHOC extends PureComponent {
        static navigationOptions = WrappedComponent.navigationOptions;

        render() {
            return (
                <WrappedComponent
                    { ...this.props }
                    navigate={ this._navigate }
                    navigateToNest={ this._navigateToNest }
                    goBack={ this._goBack }
                />
            );
        }

        _navigate = (key, params = {}) => {
            navigateTo(this.props, key, params)
        }

        _navigateToNest = (parentKey, parentParams, childKey, childParams = {}) => {
            navigateToNested(this.props, parentKey, parentParams, childKey, childParams);
        }

        _goBack = () => {
            const { key, params } = history.pop();
            navigateTo(this.props, key, params);
        }
    }