import React, { PureComponent } from 'react';
import { FlatList, View, Text } from 'react-native';

class ListTemplate extends PureComponent {
    render() {
        const {
            data,
            extraData,
            keyExtractor,
            renderItem,
        } = this.props;
        return (
            <FlatList
                data={ data }
                extradData={ extraData }
                keyExtractor={ keyExtractor }
                renderItem={ renderItem }
            />
        );
    }
}

export default ListTemplate;