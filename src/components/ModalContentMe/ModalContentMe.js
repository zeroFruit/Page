import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import {
    routeHOC,
    fetchTagByBidHOC,
    RmBookHOC
} from "../../hocs";

class ModalContentMe extends PureComponent {
    async componentWillReceiveProps(np) {
        if(np.rmSuccess)
            this.props.hideModal();
    }
    render() {
        const {
            hideModal,
            navigate,
            content,
            img_src,
            id,
            user_id,
            selectedBookAuthorTag_,
            selectedBookTitleTag_,
            AsyncRmBook,
            rmLoading
        } = this.props;
        if(rmLoading) return <ActivityIndicator size={ 75 } color="#ffffff" />;

        return (
            <View style={ styles.container }>
                <TouchableOpacity
                    onPress={ () => {
                        navigate('EditPost', {
                            id,
                            content,
                            img: img_src,
                            uid: user_id,
                            athr: selectedBookAuthorTag_,
                            tit: selectedBookTitleTag_
                        });
                        hideModal();
                    } }>
                    <View style={ styles.menu }>
                        <Text>
                            수정
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ async () => await AsyncRmBook(id) }
                >
                    <View style={ styles.menu }>
                        <Text>
                            삭제
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default compose(
    fetchTagByBidHOC,
    routeHOC,
    RmBookHOC
)(ModalContentMe);