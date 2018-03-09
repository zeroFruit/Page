import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {
    RankingRow,
    RegularText
} from "../index";

class RankingTable extends PureComponent {
    render() {
        const {
            rank,
            onPressRankingRow
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <RegularText>
                        <Text style={ styles.title }>가장 많은 사람들이 담아 둔 책 TOP5</Text>
                    </RegularText>
                </View>
                <View style={ styles.body }>
                    { this._renderRow(rank.toJS(), onPressRankingRow) }
                </View>
            </View>
        );
    }
    _renderRow = (data, onPress) => {
        return data.map(({ tit, athr, title, author, bmcnt }, idx) => (
            <RankingRow
                key={ `${tit}_${athr}` }
                rank={ idx + 1 }
                tit={ tit }
                athr={ athr }
                title={ title.title }
                author={ author.author }
                bmcnt={ bmcnt }
                onPress={ onPress }
            />
        ));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingLeft: 16.5,
        marginBottom: 7
    },
    title: {
        fontSize: 15,
        fontWeight: '700'
    },
    body: {
        flexDirection: 'column'
    }
})

export default RankingTable;