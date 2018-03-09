import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        padding: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        backgroundColor: c.$white,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    text: {
        marginLeft: 18.8
    },
    bmcnt: {
        fontSize: fs.$default,
        color: fc.$bmcnt
    },
    iconContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 18.8,
        resizeMode: 'contain'
    },
    bm: {
        width: 16.8,
        resizeMode: 'contain'
    },
    activityIndicator: {
        width: 44,
        height: 44
    }
});
