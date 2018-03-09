import React, { PureComponent } from 'react';
import { View } from 'react-native';
import {
    TagButton
} from '../index';
import styles from "./styles";

class TagHeader extends PureComponent {
    render() {
        const {
            tit,
            athr,
            onPress = () => {}
        } = this.props;
        return (
            <View style={ styles.tagsContainer }>
                {
                    tit ? (
                        <TagButton
                            title={ `${tit.title}` }
                            onPress={ onPress.bind(this, tit.id, tit.title) } />
                    ) : null
                }
                {
                    athr ? (
                        <TagButton
                            title={ `${athr.author}` }
                            onPress={ onPress.bind(this, athr.id, athr.author) } />
                    ) : null
                }

            </View>
        );
    }
}

export default TagHeader;