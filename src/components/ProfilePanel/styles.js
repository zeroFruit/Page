import { StyleSheet } from 'react-native';
import {
    colors as c,
    borders as br,
    fontSizes as fs,
    fontColors as fc
} from '../../styles';

export default StyleSheet.create({
    container: {
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: c.$white,
        borderWidth: br.$default,
        borderColor: c.$borderLightColor,
        minHeight: 100
    },
    text: {
        color: fc.$default,
        fontSize: fs.$profile,
    },
    settingsContainer: {
        position: 'absolute',
        right: 9.8,
        bottom: 5.5,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    settings: {
        width: 18.8,
        resizeMode: 'contain'
    },
    profileContainer: {
    }
});
