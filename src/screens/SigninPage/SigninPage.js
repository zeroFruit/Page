import { Map } from 'immutable';
import validator from 'validator';
import { compose } from 'recompose';
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import styles from './styles';
import { RegularText } from '../../components';
import { SigninHOC, routeHOC } from "../../hocs";

class SigninPage extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            header: null
        };
    };
    state = {
        email: 'a@gmail.com',
        pw: '11111111',
        errMessage: Map({
            email: '',
            pw: ''
        }),
        err: false
    };
    componentWillReceiveProps(np) {
        if (np.success) {
            this.props.navigate('main');
        }
    }
    render() {
        const {
           email,
           pw
        } = this.state;
        const {
            err
        } = this.props;
        return (
            <View style={ styles.container }>
                <Image
                    style={ styles.logo }
                    source={ require('./images/logo.png') }
                />
                <View style={ styles.body }>
                    <SigninTextInput
                        placeholder={"이메일"}
                        textValue={ email }
                        onChangeText={ this._onEmailChange }
                    />
                    <SigninTextInput
                        secureTextEntry
                        placeholder={"비밀번호"}
                        textValue={ pw }
                        onChangeText={ this._onPwChange }
                    />
                    <Button
                        style={ styles.btn }
                        label={"로그인"}
                        onPress={ this._submitSigninForm }
                    />
                </View>
                {
                    err ? (
                        <View>
                            <RegularText>
                                <Text style={ styles.errText }>이메일 또는 비밀번호가 정확하지 않습니다.</Text>
                            </RegularText>
                        </View>
                    ) : null
                }
            </View>
        );
    }

    _onEmailChange = email => this.setState({ email });
    _onPwChange = pw => this.setState({ pw });
    _submitSigninForm = async () => {
        const isValid = await this._validate();
        if(isValid) {
            await this.props.signin({
                email: this.state.email,
                pw: this.state.pw
            });
        }
    }

    _validate = async () => {
        await this._validateEmail();
        await this._validatePw();
        return !this.state.err;
    }

    _validateEmail = () => {
        const {
            email,
            errMessage
        } = this.state;
        if(!validator.isEmail(email))
            return this.setState({
                errMessage: errMessage.set('email', '올바른 이메일 형식이 아닙니다.'),
                err: true
            });
    }

    _validatePw = () => {
        const {
            pw,
            errMessage
        } = this.state;
        if(pw.length < 8 || pw.length > 10)
            return this.setState({
                errMessage: errMessage.set('pw', '비밀번호는 8~10자이어야합니다.'),
                err: true
            });
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

const SigninTextInput = ({
                             textValue = '',
                             placeholder = '',
                             onChangeText = () => {},
                             errMessage = '',
                             secureTextEntry = false }) => (
    <View>
        <TextInput
            secureTextEntry={ secureTextEntry }
            underlineColorAndroid="transparent"
            value={ textValue }
            onChangeText={ onChangeText }
            placeholder={ placeholder }
            style={ styles.textInput } />
        <View style={ styles.errContainer }>
            <RegularText>
                <Text style={ styles.errText }>
                    { errMessage }
                </Text>
            </RegularText>
        </View>
    </View>

);

export default compose(
    routeHOC,
    SigninHOC
)(SigninPage);