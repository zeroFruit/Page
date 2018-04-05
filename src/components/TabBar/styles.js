import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    tabContainer: {
        flexDirection: 'row'
    },
    tab: {
        flex: 1,
        padding: 2,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: br.$default,
        borderColor: c.$borderColor__dark,
        backgroundColor: c.$lightGrayColor
    },
    icon: {
        width: 23.5,
        height: 23
    },
    tabIcon1: {
        width: 17,
        height: 23
    },
    tabIcon2: {
        width: 23.5,
        height: 22.8
    },
    tabIcon3: {
        width: 16.5,
        height: 22.3
    }
});
