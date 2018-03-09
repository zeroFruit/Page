import React, { PureComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { RegularText } from '../index';

class SearchListItem extends PureComponent {
  render() {
    const { author, bookTitle } = this.props;
    return (
      <TouchableOpacity
        style={ styles.container }
        onPress={ this._onClickItem }>
        <RegularText>
          <Text style={ styles.text }>
            { `${author}/${bookTitle}` }
          </Text>
        </RegularText>
      </TouchableOpacity>
    );
  }

  _onClickItem = () => {
    const { athrid, titid } = this.props;
    this.props.onClickItem(athrid, titid);
  }
}


export default SearchListItem;
