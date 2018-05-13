import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Image,
    Platform,
    PixelRatio,
} from 'react-native';
import PropTypes from 'prop-types';

const InlineImage = ({ style, ...rest }) => {
    if (style) {
        const _style = Object.assign({}, StyleSheet.flatten(style));
        ['width', 'height'].forEach(propName => {
            if(_style[propName]) {
                _style[propName] *= PixelRatio.get();
            }
        });

        return (
            <Image {...rest} style={_style} />
        );
    } else {
        console.error("No style specified in InlineImage component");
    }
};

InlineImage.propTypes = {};

export default InlineImage;
