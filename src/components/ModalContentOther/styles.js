import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'stretch',
        paddingLeft: 17.3,
        borderRadius: 5
    },
    title: {
        fontSize: 12.5,
        color: '#656565'
    },
    menu: {
        marginTop: 5,
        marginBottom: 5,
    },
    menuText: {
        fontSize: 16.3,
        color: '#363636'
    },
    sendSuccessMenu: {
        marginTop: 34,
        marginBottom: 32.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendSuccessMsg: {
        fontSize: 16.3,
        color: '#363636',
        textAlign: 'center'
    }
});
