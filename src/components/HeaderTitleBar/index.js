import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import {
  TagButton,
  RegularText
} from '../../components';

import logger from '../../utils/LogUtils';
import { headerType } from '../../config';

class HeaderTitleBar extends PureComponent {
  render() {
    return this._renderTitle();
  }

  _renderTitle = () => {
    const { type } = this.props;
    switch(type) {
      case headerType.TAG:
        return (
          <View style={ styles.tagsContainer }>
            { this._renderTagButtons(this.props.text) }
          </View>
        );
      case headerType.TEXT:
        return (
          <View style={ styles.textContainer }>
            <RegularText>
              <Text style={ styles.title }>
                { this._renderText(this.props.text) }
              </Text>
            </RegularText>
          </View>
        );
      case headerType.IMAGE:
        return (
          <View style={ styles.imageContainer }>
            <Image
              style={ styles.icon }
              source={ this.props.icon } />
          </View>
        )
      default:
        return logger.warn('types are not defined');
    }
  }

  _renderText = (text) => {
    return (
      <Text
        style={ styles.title }
        onPress={ () => this._onClickText(text.id, text.type) }>
        { text.value }
      </Text>
    );
  }

  _onClickText = (textId, textType) => {
    if (textType === 'nickname') {
      console.log('Nickname clicked', textId);
    }
  }

  _renderTagButtons = (text) => {
    return text.map(tag => (
      <TagButton
        key={ tag.value }
        title={ `${tag.value}` }
        onPress={ () => this._onClickTagButton(tag.id, tag.type) } />
    ));
  }

  _onClickTagButton = (tagId, tagType) => {
    if (this._isAuthorTag(tagType)) {
      this.props.onClickAuthorTagOfHeader(tagId);
    }
  }

  _isAuthorTag = tagType => (tagType === 'author')
}

export default HeaderTitleBar;
