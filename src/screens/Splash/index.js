import React, { Component } from 'react';
import { compose } from 'recompose';
import {
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';
import __auth from '../../Auth';
import {
    RegularText
} from '../../components';
import {
    routeHOC
} from "../../hocs";
import styles from './styles';

class Splash extends Component {
    static navigationOptions = {
        header: null
    };
    state = {
        uid: ''
    };
    render() {
        const { navigate } = this.props;
        return (
            <View style={ styles.container }>
                <Image
                    style={ styles.logo }
                    source={ require('./images/logo.png') }
                />
                <View style={ styles.body }>
                    <Button
                        style={ styles.darkbtn }
                        label={"회원가입"}
                        onPress={ navigate.bind(this, 'signup') }
                    />
                    <Button
                        style={ styles.btn }
                        label={"로그인"}
                        onPress={ navigate.bind(this, 'signin') }
                    />
                </View>
            </View>
        );
    }

    _onClickLoginBtn = async () => {
        const { uid } = this.state;
        const { navigate } = this.props;
        if (__auth.isValidUid(parseInt(uid))) {
            await this._authenticate(uid);
            navigate('main');
        } else {
            Alert.alert('부적합한 uid입니다.');
        }
    }

    _onChangeText = (uid) => {
        this.setState({ uid });
    }

    _authenticate = async (uid) => {
        await this.props.AsyncFetchMyInfoRequestAction(uid);
        __auth.setId(uid);
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

export default compose(routeHOC)(Splash);
