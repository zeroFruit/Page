import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    tagTypeContainer: {
        flexDirection: 'row',
        height: 45,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: c.$white,
        borderTopWidth: .4,
        borderBottomWidth: .4,
        paddingLeft: 5.5
    },
    textTypeContainer: {
        height: 45,
        justifyContent: 'center',
        paddingLeft: 24.3,
        backgroundColor: c.$white,
        borderTopWidth: .4,
        borderBottomWidth: .4,
        borderColor: '#cccccc'
    },
    title: {
        fontSize: fs.$medium,
        color: fc.$default
    }
});
