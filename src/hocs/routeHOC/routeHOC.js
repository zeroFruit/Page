import React, { PureComponent } from 'react';
import history from '../../history';
import {
    navigateTo,
    navigateToNested,
    replace,
    resetToMyPage
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
                    replace={this._replace}
                    pop={this._pop}
                />
            );
        }

        _navigate = (key, params = {}) => {
            navigateTo(this.props, key, params)
        }

        _navigateToNest = (parentKey, parentParams, childKey, childParams = {}) => {
            navigateToNested(this.props, parentKey, parentParams, childKey, childParams);
        }

        _replace = (routeName, params = {}) => {
            replace(this.props.navigation, routeName, params);
        }

        _pop = (n) => {
            this.props.navigation.pop(n);
        }
        _goBack = () => {
            const { key, params } = history.pop();
            navigateTo(this.props, key, params);
        }
    }