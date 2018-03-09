import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Header,
    HeaderBarWithTexts
} from '../../../components';
import styles from './styles';
import HeaderManager, * as _h from '../../../HeaderManager';
import { hasPath } from '../../../utils/ObjectUtils';

export default (params) => {
    const onClickHeaderRightButton = hasPath(params, 'onClickHeaderRightButton') ?
        params.onClickHeaderRightButton : () => {};
    const onClickHeaderLeftButton = hasPath(params, 'onClickHeaderLeftButton') ?
        params.onClickHeaderLeftButton : () => {};
    // console.log('params', params)
    return (
        <Header headerStyle={ StyleSheet.flatten(styles.header) }>
            <HeaderBarWithTexts
                vm={ new HeaderManager(_h._getHeaderWithLabelsProps) }
                title="페이지 수정"
                leftLabel="뒤로"
                rightLabel="완료"
                onClickHeaderRightButton={ onClickHeaderRightButton }
                onClickHeaderLeftButton={ onClickHeaderLeftButton } />
        </Header>
    );
}