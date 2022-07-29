import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { ConsoleMessage as ConsoleMessageType } from '../../../lib/types';
import { useProjectStore } from '../../ProjectProvider';
import { ConsoleMessage } from './ConsoleMessage';

interface ConsoleProps {
  messages: ConsoleMessageType[];
}

export const Console: React.FC<ConsoleProps> = observer(({}) => {
  const ref = useRef<HTMLTableSectionElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const updatingScrollToBottom = useRef(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { graphManager } = useProjectStore();
  useEffect(() => {
    if (ref.current && !scrolled) {
      updatingScrollToBottom.current = true;
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [graphManager.messages]);

  return (
    <div className="relative w-full h-full bg-neutral-300">
      <div
        ref={ref}
        className="block w-full h-full p-2 overflow-scroll "
        onScroll={() => {
          if (updatingScrollToBottom.current) {
            updatingScrollToBottom.current = false;
          } else {
            setScrollPosition(ref.current!.scrollTop);
            setScrolled(true);
          }
        }}
      >
        {graphManager.messages.map((message) => (
          <ConsoleMessage
            key={`console-message-${message.timestamp.toISOString()}`}
            message={message}
          />
        ))}
      </div>
      {scrolled && (
        <button
          onClick={() => setScrolled(false)}
          className="absolute bottom-0 left-0 right-0 grid bg-white shadow place-items-center"
        >
          Resume
        </button>
      )}
    </div>
  );
});
