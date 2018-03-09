import React, { PureComponent } from 'react';
import { View, Alert, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { compose } from 'recompose';
import styles from './styles';
import {
    setParamsToNavigation,
} from '../../Router';
import __auth from '../../Auth';

import {
    ImagePreview,
    TextInputPanel,
    TextArea,
    ProgressBar,
    TextHeaderButton,
    RegularText
} from '../../components';
import {
    routeHOC,
    AddBookHOC
} from '../../hocs';

class NewPostWrite extends PureComponent {
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
                <TextHeaderButton
                    onClickLeftText={ params.onPressLeft }
                    label={"취소"}
                />
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
            onPressLeft: () => this.props.navigation.goBack()
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addState.get('success')) {
            this.props.navigateToNest('tabs', {}, 'MyPage', {});
        }
    }

    render() {
        const {
            photo,
            addState
        } = this.props;
        if (addState.get('loading')) {
            return <ProgressBar visible />;
        } else {
            return (
                <View style={ styles.container }>
                    <KeyboardAwareScrollView
                        innerRef={ (ref) => { this.scroll = ref; } }>
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
                            placeholder="작가 이름을 입력해주세요."
                            textValue={ this.state.bookAuthor }
                            handleFocus={ this._handleTextInputFocus }
                            onChangeText={ this._onChangeBookAuthor } />
                        <TextArea
                            label={"어떤 생각이 이 페이지에 머물렀나요?"}
                            textValue={ this.state.content }
                            onChangeText={ this._onChangeContent } />
                    </KeyboardAwareScrollView>
                </View>
            );
        }
    }

    _handleTextInputFocus = (reactNode) => {
        this.scroll.props.scrollToFocusedInput(reactNode);
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

export default compose(
    routeHOC,
    AddBookHOC
)(NewPostWrite);
