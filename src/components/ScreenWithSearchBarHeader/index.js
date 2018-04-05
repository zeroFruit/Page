import { PureComponent } from 'react';
import { navigateTo } from '../../Router';
import ViewManager, * as _v from '../../ViewManager';

export default class ScreenWithSearchBarHeader extends PureComponent {

    _onClickSearchListItem = (athrid, titid) => {
        navigateTo(this.props, 'PostList', {
            athrid,
            titid,
            vm: new ViewManager(_v._getTextTitleProps),
            fetchTagType: 'BY_TID',
            fetchBooksType: 'BY_TID',
        });
    }

    _onClickSearchIcon = () => {
        console.log('press search icon');
        navigateTo(this.props, 'search');
    }
}
