// @ts-ignore
import { info } from 'console';
import io from 'socket.io-client';
import { getInfo } from './utils';
import DeviceInfo from 'react-native-device-info';

type UserInfoType = {
    connectUrl: string,
    bookingUrl: string,
    sanarToken: string
}

export interface SanarTelemedicineInterface {
    Connect(
        cid: string,
        info: any
    ): Promise<boolean>,
    Disconnect(): void,
}

class SanarTelemedicine implements SanarTelemedicineInterface {

    public eventListner: any;
    public session: any;
    public info: any;

    async Connect(cid: string, info: any) {
        try {
            let did = await DeviceInfo.getUniqueId();
            const { status, data, error_message } = await getInfo(cid, info);
            console.log('data from sanar : ', data, status, error_message);
            if (status == 1000) {
                this.eventListner = io(data.messagingUrl, { query: `uid=${data.uid}&did=${did}` });
                this.session = data;
                this.info = info;
                return true;
            } else {
                console.log("Error : ", error_message);
                return false;
            };
        } catch (error) {
            throw error;
        }
    };

    Disconnect() {
        if (this.eventListner) {
            this.eventListner.disconnect();
            console.log("Socket Disconnected");
        }
    };

};

export default new SanarTelemedicine();