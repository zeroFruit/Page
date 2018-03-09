import { Dimensions } from 'react-native';

export const SEARCHBY_TAG = 'searchby_tag';
export const SEARCHBY_NAME = 'searchby_name';

export const headerType = {
  NONE: 'headerType/none',
  TAG: 'headerType/tag',
  TEXT: 'headerType/text',
  IMAGE: 'headerType/image'
};

export const headerTextType = {
  NONE: 'headerTextType/none',
  TITLE: 'headerTextType/title',
  AUTHOR: 'headerTextType/author',
  NICKNAME: 'headerTextType/nickname'
};

export const postTitleType = {
  TAG: 'postTitleType/tag',
  TEXT: 'postTitleType/text'
};

export const NUM_OF_FEEDS_PER_LOAD = 3;

export const NUM_OF_ROW = 3;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const ROTATE = ['0deg', '90deg', '180deg', '270deg'];
