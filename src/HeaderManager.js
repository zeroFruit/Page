import {
  tagTitlePropFormatter,
  textTitlePropFormatter
} from './utils/PropUtils';
import {
  headerType,
  headerTextType as HeaderTextType
} from './config';

export default class HeaderManager {
  constructor(_getHeaderPropsMtd = (() => {})) {
    this._getHeaderPropsMtd = _getHeaderPropsMtd;
  }
}


export const _getIconHeaderProps = props => ({
  type: headerType.IMAGE,
  icon: props.icon
});

export const _getTextHeaderProps = props => ({
  type: headerType.TEXT,
  text: textTitlePropFormatter(
    -1,
    props.headerTitle || '북북북',
    HeaderTextType.NONE
  )
});

export const _getTagHeaderProps = (props) => {
  const {
    selectedBookTitleTag_,
    selectedBookAuthorTag_,
    selectedBook_
  } = props;
  if (selectedBookTitleTag_ && selectedBookAuthorTag_) {
    return {
      type: headerType.TAG,
      text: [
        tagTitlePropFormatter(
          selectedBook_.title_tag_id,
          selectedBookTitleTag_,
          HeaderTextType.TITLE
        ),
        tagTitlePropFormatter(
          selectedBook_.author_tag_id,
          selectedBookAuthorTag_,
          HeaderTextType.AUTHOR
        )
      ]
    };
  }
  return { type: headerType.TAG, text: [] };
};

export const _getUserHeaderProps = (props) => {
  const {
    selectedUserDisplayName_,
    selectedBook_: { user_id }
  } = props;
  return {
    type: headerType.TEXT,
    text: textTitlePropFormatter(
      user_id,
      selectedUserDisplayName_,
      HeaderTextType.NICKNAME
    )
  };
};

export const _getHeaderWithLabelsProps = (props) => {
  const { leftLabel, rightLabel, title } = props;
  return {
    type: headerType.TEXT,
    text: textTitlePropFormatter(
      'id',
      title,
      HeaderTextType.NONE
    ),
    header: {
      leftLabel,
      rightLabel
    }
  };
};

export const _getHeaderWithIconsProps = (props) => {
  const { leftIconSrc, rightIconSrc, title } = props;
  return {
    type: headerType.TEXT,
    text: textTitlePropFormatter(
      'id',
      title,
      HeaderTextType.NONE
    ),
    header: {
      leftIconSrc,
      rightIconSrc
    }
  };
};
