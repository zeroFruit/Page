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
  const vm = new HeaderManager(_h._getHeaderWithIconsProps);
  return (
    <Header headerStyle={ StyleSheet.flatten(styles.header) }>
      <HeaderBarWithTexts
        vm={ vm }
        title="페이지 업로드"
        leftLabel="뒤로"
        rightLabel="완료"
        onClickHeaderRightButton={ params.onClickHeaderRightButton ? params.onClickHeaderRightButton : () => {} }
        onClickHeaderLeftButton={ params.onClickHeaderLeftButton ? params.onClickHeaderLeftButton : () => {} } />
    </Header>
  );
});
