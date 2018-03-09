import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        height: 32,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: c.$grayColor,
        borderColor: c.$borderColor,
        borderWidth: br.$light2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: fc.$default,
        fontSize: fs.$medium,
        textAlign: 'center',
    }
});
