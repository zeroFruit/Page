import { Map } from 'immutable';
import validator from 'validator';
import { compose } from 'recompose';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    TextInputForm,
    HeaderBackButton,
    TextArea,
    CheckboxForm,
    PanelButton,
    RegularText
} from '../../components';
import styles from './styles';
import {
    SignupHOC,
    routeHOC
} from "../../hocs";

class SignupPage extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        return {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitle: (
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <RegularText>
                        <Text style={{
                            fontSize: 18.8,
                            textAlign: 'center',
                            color: '#363636',
                            fontWeight: '500'
                        }}>
                            회원가입
                        </Text>
                    </RegularText>
                </View>
            ),
            headerLeft: (<HeaderBackButton onPress={ () => navigation.goBack() }/>),
            headerRight: (<View />)
        };
    };
    state = {
        uname: '',
        profile: '',
        email: '',
        pw: '',
        rpw: '',
        agreed: false,
        errMessage: Map({
            uname: '',
            profile: '',
            email: '',
            pw: '',
            rpw: '',
            agreed: ''
        }),
        err: false
    };
    componentWillReceiveProps(np) {
        if(np.success) {
            this.props.navigate('signin');
            this.props.init();
        }
    }
    render() {
        const {
            uname,
            profile,
            email,
            pw,
            rpw,
            agreed,
            errMessage
        } = this.state;
        const {
            err
        } = this.props;
        return (
            <View style={ styles.container }>
                <KeyboardAwareScrollView
                    innerRef={ (ref) => { this.scroll = ref; } }>
                    <TextInputForm
                        label="별명"
                        placeholder="10자 이내"
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onUnameChange }
                        textValue={ uname }
                        errMessage={
                            this.state.err ?
                                errMessage.get('uname') :
                                ''
                        }
                    />
                    <TextArea
                        label={"소개"}
                        placeholder={"당신은 어떤 책을 읽는 사람인가요?"}
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onProfileChange }
                        textValue={ profile }
                    />
                    <TextInputForm
                        label="이메일"
                        placeholder="abcde@xyz.com"
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onEmailChange }
                        textValue={ email }
                        errMessage={
                            err ?
                                '같은 이메일이 존재합니다.\n\n본인의 이메일을 정확히 입력해주세요.\n비밀번호 재발급과 중요 공지사항 전달시 활용됩니다.' :
                                this.state.err ?
                                    `${errMessage.get('email')}\n\n본인의 이메일을 정확히 입력해주세요.\n비밀번호 재발급과 중요 공지사항 전달시 활용됩니다.` :
                                    `본인의 이메일을 정확히 입력해주세요.\n비밀번호 재발급과 중요 공지사항 전달시 활용됩니다.`
                        }
                    />
                    <TextInputForm
                        secureTextEntry
                        label="비밀번호"
                        placeholder="특수문자 포함 8~10자리"
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onPwChange }
                        textValue={ pw }
                        errMessage={
                            this.state.err ?
                                errMessage.get('pw') :
                                ''
                        }
                    />
                    <TextInputForm
                        secureTextEntry
                        label="비밀번호 확인"
                        placeholder=""
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onRpwChange }
                        textValue={ rpw }
                        errMessage={
                            this.state.err ?
                                errMessage.get('rpw') :
                                ''
                        }
                    />
                    <CheckboxForm
                        label={"개인정보처리방침 및 이용약관을 읽고, 동의합니다."}
                        sublabel={"이용약관 보기"}
                        checked={ agreed }
                        onPress={ this._onAgreedChange }
                        errMessage={
                            this.state.err ?
                                errMessage.get('agreed') :
                                ''
                        }
                    />
                </KeyboardAwareScrollView>
                <View>
                    <PanelButton
                        label={"회원가입"}
                        onPress={ this._submitSignupForm }
                    />
                </View>

            </View>
        );
    }
    _handleTextInputFocus = (reactNode) => {
        this.scroll.props.scrollToFocusedInput(reactNode);
    }
    _onUnameChange = uname => this.setState({ uname });
    _onProfileChange = profile => this.setState({ profile });
    _onEmailChange = email => this.setState({ email });
    _onPwChange = pw => this.setState({ pw });
    _onRpwChange = rpw => this.setState({ rpw });
    _onAgreedChange = () => this.setState({ agreed: !this.state.agreed });

    _submitSignupForm = async () => {
        await this.props.init();
        const isValid = await this._validate();
        if(isValid) {
            await this.props.signup({
                displayName: this.state.uname,
                profile: this.state.profile,
                email: this.state.email,
                pw: this.state.pw
            });
        }
    }

    _validate = async () => {
        await this._initErrState();
        await this._validateUname();
        await this._validateEmail();
        await this._validatePw();
        await this._validateAgreed();
        return !this.state.err;
    }

    _initErrState = () => {
        this.setState({
            errMessage: Map({
                uname: '',
                profile: '',
                email: '',
                pw: '',
                rpw: '',
                agreed: ''
            }),
            err: false
        });
    }

    _validateUname = () => {
        const { uname, errMessage } = this.state;
        if(!validator.isAlphanumeric(uname) || validator.isEmpty(uname)) {
            return this.setState({
                errMessage: errMessage.set('uname', '아이디가 적절하지 않습니다.'),
                err: true
            });
        }
        if(uname.length > 10) {
            return this.setState({
                errMessage: errMessage.set('uname', '아이디는 10자 이내이어야합니다.'),
                err: true
            });
        }
    }

    _validateEmail = () => {
        const { email, errMessage } = this.state;
        if(!validator.isEmail(email))
            return this.setState({
                errMessage: errMessage.set('email', '올바른 이메일 형식이 아닙니다.'),
                err: true
            });
    }

    _validatePw = () => {
        const { pw, errMessage, rpw } = this.state;
        if(pw.length < 8 || pw.length > 10)
            return this.setState({
                errMessage: errMessage.set('pw', '비밀번호는 8~10자이어야합니다.'),
                err: true
            });
        if(pw !== rpw)
            return this.setState({
                errMessage: errMessage.set('rpw', '비밀번호가 같지 않습니다.'),
                err: true
            });
    }

    _validateAgreed = () => {
        const { agreed, errMessage } = this.state;
        if(!agreed)
            return this.setState({
                errMessage: errMessage.set('agreed', '이용약관에 동의해야합니다.'),
                err: true
            });
    }
}

export default compose(
    routeHOC,
    SignupHOC
)(SignupPage);