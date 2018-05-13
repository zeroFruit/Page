import React, {PureComponent} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    RegularText,
    TagButton,
} from '../index';
import PropTypes from 'prop-types';

const recentBooks = [
    {
        id: 1,
        title: 'aaaaaaaaa'
    },
    {
        id: 2,
        title: 'bbbbbb'
    },
    {
        id: 3,
        title: 'ccc'
    },
    {
        id: 4,
        title: 'dddd'
    },
    {
        id: 5,
        title: 'eeeee'
    },
    {
        id: 6,
        title: 'fffffffff'
    }
]

class RecentBookList extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <RegularText>
                        <Text style={styles.title}>방금 펼친 책, 같이보기</Text>
                    </RegularText>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.body}>
                    {this._renderItem(recentBooks)}
                </ScrollView>
            </View>
        );
    }

    _renderItem = (data) => {
        return data.map(({id, title}) => (
            <TagButton
                containerStyle={styles.tagContainer}
                textStyle={styles.tagText}
                key={id}
                title={title}
                onPress={() => {}}
            />
        ));
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 29,
    },
    header: {
        marginBottom: 7,
        borderBottomWidth: 0.3,
        borderBottomColor: '#707070',
        transform: [{
            translateX: 16.5,
        }]
    },
    title: {
        fontSize: 10,
        color: '#474747',
        fontWeight: '500'
    },
    body: {
        marginTop: 2,
        flexDirection: 'row',
        paddingLeft: 16.5,
    },
    tagContainer: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderWidth: 0.3,
        borderRadius: 10,
        borderColor: '#aeaeae',
        backgroundColor: '#fffefb',
        marginRight: 7.8,
    },
    tagText: {
        fontSize: 9,
        color: '#474747'
    }
});

export default RecentBookList;
