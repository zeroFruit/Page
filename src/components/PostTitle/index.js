import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import {
    TagButton,
    RegularText
} from '../../components';
import logger from '../../utils/LogUtils';
import { postTitleType } from '../../config';

class PostTitle extends Component {
    render() {
        const { titleProps } = this.props;
        const { type, text } = titleProps;
        return this._renderTitle(type, text);
    }

    _renderTitle = (type, text) => {
        switch(type) {
            case postTitleType.TEXT:
                return (
                    <View style={ styles.textTypeContainer }>
                        { this._renderText(text) }
                    </View>
                );
            case postTitleType.TAG:
                return null;
        }
    }

    _renderText = (text) => {
        return (
            <RegularText>
                <Text
                    style={ styles.title }
                    onPress={ () => this._onClickText(text.id, text.type) }>
                    { text.value }
                </Text>
            </RegularText>
        );
    }

    _onClickText = (textId, textType) => {
        if (textType === 'nickname') {
            this.props.onClickNicknameTextOfPostTitle(textId);
        }
    }

    _renderTagButtons = (text) => {
        return text.map(tag => (
            <TagButton
                key={ tag.id }
                title={ `${tag.value}` }
                onPress={ () => this._onClickTagButton(tag.id, tag.type) } />
        ));
    }

    _onClickTagButton = (tagId, tagType) => {
        if (this._isAuthorTag(tagType)) {
            this.props.onClickAuthorTagOfPostTitle(tagId);
        }
    }

    _isAuthorTag = tagType => (tagType === 'author')
}

export default PostTitle;
