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
        backgroundColor: 'white'
    },
    inputContainer: {
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
    textInputContainer: {
        flex: 3,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    textInput: {
        fontSize: fs.$default,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'center',
        textAlign: 'left',
        fontFamily: 'NotoSansCJKkr-DemiLight'
    },
    errContainer: {
        paddingLeft: 19
    },
    errText: {
        fontSize: fs.$small,
        color: fc.$red
    }
});
