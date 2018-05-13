import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import { View, Alert, Text } from 'react-native';
import { compose } from 'recompose';
import styles from './styles';
import {
    setParamsToNavigation,
} from '../../Router';
import {
    ImagePreview,
    TextInputPanel,
    TextArea,
    ProgressBar,
    TextHeaderButton,
    RegularText,
    KeyboardAwareScrollView,
    HeaderBackButton
} from '../../components';
import {
    routeHOC,
} from '../../hocs';
import {actions, selectors} from "../../ducks/book";
import { throttle } from "../../utils/FuncUtils";

class NewPostWrite extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                borderWidth: 0.8,
                borderColor: '#595959',
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
                            페이지 업로드
                        </Text>
                    </RegularText>
                </View>
            ),
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
            },
            headerLeft: (
                <HeaderBackButton onPress={ params.onPressLeft }/>
            ),
            headerRight: (
                <TextHeaderButton
                    onClickLeftText={ params.onPressRight }
                    label={"다음"}
                />
            ),
        };
    };

    state = {
        bookTitle: '',
        bookAuthor: '',
        content: '',
        rotateIndex: 0,
        isBookAdding: false
    };

    componentWillMount() {
        setParamsToNavigation(this.props, {
            onPressRight: this._onClickHeaderCompleteButton,
            onPressLeft: () => this.props.navigation.pop(1)
        });
    }

    async componentWillReceiveProps(np) {
        if (np.addState.get('success')) {
            await np.pop(2);
            await np.init();
            console.log('add success!');
        }
    }

    render() {
        const {
            photo = { image: { uri: 'https://dummyimage.com/360x360/000/fff.png'} },
            addState
        } = this.props;

        if (addState.get('loading'))
            return <ProgressBar visible />;

        return (
            <View style={ styles.container }>
                <KeyboardAwareScrollView>
                    <ImagePreview
                        image={ photo.image } />
                    <TextInputPanel
                        label="책 제목"
                        placeholder="책 제목을 입력해주세요."
                        textValue={ this.state.bookTitle }
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onChangeBookTitle } />
                    <TextInputPanel
                        label="작가 이름"
                        placeholder="작가의 이름을 입력해주세요"
                        textValue={ this.state.bookAuthor }
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ this._onChangeBookAuthor } />
                    <TextArea
                        label={"기억하고 싶은 생각을 함께 남기세요."}
                        textValue={ this.state.content }
                        onChangeText={ this._onChangeContent } />
                </KeyboardAwareScrollView>
            </View>
        );
    }

    _handleTextInputFocus = (reactNode) => {
        this.scroll.scrollToFocusedInput(reactNode);
    }

    _onClickHeaderCompleteButton = async () => {
        const {
            bookTitle,
            bookAuthor,
            content
        } = this.state;
        const {
            photo,
            my
        } = this.props;
        if (bookTitle === '' || bookAuthor === '' || content === '') {
            Alert.alert('내용을 입력해주세요.');
        } else {
            await this.props.add({
                bookTitle,
                bookAuthor,
                content,
                img_src: photo.image.uri,
                user_id: my.get('id')
            });
        }
    }

    _onChangeBookTitle = title => this.setState({ bookTitle: title });
    _onChangeBookAuthor = author => this.setState({ bookAuthor: author });
    _onChangeContent = content => this.setState({ content });
}

const mapStateToProps = state => ({
    addState: selectors.GetAdd(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    add: actions.AddBook,
    init: actions.InitAddBookState
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(compose(
    routeHOC
)(NewPostWrite));
