import React from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import styles from './styles';
import ScreenWithSearchBarHeader from '../../components/ScreenWithSearchBarHeader';
import {
    IconButton,
    SearchBar,
    SearchList
} from '../../components';
import {
    routeHOC,
    requestSearchTextHOC
} from '../../hocs';

class SearchPage extends ScreenWithSearchBarHeader {
    static navigationOptions = {
        header: null
    };

    state = {
        searchText: '',
        isFocused: false
    }
    render() {
        const {
            searchText
        } = this.state;
        const {
            searchResults_
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.top }>
                    <IconButton
                        source={ require('./image/back_icon.png') }
                        containerStyle={ styles.iconContainer }
                        iconStyle={ styles.icon }
                        onPress={ this._handlePress } />
                    <SearchBar
                        searchText={ searchText }
                        placeholder="책 제목 혹은 작가를 입력하세요."
                        onChangeSearchText={ this._onChangeSearchText }
                        onFocus={ this._handleFocus }
                        onBlurSearchbar={ this._handleBlur } />
                </View>
                <View style={ styles.body }>
                    <SearchList
                        searchResults={ searchResults_ }
                        onClickSearchListItem={ this._onClickSearchListItem } />
                </View>
            </View>
        );
    }

    _handlePress = () => {
        this.props.navigation.goBack();
    }

    _onChangeSearchText = (searchText) => {
        this.setState({ searchText });
        if (searchText !== '') {
            this.props.requestSearch(searchText);
        }
    }

    _handleFocus = () => {
        this.setState({ isFocused: true });
    }

    _handleBlur = () => {
        this.setState({ isFocused: false });
    }
}

export default compose(
    routeHOC,
    requestSearchTextHOC
)(SearchPage);
