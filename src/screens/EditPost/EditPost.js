import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { compose } from 'recompose'
import styles from './styles';

import {
    setParamsToNavigation,
} from '../../Router';

import {
    ImagePreview,
    TextInputPanel,
    TextArea,
    ProgressBar,
    PanelButton,
    TextHeaderButton,
    RegularText,
    KeyboardAwareScrollView
} from '../../components';
import {
    routeHOC,
    RmBookHOC,
    EditBookHOC,
    fetchTagByBidHOC
} from '../../hocs';
import { throttle } from "../../utils/FuncUtils";

class EditPost extends PureComponent {
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
                        }}>페이지 수정</Text>
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
        bookTitle: '',
        bookAuthor: '',
        content: '',
        isBookAdding: false
    };

    componentWillMount() {
        setParamsToNavigation(this.props, {
            onPressRight: this._onCompleteEdit,
            onPressLeft: () => this.props.goBack(1)
        });
    }

    componentWillReceiveProps(np) {
        const {
            bookTitle,
            bookAuthor
        } = this.state;
        const {
            tit = { title: '' },
            athr = { author: '' },
            content,
        } = np;
        if (bookTitle === '' && bookAuthor === '' && tit && athr) {
            this.setState({
                bookTitle: tit.title,
                bookAuthor: athr.author,
                content
            });
        }
    }
    componentWillUnmount() {
        console.log('EditPost unmount');
    }
    render() {
        const {
            bookTitle,
            bookAuthor,
            content
        } = this.state;
        const {
            img_src,
            id
        } = this.props;
        return (
            <View style={ styles.container }>
                <KeyboardAwareScrollView>
                    <ImagePreview
                        image={ { uri: img_src } } />
                    <TextInputPanel
                        label="책 제목"
                        placeholder="책 제목을 입력해주세요."
                        textValue={ bookTitle }
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ title => this.setState({ bookTitle: title }) } />
                    <TextInputPanel
                        label="작가 이름"
                        placeholder="작가 이름을 입력해주세요."
                        textValue={ bookAuthor }
                        handleFocus={ this._handleTextInputFocus }
                        onChangeText={ author => this.setState({ bookAuthor: author }) } />
                    <TextArea
                        label={"어떤 생각이 이 페이지에 머물렀나요?"}
                        textValue={ content }
                        onChangeText={ content => this.setState({ content }) } />
                    <PanelButton
                        label={"게시물 삭제"}
                        onPress={ this._onClickDelPost.bind(this, id) }
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }

    _handleTextInputFocus = (reactNode) => {
        this.scroll.props.scrollToFocusedInput(reactNode);
    }

    _onCompleteEdit = async () => {
        const { bookAuthor, bookTitle, content } = this.state;
        const { id } = this.props;
        await this.props.AsyncEditBook({
            bid: id,
            author: bookAuthor,
            title: bookTitle,
            content
        });
    }

    _onClickDelPost = async (bid) => {
        await this.props.AsyncRmBook(bid);
    }
}

export default compose(
    RmBookHOC,
    EditBookHOC,
    routeHOC,
    fetchTagByBidHOC
)(EditPost);