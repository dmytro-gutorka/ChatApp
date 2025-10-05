import {socket} from "../../config/sockets";
import {useState} from "react";
import {useToast} from "../Toast/Toast";
import {useAuthContext} from "../AuthGuard/AuthGuard";
import Button from "../Button";

export default function AutoMessagesButton() {
    const [on, setOn] = useState(false);

    const { user } = useAuthContext()
    const { info: infoToast} = useToast();

    function toggle() {
        if (!on) {
            socket.emit('auto:on', { userId: user?._id });
            setOn(true);
            infoToast?.('auto-messages: ON');
        } else {
            socket.emit('auto:off');
            setOn(false);
            infoToast?.('auto-messages: OFF');
        }
    }

    return (
        <Button clsName="button--contained" onClick={toggle}>
            {on ? 'Turn Off AutoMessages' : 'Turn On AutoMessages'}
        </Button>
    );}