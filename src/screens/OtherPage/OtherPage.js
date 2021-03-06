import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styles from './styles';
import {
    ProfilePanel,
    ScreenWithSearchBarHeader,
    SearchHeaderButton,
    HeaderBackButton,
    OtherPageBookGallery,
    RegularText
} from '../../components';
import {selectors} from '../../ducks/screen';
import {
    routeHOC,
    fetchUserByIdHOC
} from '../../hocs';
import {
    setParamsToNavigation
} from '../../Router';
import ViewManager, * as _v from '../../ViewManager';

class OtherPage extends ScreenWithSearchBarHeader {
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
                            { params.user && params.user.has('user') ?
                                params.user.get('user').displayName : '' }
                        </Text>
                    </RegularText>
                </View>
            ),
            headerLeft: (<HeaderBackButton onPress={ params.onClickBack } />),
            headerRight: (<SearchHeaderButton handlePress={ params.onClickSearchIcon }/>)
        }
    };
    componentDidMount() {
        const {
            navigation,
            user,
            prevScreen,
        } = this.props;
        setParamsToNavigation(this.props, {
            onClickSearchIcon: this._onClickSearchIcon,
            onClickBack: () => navigation.navigate(
                prevScreen.routeName,
                prevScreen.params.toJS()),
            user
        });
    }
    render() {
        const {
            user
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.top }>
                    <ProfilePanel
                        showMoreButton={false}
                        profile={ user.get('user') ? user.get('user').profile : '' }
                    />
                </View>
                <View style={ styles.body }>
                    <OtherPageBookGallery
                        galleryCardsProps={ user.get('books') }
                        onClickGalleryCard={ this._onClickGalleryCard } />
                </View>
            </View>
        );
    }
    _onClickGalleryCard = (id, user) => {
        console.log(id, user);
        this.props.navigate('Post', {
            id,
            user: user.id,
            fetchTagType: 'BY_BID',
            vm: new ViewManager(_v._getTagTitleProps)
        });
    }
}

const mapStateToProps = state => ({
    prevScreen: selectors.getPrev(state),
});

export default connect(
    mapStateToProps
)(compose(
    routeHOC,
    fetchUserByIdHOC
)(OtherPage));
