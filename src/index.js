import React from "react";
import { SANAR_EVENT_TYPE } from "./Types";
import SanarTelemedicine from "./SanarTelemedicine";
import Ringer from "./components/Ringer";
import SanarBooking from "./SanarBooking";
import SanarChat from "./SanarChat";
import SanarAppointments from "./SanarAppointments";
import SanarProvider from "./common/SanarProvider";
import Rtc from "./Rtc";

const SanarRTC = ({
    enable
}) => {

    return (
        <SanarProvider enable={enable}>
            <Rtc />
        </SanarProvider>
    );
};

export default SanarRTC;

export {
    SanarTelemedicine,
    SanarBooking,
    Ringer,
    SanarChat,
    SanarAppointments
};