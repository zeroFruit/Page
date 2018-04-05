import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 11.5,
        backgroundColor: 'white',
    },
    labelContainer: {
        justifyContent: 'center',
        paddingLeft: 19.5,
        marginTop: -10
    },
    labelText: {
        fontSize: fs.$medium,
        color: fc.$default,
        textAlign: 'left'
    },
    textAreaContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 19.5,
        paddingRight: 19.5,
        marginTop: -10
    },
    textArea: {
        flex: 1,
        fontSize: fs.$default,
        textAlignVertical: 'top',
        minHeight: 200
    }
});
