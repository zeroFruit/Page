import React from 'react';
import { FlatList } from 'react-native';

export default ({ data, keyExtractor, renderItem, numColumns = 3, onEndReached = (() => {}) }) => (
  <FlatList
    horizontal={ false }
    numColumns={ numColumns }
    data={ data }
    keyExtractor={ keyExtractor }
    onEndReached={ onEndReached }
    onEndReachedThreshold={ 0.6 }
    renderItem={ renderItem } />
);
