import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { compose } from 'recompose';
import {
    navigateTo,
    setParamsToNavigation
} from '../../Router';
import {
    ScreenWithSearchBarHeader,
    LogoHeaderTitle,
    SearchHeaderButton,
    PostAddingPanel,
    RankingTable
} from '../../components';
import {
    routeHOC,
    fetchRankHOC
} from "../../hocs";
import styles from './styles';
import ViewManager, * as _v from "../../ViewManager";
import RegularText from "../../components/RegularText";

class Ranking extends ScreenWithSearchBarHeader {
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
                            fontWeight: '700'
                        }}>PAGE</Text>
                    </RegularText>
                </View>
            ),
            headerLeft: (<View />),
            headerRight: (
                <SearchHeaderButton onPress={ params.onClickSearchIcon } />
            )
        };
    }
    componentWillMount() {
        setParamsToNavigation(this.props, {
            onClickSearchIcon: this._onClickSearchIcon
        });
    }
    render() {
        const { rank } = this.props;
        return (
            <View style={ styles.container }>
                <PostAddingPanel
                    onClickAddPost={ this._onClickAddPost } />
                <RankingTable
                    rank={ rank }
                    onPressRankingRow={ this._onPressRankingRow }
                />
            </View>
        );
    }
    _onPressRankingRow = (tit, athr) => {
        const params = {
            athrid: athr,
            titid: tit,
            vm: new ViewManager(_v._getTextTitleProps)
        };
        this.props.navigate('PostList', params);
    }
    _onClickAddPost = () => {
        this.props.navigate('NewPost');
    }
}

export default compose(
    routeHOC,
    fetchRankHOC
)(Ranking);