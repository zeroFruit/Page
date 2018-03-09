import React from 'react';
import { StyleSheet } from 'react-native';
import styles from './styles';
import {
  Header,
  HeaderBarWithTexts
} from '../../../components';

import { enhancer as defaultViewWhileNoParams } from '../../../hocs/withDefaultViewWhileNoHeaderParamsHOC';
import HeaderManager, * as _h from '../../../HeaderManager';

export default defaultViewWhileNoParams((params) => {
  const { onClickHeaderRightButton, onClickHeaderLeftButton } = params;
  const vm = new HeaderManager(_h._getTextHeaderProps);
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithTexts
        vm={ vm }
        headerTitle="페이지 업로드"
        leftLabel="취소"
        rightLabel="다음"
        onClickHeaderRightButton={ onClickHeaderRightButton }
        onClickHeaderLeftButton={ onClickHeaderLeftButton } />
    </Header>
  );
});
