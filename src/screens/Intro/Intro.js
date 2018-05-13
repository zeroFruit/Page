import React, {PureComponent} from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import {
    RegularText
} from '../../components';
import{
    routeHOC
} from '../../hocs';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashScreen from "react-native-splash-screen";
import {colors as c} from "../../styles";
import {actions, selectors} from "../../ducks/user";


const slides = [
    {
        key: '1',
        title: ' 책을 읽다 든 생각,\n' +
        '페이지로 남기세요.',
        content: '기록한 생각은 사라지지 않아요.',
        lastPage: false,
    },
    {
        key: '2',
        title: '    다른 사람의\n' +
        '페이지와 생각을\n' +
        '    둘러보세요.',
        content: '좋은 책을 발견할 수 있어요.',
        lastPage: false,
    },
    {
        key: '3',
        title: '좋은 페이지는\n  담아두세요.',
        content: '그곳에서 새로운 생각이 시작될 거예요.',
        lastPage: true,
    }
];

const Slide = ({ title, content, slideStyle, lastPage, onPressDone }) => (
    <View style={slideStyle}>
        <View>
            <RegularText>
                <Text style={styles.title}>{title}</Text>
            </RegularText>
        </View>
        <View>
            <RegularText>
                <Text style={styles.content}>{content}</Text>
            </RegularText>
        </View>
        {
            lastPage ?
                (<Button
                    label={"다음으로"}
                    style={styles.btn}
                    labelStyle={styles.btnLabel}
                    onPress={onPressDone}
                />) : null
        }
    </View>
);

const Button = ({ label, style, labelStyle, onPress }) => (
    <TouchableOpacity
        style={ style }
        onPress={ onPress }
    >
        <View>
            <RegularText>
                <Text style={labelStyle}>{ label }</Text>
            </RegularText>
        </View>
    </TouchableOpacity>
);

class Intro extends PureComponent {
    static navigationOptions = {
        header: null
    };

    state = {
        page: 0
    };
    async componentWillMount() {
        await AsyncStorage.removeItem('accessToken');
    }
    async componentDidMount() {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if(accessToken) {
            await this.props.signin({
                accessToken
            });
        } else {
            await SplashScreen.hide();
        }
    }
    async componentWillReceiveProps(np) {
        if(np.signinState.get('success')) {
            await np.replace('main');
            await SplashScreen.hide();
        }
    }
    render() {
        return (
            <AppIntroSlider
                renderItem={this._renderItem}
                activeDotColor={"black"}
                slides={slides}
            />
        );
    }
    _renderItem = props => {
        return (
            <Slide
                slideStyle={[styles.slideContainer, {
                    width: props.width,
                    height: props.height,
                }]}
                title={props.title}
                content={props.content}
                lastPage={props.lastPage}
                onPressDone={() => this.props.replace('splash')}
            />
        );
    }
}

Intro.propTypes = {};

const styles = {
    slideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 100
    },
    title: {
        fontSize: 22.5,
        color: '#363636',
        textAlign: 'center',
    },
    content: {
        fontSize: 16.3,
        color: '#b0b0b0',
        textAlign: 'center',
    },
    btn: {
        width: 80,
        height: 35,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 14.8,
        borderWidth: 1.5,
        borderColor: '#363636',
    },
    btnLabel: {
        fontSize: 12,
        color: '#363636'
    }
};

const mapStateToProps = state => ({
    signinState: selectors.GetSignin(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    signin: actions.signin,
    init: actions.initSigninState
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(compose(routeHOC)(Intro));
