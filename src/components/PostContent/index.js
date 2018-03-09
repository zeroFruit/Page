import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import ReadMore from 'react-native-read-more-text';
import PropTypes from 'prop-types';

import {
    RegularText,
    LightText
} from '../../components';
import styles from './styles';

const { string } = PropTypes;
const propTypes = {
    content: string
};
const defaultProps = {
    content: ''
};

class PostContent extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <LightText>
                    <Text
                        textAlignVertical={"center"}
                        style={ styles.text }
                    >
                        { this.props.content }
                    </Text>
                </LightText>
            </View>
        );
    }

    _renderTruncatedFooter = (handlePress) => {
        return (
            <RegularText>
                <Text onPress={ handlePress }>
                    더 보기
                </Text>
            </RegularText>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <RegularText>
                <Text onPress={ handlePress }>
                    접기
                </Text>
            </RegularText>
        );
    }
}

PostContent.propTypes = propTypes;
PostContent.defaultProps = defaultProps;

export default PostContent;
