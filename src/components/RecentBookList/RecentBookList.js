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


class RecentBookList extends PureComponent {
    render() {
        const {
            books,
            onPress
        } = this.props;
        console.log(books);
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
                    {this._renderItem(books, onPress)}
                </ScrollView>
            </View>
        );
    }

    _renderItem = (item, onPress) => {
        return item.map(({ athrid, titid, author, title }) => (
            <TagButton
                containerStyle={styles.tagContainer}
                textStyle={styles.tagText}
                key={`${athrid}__${titid}`}
                title={title}
                author={author}
                titid={titid}
                athrid={athrid}
                onPress={() => onPress(titid, athrid)}
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
