import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import './index.css'; // Assuming this CSS file exists and has styles for .log_div

export interface LogZoneHandle {
  addLogMessage: (message: string) => void;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

}

const LogZone = forwardRef<LogZoneHandle, {}>((props, ref) => {
  const [text, setText] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    addLogMessage: (message: string) => {
      setText(prevText => prevText + (prevText ? '\n' : '') + message);
    },
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
  }));

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [text]);

  const handleChangeInternal = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className='log_div'>
      <h3>Battle Log</h3>
      <textarea
        ref={textareaRef}
        value={text}

        onChange={handleChangeInternal}
        readOnly
        style={{
          width: '100%',
          height: "calc(100% - 2.5em - 20px)",
          resize: 'none',
          padding: '10px',
          border: '1px solid #007bff',
          borderRadius: '5px',
          boxSizing: 'border-box',
          // fontFamily: 'monospace',
          fontSize: '1.5em',
          overflowY: 'auto',
          display: 'block',
          // minHeight: '200px',
          maxHeight: '400px',
        }}
      />
    </div>
  );
});

export default LogZone;