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
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    body: {
        flex: 1
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    libContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    footer: {
        height: 48
    }
});
