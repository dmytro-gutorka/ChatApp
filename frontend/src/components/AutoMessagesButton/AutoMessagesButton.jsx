import { socket } from '../../config/sockets';
import { useState } from 'react';
import Button from '../Button';
import useAuthContext from "../../hooks/useAuthContext";
import useToastContext from "../../hooks/useToastContext";

export default function AutoMessagesButton() {
  const [on, setOn] = useState(false);

  const { user } = useAuthContext();
  const { info: infoToast } = useToastContext();

  function toggle() {
      if (!on) {
        socket.emit('auto:on', {userId: user?._id});
        setOn(true);
        infoToast?.('auto-messages: ON')
      }

      if (on) {
        socket.emit('auto:off');
        setOn(false);
        infoToast?.('auto-messages: OFF');
      }
    }


  return (
    <Button clsName="button--contained" onClick={toggle}>
      {on ? 'Turn Off AutoMessages' : 'Turn On AutoMessages'}
    </Button>
  );
}
