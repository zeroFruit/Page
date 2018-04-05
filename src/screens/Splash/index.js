import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { compose } from 'recompose';
import {
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {
    RegularText
} from '../../components';
import {
    routeHOC
} from "../../hocs";
import styles from './styles';
import {actions, selectors} from "../../ducks/user";
import SplashScreen from "react-native-splash-screen";

class Splash extends PureComponent {
    static navigationOptions = {
        header: null
    };
    state = {
        uid: '',
    };
    // async componentWillMount() {
    //     // await AsyncStorage.removeItem('accessToken');
    // }
    // async componentDidMount() {
    //     const accessToken = await AsyncStorage.getItem('accessToken');
    //     if(accessToken) {
    //         await this.props.signin({
    //             accessToken
    //         });
    //     } else {
    //         await SplashScreen.hide();
    //     }
    // }
    // async componentWillReceiveProps(np) {
    //     if(np.signinState.get('success')) {
    //         await np.replace('main');
    //         await SplashScreen.hide();
    //     }
    // }
    render() {
        return (
            <View style={ styles.container }>
                <Image
                    style={ styles.logo }
                    source={ require('./images/beta_logo.png') }
                />
                <View style={ styles.body }>
                    <Button
                        style={ styles.darkbtn }
                        label={"회원가입"}
                        onPress={ this.props.navigate.bind(this, 'signup') }
                    />
                    <Button
                        style={ styles.btn }
                        label={"로그인"}
                        onPress={ this.props.navigate.bind(this, 'signin') }
                    />
                </View>
            </View>
        );
    }
}

const Button = ({ label, style, onPress }) => (
    <TouchableOpacity
        style={ style }
        onPress={ onPress }
    >
        <View>
            <RegularText>
                <Text>{ label }</Text>
            </RegularText>
        </View>
    </TouchableOpacity>
);

const mapStateToProps = state => ({
    signinState: selectors.GetSignin(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signin: actions.signin,
    init: actions.initSigninState
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(compose(routeHOC)(Splash));
