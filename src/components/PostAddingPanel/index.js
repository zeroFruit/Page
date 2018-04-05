import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { RegularText } from '../../components';

class PostAddingPanel extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={ _.throttle(this._onClickAddPost, 2000, { trailing: false }) }
            >
                <View style={ styles.container }>
                    <Image
                        source={ require('./image/post_icon.png') }
                        style={ styles.icon } />
                    <RegularText>
                        <Text style={ styles.text }>
                            당신의 생각이 담긴 페이지를 기록하세요.
                        </Text>
                    </RegularText>
                </View>
            </TouchableOpacity>
        );
    }

    _onClickAddPost = () => {
        this.props.onClickAddPost();
    }
}

export default PostAddingPanel;
