import { format } from 'date-fns';
import React from 'react';
import { ConsoleMessage as ConsoleMessageType } from '../../../lib/types';
interface ConsoleMessageProps {
  message: ConsoleMessageType;
}

export const ConsoleMessage: React.FC<ConsoleMessageProps> = ({ message }) => {
  return (
    <tr>
      <td>{format(message.timestamp, 'KK:mm:ss:SS')}</td>
      <td>{message.message}</td>
    </tr>
  );
};
