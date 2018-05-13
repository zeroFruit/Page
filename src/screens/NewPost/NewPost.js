import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Alert,
    Vibration,
    CameraRoll
} from 'react-native';
import styles from './styles';
import {
    setParamsToNavigation,
    navigateToNested,
    navigateTo
} from '../../Router';
import logger from '../../utils/LogUtils';
import { isEmpty } from '../../utils/ObjectUtils';

import {
    CameraComponent,
    CameraButtonPanel,
    ImagePreview,
    NewPostButtonGroups,
    CameraRollGallery,
    TextHeaderButton,
    RegularText
} from '../../components';
import ProgressBar from "../../components/ProgressBar";

const screenTypes = {
    PICTURE: 'screenType/picture',
    LIBRARY: 'screenType/library'
};
class NewPost extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerStyle: {
                elevation: 0,
                borderWidth: 0.8,
                borderColor: '#595959',
            },
            headerTitle: (
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <RegularText>
                        <Text style={{
                            fontSize: 18.8,
                            textAlign: 'center',
                            color: '#363636',
                            fontWeight: '500'
                        }}>
                            페이지 업로드
                        </Text>
                    </RegularText>
                </View>
            ),
            headerTitleStyle: {
                alignSelf: 'center',
                textAlign: 'center',
            },
            headerLeft: (
                <TextHeaderButton
                    onClickLeftText={ params.onPressLeft }
                    label={"취소"}
                />
            ),
            headerRight: (
                <TextHeaderButton
                    onClickLeftText={ params.onPressRight }
                    label={"다음"}
                />
            ),
        };
    };

    state = {
        screenType: screenTypes.PICTURE,
        selectedPhoto: {},
        photoTaken: {},
        isPhotoTaken: false,
        isCameraReady: false,
        isCameraWorkComplete: true
    };

    componentWillMount() {
        setParamsToNavigation(this.props, {
            onPressRight: this._onClickHeaderNextButton,
            onPressLeft: () => this.props.navigation.pop(1)
        });
    }
    render() {
        const { isCameraReady } = this.state;
        return (
            <View style={ styles.container }>
                {

                    !isCameraReady ? <ProgressBar visible /> : null
                }
                <View style={ styles.body }>
                    {
                        this._renderComponent(this.state.screenType)
                    }
                </View>
                <View style={ styles.footer }>
                    <NewPostButtonGroups
                        SCREEN_TYPES={ screenTypes }
                        setStateScreenType={ this._setStateScreenType } />
                </View>
            </View>
        );
    }

    _renderComponent = (screenType) => {
        switch(screenType) {
            case screenTypes.PICTURE:
                const {
                    isPhotoTaken,
                    isCameraWorkComplete
                } = this.state;
                return (
                    <View style={ styles.cameraContainer }>
                        {
                            !isCameraWorkComplete ? <ProgressBar visible /> : null
                        }
                        <CameraComponent
                            onCameraReady={() => this.setState({ isCameraReady: true })}
                            photoTakenUri={ this.state.photoTaken.uri || null }
                            setCameraRef={ this._setCameraRef } />
                        <CameraButtonPanel
                            source={
                                !isPhotoTaken ?
                                    require('./image/camera_button.png') :
                                    require('./image/camera_again_button.png')
                            }
                            onPressButton={ !isPhotoTaken ? this._takePicture : this._resetPicture } />
                    </View>
                );
            case screenTypes.LIBRARY:
                return (
                    <View style={ styles.libContainer }>
                        <ImagePreview
                            image={ this.state.selectedPhoto.image } />
                        <CameraRollGallery
                            onClickThumbnail={ this._onClickThumbnail } />
                    </View>
                );
            default:
                return <View />;
        }
    }

    _setCameraRef = (camera) => {
        this.camera = camera;
    }
    _resetPicture = () => {
        this.setState({
            isPhotoTaken: false,
            photoTaken: {}
        });
    }
    _takePicture = async () => {
        if (this.camera) {
            await this.setState({ isCameraWorkComplete: false });
            const photo = await this.camera.takePictureAsync({
                quality: 0.5,
                fixOrientation: false,
                exif: false
            });
            // console.log('photo', photo);
            await this.setState({
                isPhotoTaken : true,
                photoTaken: photo
            });
            await CameraRoll.saveToCameraRoll(photo.uri);
            await Vibration.vibrate();
            await this.setState({ isCameraWorkComplete: true });
        }
    }

    _setStateScreenType = (type) => {
        this.setState({
            screenType: type,
            photoTaken: {},
            selectedPhoto: {}
        });
    }

    _setStateSelectedPhoto = (selectedPhoto) => {
        this.setState({ selectedPhoto });
    }

    _onClickThumbnail = (item) => {
        this._setStateSelectedPhoto(item);
    }

    _onClickHeaderNextButton = () => {
        const {
            selectedPhoto,
            photoTaken
        } = this.state;

        if (isEmpty(selectedPhoto) && isEmpty(photoTaken)) {
            Alert.alert('등록할 사진을 선택해주세요.');
        } else if (isEmpty(selectedPhoto)) {
            navigateTo(this.props, 'NewPostWrite', {
                photo: {
                    image: {
                        uri: photoTaken.uri
                    }
                }
            });
        } else {
            navigateTo(this.props, 'NewPostWrite', {
                photo: selectedPhoto
            });
        }
        // reset photo taken state
        this.setState({
            selectedPhoto: {},
            photoTaken: {},
            isPhotoTaken: false
        });
    }
}

export default NewPost;
