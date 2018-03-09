import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    TextInputForm,
    TextHeaderButton,
    ProgressBar,
    TextArea,
    RegularText
} from '../../components';
import { updateUserStateHOC, routeHOC } from "../../hocs";

class Settings extends PureComponent {
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
                        }}>설정</Text>
                    </RegularText>
                </View>
            ),
            headerLeft: (
                <TextHeaderButton
                    onClickLeftText={ params.onPressLeft }
                    label={"취소"}
                />
            ),
            headerRight: (
                <TextHeaderButton
                    onClickLeftText={ params.onPressRight }
                    label={"완료"}
                />
            ),
        };
    };
    state = {
        uname: '',
        profile: '',
        email: '',
    };
    componentWillMount() {
        const {
            navigation,
            my,
            navigateToNest
        } = this.props;
        this.setState({
            uname: my.get('displayName'),
            profile: my.get('profile'),
            email: my.get('email')
        });
        navigation.setParams({
            onPressLeft: () => navigateToNest('tabs', {}, 'MyPage', {}),
            onPressRight: () => this._submit()
        });
    }
    async componentWillReceiveProps(np) {
        if(np.success) {
            await this.props.navigateToNest('tabs', {}, 'MyPage', {});
            await this.props.initState();
        }
    }
    render() {
        const {
            uname,
            profile,
            email
        } = this.state;
        const {
            loading
        } = this.props;
        return (
            <View style={ { flex: 1, backgroundColor: 'white' } }>
                {
                    loading ?
                        <ProgressBar visible /> :
                        null
                }
                <KeyboardAwareScrollView
                    innerRef={ (ref) => { this.scroll = ref; } }>
                    <TextInputForm
                        label="별명"
                        placeholder="책 제목을 입력해주세요."
                        textValue={ uname }
                        editable={ false }
                    />
                    <TextArea
                        label={"소개"}
                        placeholder={"당신은 어떤 책을 읽는 사람인가요?"}
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onChangeProfile }
                        textValue={ profile }
                    />
                    <TextInputForm
                        label="이메일"
                        placeholder="책 제목을 입력해주세요."
                        textValue={ email }
                        editable={ false }
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
    _handleTextInputFocus = (reactNode) => {
        this.scroll.props.scrollToFocusedInput(reactNode);
    }

    _onChangeProfile = profile => this.setState({ profile });

    _submit = () => {
        this.props.updateUserState({
            id: this.props.my.get('id'),
            profile: this.state.profile
        });
    }
}

export default compose(
    routeHOC,
    updateUserStateHOC
)(Settings);