import React from 'react';
import { ConsoleMessage as ConsoleMessageType } from '../../../lib/types';

interface ConsoleMessageProps {
  message: ConsoleMessageType;
}

export const ConsoleMessage: React.FC<ConsoleMessageProps> = ({ message }) => {
  return (
    <tr>
      <td>{message.timestamp.toISOString()}</td>
      <td>{message.message}</td>
    </tr>
  );
};
