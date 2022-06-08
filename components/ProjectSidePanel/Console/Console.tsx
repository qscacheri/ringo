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
      console.log('scrolling');
    }
  }, [graphManager.messages]);

  return (
    <div className="h-full w-full bg-neutral-300 relative">
      <div
        ref={ref}
        className="w-full h-full overflow-scroll block p-2 "
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
          className="absolute bottom-0 bg-white grid place-items-center shadow left-0 right-0"
        >
          Resume
        </button>
      )}
    </div>
  );
});
