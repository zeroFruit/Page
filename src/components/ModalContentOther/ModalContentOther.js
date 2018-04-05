import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { RegularText } from '../index';
import styles from "./styles";
import { ProgressBar } from '../index';

class ModalContentOther extends PureComponent {
    state = {
        report: false,
        sendSuccess: false
    };
    async componentWillReceiveProps(np) {
        if(np.sendMailState.get("success")) {
            await this.props.initSendMailState();
            await this.setState({ sendSuccess: true });
        }

    }
    render() {
        const {
            report,
            sendSuccess
        } = this.state;
        const {
            sendMailState
        } = this.props;
        return (
            <View style={ styles.container }>
                {
                    sendMailState.get('loading') ? <ProgressBar visible /> : null
                }
                {
                    !report ? this._renderReport() :
                        (!sendSuccess ? this._renderReportReason() : this._renderSendSuccessWindow())
                }
            </View>
        );
    }

    _renderReport = () => {
        return (
            <View>
                <View>
                    <RegularText>
                        <Text style={ styles.title }>이 페이지를 신고하시겠어요?</Text>
                    </RegularText>
                </View>

                <TouchableOpacity
                    onPress={ () => this.setState({ report: true }) }
                >
                    <View style={ styles.menu }>
                        <RegularText>
                            <Text style={ styles.menuText }>네, 신고합니다.</Text>
                        </RegularText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => this.props.hideModal() }
                >
                    <View style={ styles.menu }>
                        <RegularText>
                            <Text style={ styles.menuText }>아니요, 신고하지않습니다.</Text>
                        </RegularText>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderReportReason = () => {
        return (
            <View>
                <View>
                    <RegularText>
                        <Text style={ styles.title }>이 페이지를 신고하는 이유를 선택하세요.</Text>
                    </RegularText>
                </View>
                {
                    this._renderReportReasonMenu()
                }
            </View>
        );
    }

    _renderReportReasonMenu = () => {
        const reasons = [
            {
                reason: '페이지 목적과 무관한 이미지의 사용'
            },
            {
                reason: '편파적 또는 폭력적 발언'
            },
            {
                reason: '지적재산권 침해'
            },
            {
                reason: '광고성 스팸'
            }
        ];
        return reasons.map(({ reason }) => (
            <TouchableOpacity
                key={reason}
                onPress={ () => this._onPressSendMail(reason) }
            >
                <View style={ styles.menu }>
                    <RegularText>
                        <Text style={ styles.menuText }>{ reason }</Text>
                    </RegularText>
                </View>
            </TouchableOpacity>
        ));
    }

    _renderSendSuccessWindow = () => {
        return (
            <TouchableOpacity
                onPress={() => this.props.hideModal()}
            >
                <View style={styles.sendSuccessMenu}>
                    <RegularText>
                        <Text style={styles.sendSuccessMsg}>{`신고가 접수되었습니다.\n확인 후 조치하겠습니다. 감사합니다.`}</Text>
                    </RegularText>
                </View>
            </TouchableOpacity>
        );
    }

    _onPressSendMail = async reason => {
        const {
            book,
            sendMail
        } = this.props;
        await sendMail({ book, reason });
    }
}

export default ModalContentOther;