import React from 'react';
import { StyleSheet } from 'react-native';

import styles from './styles';
import {
  Header,
  HeaderBarWithSearchBar
} from '../../../components';

import HeaderManager, * as _h from '../../../HeaderManager';

export default ({
                    onClickBack = () => {},
                    selectedUser = { display_name: 'Loading' },
                    onClickSearchIcon = () => {}
}) => {
    const vm = new HeaderManager(_h._getTextHeaderProps);
    return (
        <Header headerStyle={ StyleSheet.flatten(styles.header) }>
            <HeaderBarWithSearchBar
                vm={ vm }
                headerTitle={ selectedUser.display_name }
                onClickBack={ onClickBack }
                onClickSearchIcon={ onClickSearchIcon }
            />
        </Header>
  );
};
