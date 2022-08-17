// @ts-ignore
import io from 'socket.io-client';
import { getInfo } from './utils';

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
    
    async Connect ( cid : string , info: any) {
        try {
            let uid = info.uid;
            let did = info.did;
            delete info.uid;
            delete info.did;
            const { status, data, error_message } = await getInfo(cid, info);
            console.log('data from sanar : ',data);
            if(status==1000) {
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

    Disconnect () {
        this.eventListner.disconnect();
    };

};

export default new SanarTelemedicine();