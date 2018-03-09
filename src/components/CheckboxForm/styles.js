import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        minHeight: 45,
        borderTopWidth: br.$default,
        borderBottomWidth: br.$default,
        borderColor: c.$borderColor__dark,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 19
    },
    labelText: {
        fontSize: fs.$medium,
        color: fc.$default
    },
    subLabelContainer: {
        justifyContent: 'flex-end'
    },
    subLabel: {
        fontSize: fs.$small,
        color: fc.$default
    },
    checkboxContainer: {
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    checkbox: {
        width: 21.8,
        height: 21,
        resizeMode: 'contain'
    }
});
