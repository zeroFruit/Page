import React from 'react';
import { View, Text } from 'react-native';
import { compose } from 'recompose';
import styles from './styles';
import {
    setParamsToNavigation,
} from '../../Router';
import {
    MyPageBookGallery,
    ProfilePanel,
    PostAddingPanel,
    ScreenWithSearchBarHeader,
    SearchHeaderButton,
    RegularText
} from '../../components';

import {
    routeHOC
} from '../../hocs';

import agent from '../../Agent';
import ViewManager, * as _v from '../../ViewManager';

class MyPage extends ScreenWithSearchBarHeader {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderWidth: 0.2,
                borderColor: '#595959'
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
                        }}>{ params.my ? params.my.get('displayName') : '' }</Text>
                    </RegularText>
                </View>
            ),
            headerLeft: (<View />),
            headerRight: (<SearchHeaderButton onPress={ params.onClickSearchIcon }/>)
        }
    };
    state = {
        myGalleryCardsProps: [],
    };

    componentWillMount() {
        setParamsToNavigation(this.props, {
            my: this.props.my,
            onClickSearchIcon: this._onClickSearchIcon
        });
    }

    async componentDidMount() {
        const { my } = this.props;
        await this._fetchMyGalleryCards(my);
    }

    render() {
        const {
            myGalleryCardsProps
        } = this.state;
        const {
            my
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.top }>
                    <ProfilePanel
                        onClickSettings={ this._onClickSettings }
                        profile={ my.get('profile') }
                    />
                </View>

                <View style={ styles.body }>
                    <PostAddingPanel
                        onClickAddPost={ this._onClickAddPost } />
                    <MyPageBookGallery
                        galleryCardsProps={ myGalleryCardsProps }
                        onClickGalleryCard={ this._onClickGalleryCard } />
                </View>
            </View>
        );
    }

    _fetchMyGalleryCards = async me => {
        const images = await agent.User.__fetchBooks(me.get('id'));
        const myGalleryCardsProps = await this._arrangeGalleryCards(images);
        await this.setState({ myGalleryCardsProps });
    }

    _arrangeGalleryCards = (cards) => {
        return cards.map((b) => {
            return this._getCardInfo(b);
        });
    }

    _onClickGalleryCard = (id, user) => {
        this.props.navigate('Post', {
            id,
            user: user.id,
            vm: new ViewManager(_v._getTagTitleProps)
        });
    }

    _onClickAddPost = () => {
        this.props.navigate('NewPost');
    }

    _getCardInfo = ({ book, bmcnt }) => {
        const { id, imgSrc, user } = book;
        return {
            id,
            img_src: imgSrc,
            user: user.id,
            bmcnt
        };
    }

    _onClickSettings = () => {
        this.props.navigate('Settings');
    }
}

export default compose(routeHOC)(MyPage);
