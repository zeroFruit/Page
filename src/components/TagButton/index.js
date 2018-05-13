import React, { PureComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RegularText } from '../index';
import styles from './styles';

class TagButton extends PureComponent {
    render() {
        const {
            title,
            onPress,
            containerStyle = styles.container,
            textStyle = styles.text,
        } = this.props;
        return (
            <TouchableOpacity
                style={ containerStyle }
                onPress={ onPress }>
                <RegularText>
                    <Text
                        style={ textStyle }>
                        { title }
                    </Text>
                </RegularText>

            </TouchableOpacity>
        );
    }
}

export default TagButton;
