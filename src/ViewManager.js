import {
    tagTitlePropFormatter,
    textTitlePropFormatter
} from './utils/PropUtils';
import {
    postTitleType
} from './config';

export default class ViewManager {
    constructor(_getTitlePropsMtd = (() => {})) {
        this._getTitlePropsMtd = _getTitlePropsMtd;
    }
}

export const _getTextTitleProps = (props) => {
    const { bookInfo } = props;
    const { user = { id: -1, displayName: '' } } = bookInfo;
    return {
        type: postTitleType.TEXT,
        text: textTitlePropFormatter(user.id, user.displayName, 'nickname')
    };
};

export const _getTagTitleProps = (props) => {
    const {
        tit = { id: -1, title: '' },
        athr = { id: -2, author: '' },
    } = props;
    return {
        type: postTitleType.TAG,
        text: [
            tagTitlePropFormatter(tit.id, tit.title, 'title'),
            tagTitlePropFormatter(athr.id, athr.author, 'author')
        ]
    };
};
