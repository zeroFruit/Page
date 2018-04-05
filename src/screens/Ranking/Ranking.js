import React from 'react';
import {
    View,
    Text
} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import { compose } from 'recompose';
import {
    setParamsToNavigation
} from '../../Router';
import {
    ScreenWithSearchBarHeader,
    SearchHeaderButton,
    PostAddingPanel,
    RankingTable,
    ProgressBar
} from '../../components';
import {
    routeHOC,
    fetchRankHOC
} from "../../hocs";
import styles from './styles';
import ViewManager, * as _v from "../../ViewManager";
import RegularText from "../../components/RegularText";
import {actions, selectors} from "../../ducks/book";

class Ranking extends ScreenWithSearchBarHeader {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                borderWidth: 0.8,
                borderColor: '#595959',
            },
            headerTitle: (
                <View
                    style={{
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
    async componentDidMount() {
        await this.props.fetch();
    }
    async componentWillReceiveProps(np) {
        if(np.fetchState.get('success')) {
            await this.props.init();
        }
    }
    render() {
        const {
            fetchState
        } = this.props;
        // if(fetchState.get('loading')) return <ProgressBar visible />;
        return (
            <View style={ styles.container }>
                <PostAddingPanel
                    onClickAddPost={ this._onClickAddPost } />
                <RankingTable
                    rank={ fetchState.get('payload') }
                    onPressRankingRow={ this._onPressRankingRow }
                />
            </View>
        );
    }
    _onPressRankingRow = (tit, athr) => {
        this.props.navigate('PostList', {
            athrid: athr,
            titid: tit,
            fetchTagType: 'BY_TID',
            fetchBooksType: 'BY_TID',
            vm: new ViewManager(_v._getTextTitleProps)
        });
    }
    _onClickAddPost = () => {
        this.props.navigate('NewPost');
    }
}

const mapStateToProps = state => ({
    fetchState: selectors.GetRank(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    init: actions.InitRank,
    fetch: actions.Rank
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(compose(routeHOC)(Ranking));