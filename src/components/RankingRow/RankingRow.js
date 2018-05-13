import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    RegularText,
    InlineImage
} from '../index';
import styles from './styles';

const RankingRow = ({ rank, tit, athr, title, author, bmcnt, onPress = () => {} }) => (
        <TouchableOpacity
            style={ styles.container }
            onPress={ onPress.bind(this, tit, athr) }
        >
            <View style={ styles.rankContainer }>
                <RegularText>
                    <Text style={ styles.rank }>{ rank }</Text>
                </RegularText>
            </View>

            <View style={ styles.contentContainer }>
                <View style={ styles.titleContainer }>
                    <RegularText>
                        <Text style={ styles.title }>
                            { title }
                        </Text>
                    </RegularText>
                    <View style={ styles.cardfooter }>
                        <View>
                            <RegularText>
                                <Text style={styles.author}>{ author }</Text>
                            </RegularText>
                        </View>
                        <View>
                            <RegularText>
                                <Text style={ styles.bmcnt }>
                                    { `${bmcnt}명이 담아둔 책   ` }
                                    <InlineImage
                                        style={styles.nextbtn}
                                        source={require('./image/next_icon_1.png')}
                                    />
                                </Text>
                            </RegularText>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
);

export default RankingRow;