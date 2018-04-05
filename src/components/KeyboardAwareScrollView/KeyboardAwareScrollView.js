import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView as K } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollView = ({ children }) => {
    return (
        <K
            enableOnAndroid
            extraScrollHeight={25}
        >
            {children}
        </K>
    );
};

KeyboardAwareScrollView.propTypes = {

};

export default KeyboardAwareScrollView;
