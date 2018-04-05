import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { RegularText } from '../../components';

const PostPageHeader = ({
                            tit = { title: '', id: -1 },
                            athr = { author: '', id: -1 },
                            seeMore = false,
                            onPress = () => {}
                        }) => {
    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={ seeMore ? () => onPress(athr.id) : () => {} }
        >
            <View style={styles.container}>
                <View style={styles.title}>
                    <RegularText>
                        <Text style={styles.text}>{athr.author}</Text>
                    </RegularText>
                </View>
                <View style={styles.author}>
                    <RegularText>
                        <Text style={styles.text}>{`"${tit.title}"`}</Text>
                    </RegularText>
                </View>
                {
                    seeMore ?
                        <View style={styles.seeMore}>
                            <RegularText>
                                <Text style={styles.seemore}>다른 페이지 둘러보기</Text>
                            </RegularText>
                        </View> : null
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PostPageHeader;
