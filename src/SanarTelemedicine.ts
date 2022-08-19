// @ts-ignore
import io from 'socket.io-client';
import { getInfo } from './utils';
import DeviceInfo from 'react-native-device-info';

export type ConnectResponse = {
    message: string,
    status: boolean
}
export interface SanarTelemedicineInterface {
    Connect( cid: string, info: any, lang?: string ): Promise<ConnectResponse>,
    Disconnect(): void,
}

class SanarTelemedicine implements SanarTelemedicineInterface {

    public eventListner: any;
    public session: any;
    public info: any;

    async Connect(cid: string, info: any, lang?: string) {
        try {
            let did = await DeviceInfo.getUniqueId();
            const { status, data, message, error_message } = await getInfo(cid, info, lang);
            if (status == 1000) {
                this.eventListner = io(data.messagingUrl, { query: `uid=${data.uid}&did=${did}` });
                this.session = data;
                this.info = info;
                return { message: message, status: true };
            } else {
                return { message: error_message, status: false };
            };
        } catch (error) {
            throw error;
        }
    };

    Disconnect() {
        if (this.eventListner) {
            this.eventListner.disconnect();
            console.log("Disconnected with Sanar");
        }
    };
};

export default new SanarTelemedicine();