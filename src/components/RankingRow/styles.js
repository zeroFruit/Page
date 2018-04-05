import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 4,
        borderTopWidth: .3,
        borderBottomWidth: .3,
        borderColor: '#707070'
    },
    rankContainer: {
        width: 60.8,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rank: {
        fontSize: fs.$rank,
        color: fc.$rank,
        fontWeight: "500"
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        paddingRight: 26,
    },
    content: {

    },
    titleContainer: {
    },
    title: {
        fontSize: 17.5,
        color: fc.$title,
        fontWeight: "700"
    },
    cardfooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -20
    },
    author: {
        fontSize: 11.3,
        color: '#b0b0b0'
    },
    bmcnt: {
        fontSize: 11.3,
        color: '#474747',
        fontWeight: "900"
    }
});
