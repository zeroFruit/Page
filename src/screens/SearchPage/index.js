import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { compose } from 'recompose';
import styles from './styles';
import ScreenWithSearchBarHeader from '../../components/ScreenWithSearchBarHeader';
import {
    IconButton,
    SearchBar,
    SearchList,
    RegularText,
    LightText
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
            searchText,
            isFocused
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
                    {
                        (searchResults_.length === 0 && isFocused) ?
                            (
                                <EmptyResultView />
                            ) :
                            (
                                <SearchList
                                    searchResults={ searchResults_ }
                                    onClickSearchListItem={ this._onClickSearchListItem } />
                            )
                    }

                </View>
            </View>
        );
    }

    _handlePress = () => {
        this.props.navigation.pop(1);
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

const EmptyResultView = () => (
    <View style={ styles.emptyResultContainer }>
        <LightText>
            <Text style={styles.emptyResultText}>
                {'검색 결과가 없습니다.\r\n가장 먼저 당신의 생각이 담긴 페이지를 기록해보세요.'}
            </Text>
        </LightText>
    </View>
)

export default compose(
    routeHOC,
    requestSearchTextHOC
)(SearchPage);
