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
        borderWidth: 0.8,
        borderColor: c.$borderColor__dark,
        backgroundColor: c.$grayColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginVertical: 18,
        marginHorizontal: 14.5,
        borderRadius: 15
    },
    icon: {
        width: 16.3,
        height: 17,
        marginRight: 12.5
    },
    text: {
        fontSize: fs.$default,
        color: fc.$default
    }
});
