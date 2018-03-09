import { PureComponent } from 'react';
import { navigateTo } from '../../Router';
import ViewManager, * as _v from '../../ViewManager';

export default class ScreenWithSearchBarHeader extends PureComponent {

    _onClickSearchListItem = (athrid, titid) => {
        const key = 'PostList';
        const vm = new ViewManager(_v._getTextTitleProps);
        const params = {
            athrid,
            titid,
            vm
        };
        navigateTo(this.props, key, params);
    }

    _onClickSearchIcon = () => {
        console.log('press search icon');
        navigateTo(this.props, 'search');
    }
}
