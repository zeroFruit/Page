import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import HeaderTitleBar from '../HeaderTitleBar';
import {TextHeaderButton} from '../TextHeaderButton';
import HeaderRightText from '../HeaderRightText';
import { fetchHeaderTitlePropsHOC } from '../../hocs/fetchHeaderTitlePropsHOC';
import { withDefaultHeaderHOC } from '../../hocs/withDefaultHeaderHOC';

const propTypes = {};
const defaultProps = {};

class HeaderBarWithTexts extends PureComponent {
    render() {
        const {
            headerTitleProps,
            leftLabel,
            rightLabel
        } = this.props;
        return (
            <View style={ styles.container }>
                <TextHeaderButton
                    label={ leftLabel }
                    onClickLeftText={ this._onClickLeftLabel } />
                <HeaderTitleBar
                    type={ headerTitleProps.type }
                    text={ headerTitleProps.text }
                    onClickAuthorTagOfHeader={ () => {} } />
                <HeaderRightText
                    label={ rightLabel }
                    onClickRightText={ this._onClickRightLabel } />
            </View>
        );
    }

    _onClickLeftLabel = () => {
        this.props.onClickHeaderLeftButton();
    }

    _onClickRightLabel = () => {
        this.props.onClickHeaderRightButton();
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3.3
    }
});

HeaderBarWithTexts.propTypes = propTypes;
HeaderBarWithTexts.defaultProps = defaultProps;

export default compose(
    fetchHeaderTitlePropsHOC,
    withDefaultHeaderHOC
)(HeaderBarWithTexts);
