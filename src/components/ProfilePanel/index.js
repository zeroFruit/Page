import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import {
    RegularText,
    IconButton
} from '../../components';

class ProfilePanel extends PureComponent {
    render() {
        const {
            showMoreButton = true,
            onClickSettings = () => {},
            profile = ''
        } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.profileContainer }>
                    <RegularText>
                        <Text
                            textAlignVertical={"center"}
                            style={ styles.text }>
                            { profile }
                        </Text>
                    </RegularText>
                </View>
                {
                    showMoreButton ?
                        <IconButton
                            onPress={ onClickSettings }
                            containerStyle={ styles.settingsContainer }
                            iconStyle={ styles.settings }
                            source={ require('./images/user_setting_icon.png')}
                        /> : null
                }
            </View>
        )
    }
}

export default ProfilePanel;
